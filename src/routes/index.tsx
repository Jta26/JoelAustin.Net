import { Title } from "@solidjs/meta";

export default function Home() {
  return (
    <main>
      <Title>Joel Austin</Title>
      <h1>Joel Austin</h1>
      <p style={{ "max-width": "640px", margin: "0 auto", color: "#555", "font-size": "1rem" }}>
        SolidStart experiments with StyleX and custom UI components.
      </p>

      <p style={{ "margin-top": "2rem" }}>
        <a href="/components_demo" style={{ "font-size": "1.1rem" }}>
          XIV UI Components Demo →
        </a>
      </p>
    </main>
  );
}
