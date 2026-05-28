import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import * as stylex from "@stylexjs/stylex";
import "./app.css";
import StyleXDev from "./components/StyleXDev";
import { colors } from "./tokens.stylex";

const headerStyles = stylex.create({
  nav: {
    display: "flex",
    gap: "1rem",
    padding: "0.5rem 1rem",
    borderBottom: "1px solid #eee",
  },
  link: {
    color: colors.primary,
    textDecoration: "none",
    fontWeight: 500,
    ":hover": {
      textDecoration: "underline",
    },
  },
});

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <nav {...stylex.attrs(headerStyles.nav)}>
            <a {...stylex.attrs(headerStyles.link)} href="/">Index</a>
            <a {...stylex.attrs(headerStyles.link)} href="/about">About</a>
          </nav>
          <StyleXDev />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
