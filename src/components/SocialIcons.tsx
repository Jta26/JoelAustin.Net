import * as stylex from "@stylexjs/stylex";

import LUIButton from "./LUIButton";
import LUIWipe from "./LUIWipe";

const socialItems = [
  {
    icon: "github",
    label: "GitHub",
    showText: true,
    url: "https://github.com/Jta26",
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    showText: true,
    url: "https://www.linkedin.com/in/joel-austin",
  },
  { icon: "x", label: "X", showText: false, url: "https://x.com/HebiByte" },
] as const;

type SocialIconName = "github" | "linkedin" | "x";

export default function SocialIcons() {
  function handleSocialAction(item: (typeof socialItems)[number]) {
    window.open(item.url, "_blank", "noopener,noreferrer");
  }

  return (
    <nav aria-label="Primary navigation" {...stylex.props(styles.nav)}>
      {socialItems.map((item, index) => (
        <LUIWipe key={item.label} inline order={index * 0.25} timing="chunky">
          <LUIButton
            aria-label={item.label}
            labelXstyle={styles.mobileIconButtonLabel}
            onClick={() => handleSocialAction(item)}
            xstyle={styles.mobileIconButton}
          >
            <span {...stylex.props(styles.navButtonContent)}>
              <SocialIcon name={item.icon} />
              {item.showText !== false ? (
                <span {...stylex.props(styles.navLabel)}>{item.label}</span>
              ) : null}
            </span>
          </LUIButton>
        </LUIWipe>
      ))}
    </nav>
  );
}

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "github") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        {...stylex.props(styles.navIcon)}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.86 8.36 6.84 9.72.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.93.85.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.98c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z"
        />
      </svg>
    );
  }

  if (name === "x") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        {...stylex.props(styles.navIcon)}
      >
        <path
          fill="currentColor"
          d="M14.08 10.16 22.3 0h-1.95l-7.14 8.82L7.51 0H.94l8.62 13.34L.94 24h1.95l7.54-9.32L16.46 24h6.57l-8.95-13.84Zm-2.67 3.3-.87-1.32L3.59 1.56h2.98l5.61 8.55.87 1.32 7.3 11.12h-2.98l-5.96-9.09Z"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      {...stylex.props(styles.navIcon)}
    >
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
      />
    </svg>
  );
}

const styles = stylex.create({
  nav: {
    gap: 8,
    paddingInline: 10,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    paddingBlockStart: 10,
    position: "relative",
    zIndex: 2,
    width: "100%",
  },
  navButtonContent: {
    gap: 7,
    alignItems: "center",
    display: "inline-flex",
  },
  navLabel: {
    display: {
      default: "inline",
      "@media (max-width: 700px)": "none",
    },
  },
  navIcon: {
    blockSize: {
      default: 14,
      "@media (max-width: 700px)": 16,
    },
    color: "currentColor",
    flexShrink: 0,
    inlineSize: {
      default: 14,
      "@media (max-width: 700px)": 16,
    },
  },
  mobileIconButton: {
    paddingInline: {
      default: 32,
      "@media (max-width: 700px)": 18,
    },
  },
  mobileIconButtonLabel: {
    minWidth: {
      default: 116,
      "@media (max-width: 700px)": 28,
    },
  },
});
