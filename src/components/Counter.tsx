import { createSignal } from "solid-js";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";

const styles = stylex.create({
  button: {
    fontFamily: "inherit",
    fontSize: "inherit",
    padding: "1em 2em",
    color: colors.primary,
    borderRadius: "2em",
    border: "2px solid rgba(68, 107, 158, 0)",
    outline: "none",
    width: "200px",
    fontVariantNumeric: "tabular-nums",
    cursor: "pointer",
    backgroundColor: {
      default: colors.primaryMuted,
      ":hover": "rgba(68, 107, 158, 0.15)",
      ":active": "rgba(68, 107, 158, 0.2)",
    },
    borderColor: {
      default: "rgba(68, 107, 158, 0)",
      ":focus-visible": colors.primary,
    },
  },
});

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button {...stylex.attrs(styles.button)} onClick={() => setCount(count() + 1)} type="button">
      Clicks: {count()}
    </button>
  );
}
