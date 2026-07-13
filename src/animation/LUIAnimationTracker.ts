import { createContext } from "react";

export type LUIAnimationPhase = "waiting" | "entering" | "entered";

export type LUIAnimationSignal = {
  complete: () => void;
  hasEntered: boolean;
  id: string;
  isEntering: boolean;
  phase: LUIAnimationPhase;
  shouldEnter: boolean;
};

export type LUIAnimationItem = {
  durationMs: number;
  id: string;
  order: number;
  registeredAt: number;
};

export type LUIAnimationState = {
  enteredIds: Record<string, true>;
  items: Record<string, LUIAnimationItem>;
  nextRegistrationIndex: number;
  sequenceStartedAtMs: number | null;
  startedIds: Record<string, true>;
};

export type LUIAnimationTrackerContextValue = {
  completeItem: (id: string) => void;
  enteredIds: Record<string, true>;
  getPhase: (id: string) => LUIAnimationPhase;
  registerItem: (id: string, order: number, durationMs: number) => void;
  reset: () => void;
  start: () => void;
  sequenceStartedAtMs: number | null;
  startedIds: Record<string, true>;
  unregisterItem: (id: string) => void;
};

type LUIAnimationAction =
  | {
      durationMs: number;
      id: string;
      order: number;
      type: "register";
    }
  | {
      id: string;
      type: "unregister";
    }
  | {
      id: string;
      type: "startItem";
    }
  | {
      startedAtMs: number;
      type: "start";
    }
  | {
      id: string;
      type: "complete";
    }
  | {
      type: "completeAll";
    }
  | {
      type: "reset";
    };

export const initialLUIAnimationState: LUIAnimationState = {
  enteredIds: {},
  items: {},
  nextRegistrationIndex: 0,
  sequenceStartedAtMs: null,
  startedIds: {},
};

export const LUIAnimationTrackerContext =
  createContext<LUIAnimationTrackerContextValue | null>(null);

export function animationTrackerReducer(
  state: LUIAnimationState,
  action: LUIAnimationAction,
): LUIAnimationState {
  switch (action.type) {
    case "register": {
      const existingItem = state.items[action.id];
      const registeredAt =
        existingItem?.registeredAt ?? state.nextRegistrationIndex;

      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: {
            durationMs: Math.max(0, action.durationMs),
            id: action.id,
            order: action.order,
            registeredAt,
          },
        },
        nextRegistrationIndex:
          existingItem === undefined
            ? state.nextRegistrationIndex + 1
            : state.nextRegistrationIndex,
      };
    }

    case "unregister": {
      const items = { ...state.items };
      const enteredIds = { ...state.enteredIds };
      const startedIds = { ...state.startedIds };

      delete items[action.id];
      delete enteredIds[action.id];
      delete startedIds[action.id];

      return {
        ...state,
        enteredIds,
        items,
        startedIds,
      };
    }

    case "start":
      return {
        ...state,
        sequenceStartedAtMs: action.startedAtMs,
      };

    case "startItem": {
      if (state.items[action.id] === undefined) {
        return state;
      }

      return {
        ...state,
        startedIds: {
          ...state.startedIds,
          [action.id]: true,
        },
      };
    }

    case "complete":
      if (state.items[action.id] === undefined) {
        return state;
      }

      return {
        ...state,
        enteredIds: {
          ...state.enteredIds,
          [action.id]: true,
        },
      };

    case "completeAll": {
      const enteredIds = Object.keys(state.items).reduce<Record<string, true>>(
        (nextEnteredIds, id) => {
          nextEnteredIds[id] = true;
          return nextEnteredIds;
        },
        {},
      );

      return {
        ...state,
        enteredIds,
        startedIds: enteredIds,
      };
    }

    case "reset":
      return {
        ...state,
        enteredIds: {},
        sequenceStartedAtMs: null,
        startedIds: {},
      };

    default:
      return state;
  }
}

export function getNextAnimationItem(
  state: LUIAnimationState,
): LUIAnimationItem | null {
  const pendingItems = Object.values(state.items)
    .filter((item) => state.enteredIds[item.id] !== true)
    .sort((firstItem, secondItem) => {
      if (firstItem.order !== secondItem.order) {
        return firstItem.order - secondItem.order;
      }

      return firstItem.registeredAt - secondItem.registeredAt;
    });

  return pendingItems[0] ?? null;
}

export type LUIAnimationScheduledItem = LUIAnimationItem & {
  startOffsetMs: number;
};

export function getAnimationSchedule(
  items: Record<string, LUIAnimationItem>,
): LUIAnimationScheduledItem[] {
  const orderedItems = Object.values(items).sort((firstItem, secondItem) => {
    if (firstItem.order !== secondItem.order) {
      return firstItem.order - secondItem.order;
    }

    return firstItem.registeredAt - secondItem.registeredAt;
  });

  return orderedItems.reduce<LUIAnimationScheduledItem[]>((schedule, item) => {
    const previousScheduledItem = schedule.at(-1);

    if (previousScheduledItem === undefined) {
      schedule.push({
        ...item,
        startOffsetMs: 0,
      });
      return schedule;
    }

    const orderGap = Math.max(0, item.order - previousScheduledItem.order);
    const overlapRatio = Math.min(orderGap, 1);

    schedule.push({
      ...item,
      startOffsetMs:
        previousScheduledItem.startOffsetMs +
        overlapRatio * previousScheduledItem.durationMs,
    });

    return schedule;
  }, []);
}

export function getNextScheduledAnimationItem(
  state: LUIAnimationState,
): LUIAnimationScheduledItem | null {
  return (
    getAnimationSchedule(state.items).find(
      (item) => state.startedIds[item.id] !== true,
    ) ?? null
  );
}
