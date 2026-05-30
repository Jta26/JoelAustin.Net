import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";
import Counter from "~/components/Counter";
import XivActionButton from "~/components/XivActionButton";
import XivButton from "~/components/XivButton";
import XivCard from "~/components/XivCard";

const AEOLIAN_ICON = "/images/xiv/icons/Aeolian_Edge.png";

export default function Home() {
  const [activations, setActivations] = createSignal(0);

  const handleActivate = () => {
    setActivations(n => n + 1);
  };

  return (
    <main>
      <Title>Joel Austin • XIV UI Components</Title>
      <h1>XIV UI Components Demo</h1>
      <p
        style={{
          "max-width": "640px",
          margin: "0 auto 2rem",
          color: "#666",
          "font-size": "0.95rem",
        }}
      >
        A collection of reusable SolidJS components built with authentic Final Fantasy XIV UI
        assets.
      </p>

      <section style={{ "margin-bottom": "2rem" }}>
        <h2 style={{ "font-size": "1.1rem", "margin-bottom": "0.75rem", color: "#555" }}>
          Interactive Component (DOM layers + CSS glow)
        </h2>
        <div
          style={{
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            gap: "12px",
            "flex-wrap": "wrap",
            padding: "12px",
            background: "#f8f8f8",
            "border-radius": "8px",
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
        <p style={{ "font-size": "0.85rem", color: "#666", "margin-top": "0.5rem" }}>
          Click any button • Hover for lift • Press for tactile feedback • Uses the three source
          assets layered in the browser
        </p>
        <div style={{ "font-size": "0.9rem", "margin-top": "0.25rem" }}>
          Activations: <strong>{activations()}</strong>
        </div>
      </section>

      <section style={{ "margin-bottom": "2rem" }}>
        <h2 style={{ "font-size": "1.1rem", "margin-bottom": "0.75rem", color: "#555" }}>
          XivButton
        </h2>
        <p style={{ "font-size": "0.85rem", color: "#666", "margin-bottom": "1rem" }}>
          A general-purpose button styled after Final Fantasy XIV's UI buttons.
        </p>

        <div
          style={{
            display: "flex",
            "align-items": "center",
            gap: "12px",
            "flex-wrap": "wrap",
            padding: "12px",
            background: "#2a2a2a",
            "border-radius": "8px",
            "margin-bottom": "0.75rem",
          }}
        >
          <XivButton label="Default" onActivate={handleActivate} />
          <XivButton label="Apply" onActivate={handleActivate} />
          <XivButton label="Disabled" disabled />
        </div>

        <div style={{ "font-size": "0.85rem", color: "#666" }}>
          <strong>Usage:</strong>
          <pre
            style={{
              background: "#111",
              padding: "8px 12px",
              "border-radius": "4px",
              "font-size": "0.8rem",
              "margin-top": "4px",
              overflow: "auto",
            }}
          >
            {`<XivButton 
  label="Apply" 
  onActivate={() => {}} 
  disabled={false} 
/>`}
          </pre>
        </div>
      </section>

      <section style={{ "margin-bottom": "2rem" }}>
        <h2 style={{ "font-size": "1.1rem", "margin-bottom": "0.75rem", color: "#555" }}>
          XivCard
        </h2>
        <p style={{ "font-size": "0.85rem", color: "#666", "margin-bottom": "1rem" }}>
          A flexible card component using FFXIV-style border assets. Use the <code>xstyle</code>{" "}
          prop to control width and height (only these two properties are accepted).
        </p>

        <div
          style={{
            background: "#f0f0f0",
            padding: "16px",
            "border-radius": "6px",
            "margin-bottom": "1rem",
          }}
        >
          <div style={{ display: "flex", "flex-wrap": "wrap", gap: "16px" }}>
            <XivCard xstyle={{ width: 240, height: 120 }}>
              <div style={{ padding: "8px 12px", color: "#ddd", "font-size": "0.85rem" }}>
                <strong>Small Card</strong>
                <br />
                240×120 (transparent interior)
              </div>
            </XivCard>

            <XivCard xstyle={{ width: 320, height: 160 }}>
              <div style={{ padding: "12px 16px", color: "#ddd", "font-size": "0.9rem" }}>
                <strong>Medium Card</strong>
                <br />
                320×160 — The header and footer stretch horizontally while the side borders tile
                vertically.
              </div>
            </XivCard>

            <XivCard xstyle={{ width: "100%", height: 140 }} style={{ "max-width": "480px" }}>
              <div style={{ padding: "12px 16px", color: "#ddd", "font-size": "0.9rem" }}>
                <strong>Responsive Wide Card</strong>
                <br />
                Uses <code>width: "100%"</code>. Great for full-width content areas.
              </div>
            </XivCard>
          </div>
        </div>

        <div style={{ "font-size": "0.85rem", color: "#666" }}>
          <strong>Usage:</strong>
          <pre
            style={{
              background: "#111",
              padding: "8px 12px",
              "border-radius": "4px",
              "font-size": "0.8rem",
              "margin-top": "4px",
              overflow: "auto",
            }}
          >
            {`<XivCard xstyle={{ width: 320, height: 180 }}>
  Your content here
</XivCard>`}
          </pre>
        </div>
      </section>

      <section>
        <h2 style={{ "font-size": "1rem", color: "#555" }}>Source Assets Used</h2>

        <div style={{ "margin-bottom": "1.5rem" }}>
          <div style={{ "font-size": "0.75rem", color: "#888", "margin-bottom": "4px" }}>
            Action Button Assets
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              "justify-content": "center",
              "flex-wrap": "wrap",
            }}
          >
            <div>
              <div style={{ "font-size": "0.7rem", color: "#666" }}>Icon</div>
              <img
                src={AEOLIAN_ICON}
                width="76"
                height="76"
                alt="Aeolian Edge icon"
                style={{ "image-rendering": "pixelated" }}
              />
            </div>
            <div>
              <div style={{ "font-size": "0.7rem", color: "#666" }}>Base</div>
              <img
                src="/images/xiv/action-button/action-button-base.png"
                width="76"
                height="76"
                alt="Action button base"
              />
            </div>
            <div>
              <div style={{ "font-size": "0.7rem", color: "#666" }}>Frame</div>
              <img
                src="/images/xiv/action-button/action-button-frame.png"
                width="76"
                height="76"
                alt="Action button frame"
              />
            </div>
          </div>
        </div>

        <div>
          <div style={{ "font-size": "0.75rem", color: "#888", "margin-bottom": "4px" }}>
            Card Assets
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              "justify-content": "center",
              "flex-wrap": "wrap",
            }}
          >
            <div>
              <div style={{ "font-size": "0.7rem", color: "#666" }}>Header</div>
              <img src="/images/xiv/card/card-header.png" width="120" alt="Card header" />
            </div>
            <div>
              <div style={{ "font-size": "0.7rem", color: "#666" }}>Footer</div>
              <img src="/images/xiv/card/card-footer.png" width="120" alt="Card footer" />
            </div>
            <div>
              <div style={{ "font-size": "0.7rem", color: "#666" }}>
                Side Border (repeats vertically)
              </div>
              <img src="/images/xiv/card/card-side-border.png" width="60" alt="Card side border" />
            </div>
          </div>
        </div>
      </section>

      <Counter />

      <p style={{ "margin-top": "2.5rem" }}>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
