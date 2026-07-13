import { useCallback, useContext, useEffect, useId } from "react";

import {
  LUIAnimationTrackerContext,
  type LUIAnimationSignal,
} from "./LUIAnimationTracker";

type UseLUIAnimationSignalOptions = {
  disabled?: boolean;
  durationMs: number;
  id?: string;
  order?: number;
};

export function useLUIAnimationSignal({
  disabled = false,
  durationMs,
  id,
  order = 0,
}: UseLUIAnimationSignalOptions): LUIAnimationSignal {
  const generatedId = useId();
  const animationId = id ?? generatedId;
  const tracker = useContext(LUIAnimationTrackerContext);

  if (tracker === null) {
    throw new Error(
      "useLUIAnimationSignal must be used within LUIAnimationTrackerProvider.",
    );
  }

  const { completeItem, getPhase, registerItem, unregisterItem } = tracker;

  useEffect(() => {
    if (disabled) {
      return;
    }

    registerItem(animationId, order, durationMs);

    return () => {
      unregisterItem(animationId);
    };
  }, [animationId, disabled, durationMs, order, registerItem, unregisterItem]);

  const phase = disabled ? "entered" : getPhase(animationId);
  const complete = useCallback(() => {
    completeItem(animationId);
  }, [animationId, completeItem]);

  return {
    complete,
    hasEntered: phase === "entered",
    id: animationId,
    isEntering: phase === "entering",
    phase,
    shouldEnter: phase === "entering" || phase === "entered",
  };
}

export function useLUIAnimationTracker() {
  const tracker = useContext(LUIAnimationTrackerContext);

  if (tracker === null) {
    throw new Error(
      "useLUIAnimationTracker must be used within LUIAnimationTrackerProvider.",
    );
  }

  return tracker;
}
