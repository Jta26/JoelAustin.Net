import type { ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import {
  animationTrackerReducer,
  getNextScheduledAnimationItem,
  initialLUIAnimationState,
  LUIAnimationTrackerContext,
} from "./LUIAnimationTracker";
import type { LUIAnimationPhase } from "./LUIAnimationTracker";

type LUIAnimationTrackerProviderProps = {
  autoStart?: boolean;
  children: ReactNode;
  disabled?: boolean;
};

export function LUIAnimationTrackerProvider({
  autoStart = true,
  children,
  disabled = false,
}: LUIAnimationTrackerProviderProps) {
  const [state, dispatch] = useReducer(
    animationTrackerReducer,
    initialLUIAnimationState,
  );
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldCompleteImmediately = disabled || prefersReducedMotion;
  const nextScheduledItem = getNextScheduledAnimationItem(state);

  useEffect(() => {
    if (!autoStart) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      dispatch({ startedAtMs: performance.now(), type: "start" });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [autoStart]);

  useEffect(() => {
    if (state.sequenceStartedAtMs === null || !shouldCompleteImmediately) {
      return;
    }

    dispatch({ type: "completeAll" });
  }, [shouldCompleteImmediately, state.items, state.sequenceStartedAtMs]);

  useEffect(() => {
    if (
      state.sequenceStartedAtMs === null ||
      shouldCompleteImmediately ||
      nextScheduledItem === null
    ) {
      return;
    }

    const elapsedMs = performance.now() - state.sequenceStartedAtMs;
    const delayMs = Math.max(0, nextScheduledItem.startOffsetMs - elapsedMs);

    const timeout = window.setTimeout(() => {
      dispatch({ id: nextScheduledItem.id, type: "startItem" });
    }, delayMs);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    nextScheduledItem,
    shouldCompleteImmediately,
    state.sequenceStartedAtMs,
  ]);

  const registerItem = useCallback((id: string, order: number, durationMs: number) => {
    dispatch({ durationMs, id, order, type: "register" });
  }, []);

  const unregisterItem = useCallback((id: string) => {
    dispatch({ id, type: "unregister" });
  }, []);

  const completeItem = useCallback((id: string) => {
    dispatch({ id, type: "complete" });
  }, []);

  const start = useCallback(() => {
    dispatch({ startedAtMs: performance.now(), type: "start" });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const getPhase = useCallback(
    (id: string): LUIAnimationPhase => {
      if (state.enteredIds[id]) {
        return "entered";
      }

      if (state.startedIds[id]) {
        return "entering";
      }

      return "waiting";
    },
    [state.enteredIds, state.startedIds],
  );

  const contextValue = useMemo(
    () => ({
      completeItem,
      enteredIds: state.enteredIds,
      getPhase,
      registerItem,
      reset,
      sequenceStartedAtMs: state.sequenceStartedAtMs,
      start,
      startedIds: state.startedIds,
      unregisterItem,
    }),
    [
      completeItem,
      getPhase,
      registerItem,
      reset,
      state.sequenceStartedAtMs,
      start,
      state.enteredIds,
      state.startedIds,
      unregisterItem,
    ],
  );

  return (
    <LUIAnimationTrackerContext.Provider value={contextValue}>
      {children}
    </LUIAnimationTrackerContext.Provider>
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getPrefersReducedMotion,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleChange(event: MediaQueryListEvent) {
      setPrefersReducedMotion(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

function getPrefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
