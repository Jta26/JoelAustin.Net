import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";
import * as stylex from "@stylexjs/stylex";
import XivActionButton from "~/components/XivActionButton";
import XivButton from "~/components/XivButton";
import XivCard from "~/components/XivCard";
import { xiv, xivDark } from "../../tokens.stylex";

const AEOLIAN_ICON = "/images/xiv/icons/Aeolian_Edge.png";

const pageStyles = stylex.create({
  wrapper: {
    backgroundColor: xiv.pageBg,
    minHeight: "100vh",
    padding: "2rem 1rem 3rem",
    fontFamily: xiv.fontFamily,
  },
  container: {
    maxWidth: "820px",
    margin: "0 auto",
  },
  intro: {
    color: xiv.textIntro,
    fontSize: "0.95rem",
    maxWidth: "520px",
    margin: "0.75rem auto 1.75rem",
    lineHeight: 1.4,
  },
  cardTitle: {
    fontSize: "1.05rem",
    color: xiv.textGold,
    marginBottom: "0.35rem",
    letterSpacing: xiv.letterSpacingTitle,
  },
  cardText: {
    color: xiv.textSecondary,
    fontSize: "0.85rem",
    lineHeight: 1.35,
  },
  codePre: {
    backgroundColor: xiv.codeBg,
    padding: "8px 10px",
    borderRadius: "3px",
    fontSize: "0.72rem",
    color: xiv.textCode,
    overflow: "auto",
    fontFamily: xiv.fontFamilyMono,
    margin: "0.5rem 0 0",
  },
  counter: {
    fontSize: "0.9rem",
    color: xiv.textPrimary,
    marginTop: "0.6rem",
  },
  wideCardWrapper: {
    maxWidth: 420,
    width: "100%",
  },
});

const cardSizes = stylex.create({
  title: { width: 460, height: 66 },
  large: { width: "100%", height: 305 },
  medium: { width: "100%", height: 195 },
  tall: { width: "100%", height: 268 },
  small: { width: 218, height: 138 },
  sizeSmall: { width: 240, height: 118 },
  sizeMedium: { width: 300, height: 118 },
  sizeWide: { width: "100%", height: 118 },
  usage: { width: "100%", height: 132 },
});

export default function ComponentsDemo() {
  const [activations, setActivations] = createSignal(0);

  const handleActivate = () => {
    setActivations(n => n + 1);
  };

  return (
    <main {...stylex.attrs(xivDark, pageStyles.wrapper)}>
      <Title>Joel Austin • XIV UI Components</Title>

      <div {...stylex.attrs(pageStyles.container)}>
        {/* Title "window" */}
        <div style={{ display: "flex", "justify-content": "center", "margin-bottom": "1.25rem" }}>
          <XivCard xstyle={cardSizes.title}>
            <div
              style={{
                padding: "9px 16px",
                color: xiv.textGold,
                "text-align": "center",
                "font-size": "1.15rem",
                "letter-spacing": xiv.letterSpacingTitleLarge,
              }}
            >
              XIV UI Components
            </div>
          </XivCard>
        </div>

        <p {...stylex.attrs(pageStyles.intro)}>
          Reusable SolidJS components built with authentic Final Fantasy XIV UI assets. All examples
          below live inside the card component for visual consistency.
        </p>

        {/* Action Buttons */}
        <XivCard xstyle={cardSizes.large}>
          <div style={{ padding: "13px 18px" }}>
            <div {...stylex.attrs(pageStyles.cardTitle)}>XivActionButton</div>
            <p {...stylex.attrs(pageStyles.cardText)} style={{ "margin-bottom": "0.6rem" }}>
              Layered DOM button (icon + socket + frame images). Hover lifts, press gives tactile
              feedback. Pixel-perfect at supported sizes.
            </p>

            <div
              style={{
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
                gap: "14px",
                "flex-wrap": "wrap",
                padding: "8px 4px",
              }}
            >
              <XivActionButton
                icon={AEOLIAN_ICON}
                size={40}
                label="Aeolian Edge (40px)"
                onActivate={handleActivate}
              />
              <XivActionButton
                icon={AEOLIAN_ICON}
                size={48}
                label="Aeolian Edge (48px)"
                onActivate={handleActivate}
              />
              <XivActionButton
                icon={AEOLIAN_ICON}
                size={56}
                label="Aeolian Edge (56px)"
                onActivate={handleActivate}
              />
              <XivActionButton
                icon={AEOLIAN_ICON}
                size={64}
                label="Aeolian Edge (64px)"
                onActivate={handleActivate}
              />
              <XivActionButton
                icon={AEOLIAN_ICON}
                size={80}
                label="Aeolian Edge (80px)"
                onActivate={handleActivate}
              />
            </div>

            <div {...stylex.attrs(pageStyles.counter)}>
              Activations: <strong>{activations()}</strong>
            </div>

            <div style={{ "margin-top": "0.85rem" }}>
              <div style={{ color: "#a8a8a8", "font-size": "0.78rem", "margin-bottom": "2px" }}>
                Usage
              </div>
              <pre {...stylex.attrs(pageStyles.codePre)}>
                {`<XivActionButton
  icon="/images/xiv/icons/Aeolian_Edge.png"
  size={48}
  label="Aeolian Edge"
  onActivate={() => {}}
/>`}
              </pre>
            </div>
          </div>
        </XivCard>

        {/* XivButton */}
        <div style={{ "margin-top": "1.25rem" }}>
          <XivCard xstyle={cardSizes.medium}>
            <div style={{ padding: "13px 18px" }}>
              <div {...stylex.attrs(pageStyles.cardTitle)}>XivButton</div>
              <p {...stylex.attrs(pageStyles.cardText)} style={{ "margin-bottom": "0.55rem" }}>
                General-purpose button with FFXIV gradient fill, hover brighten, and active press
                translation.
              </p>

              <div
                style={{ display: "flex", gap: "12px", "flex-wrap": "wrap", margin: "6px 0 10px" }}
              >
                <XivButton label="Default" onActivate={handleActivate} />
                <XivButton label="Apply" onActivate={handleActivate} />
                <XivButton label="Disabled" disabled />
              </div>

              <div>
                <div style={{ color: "#a8a8a8", "font-size": "0.78rem", "margin-bottom": "2px" }}>
                  Usage
                </div>
                <pre {...stylex.attrs(pageStyles.codePre)}>
                  {`<XivButton label="Apply" onActivate={() => {}} disabled={false} />`}
                </pre>
              </div>
            </div>
          </XivCard>
        </div>

        {/* XivCard + Composition */}
        <div style={{ "margin-top": "1.25rem" }}>
          <XivCard xstyle={cardSizes.tall}>
            <div style={{ padding: "13px 18px" }}>
              <div {...stylex.attrs(pageStyles.cardTitle)}>XivCard</div>
              <p {...stylex.attrs(pageStyles.cardText)} style={{ "margin-bottom": "0.65rem" }}>
                Ornate window using layered gradients, inset shadows, and fixed border radii.
                Content sits in the interior. Specify width/height only via the <code>xstyle</code>{" "}
                prop.
              </p>

              {/* Composition examples: other components living inside cards */}
              <div
                style={{ display: "flex", "flex-wrap": "wrap", gap: "14px", "margin-top": "6px" }}
              >
                <XivCard xstyle={cardSizes.small}>
                  <div style={{ padding: "9px 12px", color: "#ddd", "font-size": "0.82rem" }}>
                    <div
                      style={{ color: "#e8d9a0", "margin-bottom": "4px", "font-size": "0.8rem" }}
                    >
                      Card with buttons
                    </div>
                    <div style={{ display: "flex", gap: "8px", "margin-top": "4px" }}>
                      <XivActionButton icon={AEOLIAN_ICON} size={40} onActivate={handleActivate} />
                      <XivActionButton icon={AEOLIAN_ICON} size={40} onActivate={handleActivate} />
                    </div>
                  </div>
                </XivCard>

                <XivCard xstyle={cardSizes.small}>
                  <div style={{ padding: "9px 12px", color: "#ddd", "font-size": "0.82rem" }}>
                    <div
                      style={{ color: "#e8d9a0", "margin-bottom": "6px", "font-size": "0.8rem" }}
                    >
                      Card with XivButton
                    </div>
                    <XivButton label="Confirm" onActivate={handleActivate} />
                  </div>
                </XivCard>

                <XivCard xstyle={cardSizes.small}>
                  <div style={{ padding: "9px 12px", color: "#ddd", "font-size": "0.82rem" }}>
                    <strong>Basic card</strong>
                    <br />
                    218×138 — gradient frame stays consistent while resizing.
                  </div>
                </XivCard>
              </div>
            </div>
          </XivCard>
        </div>

        {/* Size variations row */}
        <div
          style={{
            "margin-top": "1.1rem",
            display: "flex",
            "flex-wrap": "wrap",
            gap: "12px",
            "justify-content": "center",
          }}
        >
          <XivCard xstyle={cardSizes.sizeSmall}>
            <div style={{ padding: "8px 12px", color: "#ddd", "font-size": "0.82rem" }}>
              <strong>Small</strong>
              <br />
              240×118
            </div>
          </XivCard>
          <XivCard xstyle={cardSizes.sizeMedium}>
            <div style={{ padding: "8px 12px", color: "#ddd", "font-size": "0.82rem" }}>
              <strong>Medium</strong>
              <br />
              300×118 — border radius and frame width stay fixed.
            </div>
          </XivCard>
          <div {...stylex.attrs(pageStyles.wideCardWrapper)}>
            <XivCard xstyle={cardSizes.sizeWide}>
              <div style={{ padding: "8px 12px", color: "#ddd", "font-size": "0.82rem" }}>
                <strong>Wide (100%)</strong>
                <br />
                Constrained to 420px max. Gradient border does not stretch artwork.
              </div>
            </XivCard>
          </div>
        </div>

        {/* Usage for Card */}
        <div style={{ "margin-top": "1.1rem" }}>
          <XivCard xstyle={cardSizes.usage}>
            <div style={{ padding: "12px 16px" }}>
              <div style={{ color: "#a8a8a8", "font-size": "0.78rem", "margin-bottom": "3px" }}>
                Usage
              </div>
              <pre {...stylex.attrs(pageStyles.codePre)}>
                {`<XivCard xstyle={cardSizes.myCard}>
  Your content here
</XivCard>`}
              </pre>
            </div>
          </XivCard>
        </div>
      </div>
    </main>
  );
}
