import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";

import { colorVars } from "../styles/theme.stylex";
import LUICard, { LUIProfilePhotoHeader } from "./LUICard";

const profileAbout =
  "Hello! I'm Joel, a cat loving engineer with a focus on design systems, product engineering, accessibility, and AI.";

const profileSections = [
  {
    body: profileAbout,
    title: "About",
  },
  {
    items: [
      "Typescript",
      { label: "StyleX", url: "https://stylexjs.com" },
      "GraphQL",
      "React",
    ],
    title: "Tools I Like",
  },
  {
    items: ["日本語しゃべる", "Final Fantasy XIV", "Gym"],
    title: "Hobbies",
  },
  {
    items: [
      "The Way of Kings",
      "Operating Systems: Three Easy Pieces",
      "Atomic Habits",
    ],
    title: "Most Recent Reads",
  },
] as const;

type AboutCardProps = {
  xstyle?: StyleXStyles;
};

export default function AboutCard({ xstyle }: AboutCardProps) {
  return (
    <LUICard
      animationId="profile"
      aria-labelledby="profile-card-title"
      header={
        <LUIProfilePhotoHeader
          hoverProfilePhoto={{
            src: "/img/cat.jpeg",
            alt: "Cat",
          }}
          profilePhoto={{
            src: "/img/DSC_0252_Original.jpeg",
            alt: "Joel Austin under flowering tree branches",
          }}
          title="Profile"
          titleId="profile-card-title"
        />
      }
      order={0.7}
      timing="chunky"
      xstyle={xstyle}
    >
      <div {...stylex.props(styles.profileSections)}>
        {profileSections.map((section) => (
          <section
            key={section.title}
            aria-labelledby={`profile-${section.title
              .toLowerCase()
              .replaceAll(" ", "-")}`}
            {...stylex.props(styles.profileSection)}
          >
            <h3
              id={`profile-${section.title.toLowerCase().replaceAll(" ", "-")}`}
              {...stylex.props(styles.profileSectionTitle)}
            >
              {section.title}
            </h3>
            {"body" in section ? (
              <p {...stylex.props(styles.cardText)}>{section.body}</p>
            ) : (
              <ul {...stylex.props(styles.profileList)}>
                {section.items.map((item) => (
                  <li key={typeof item === "string" ? item : item.label}>
                    {typeof item === "string" ? (
                      item
                    ) : (
                      <a
                        href={item.url}
                        rel="noreferrer"
                        target="_blank"
                        {...stylex.props(styles.profileLink)}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </LUICard>
  );
}

const styles = stylex.create({
  cardText: {
    margin: 0,
    color: colorVars.secondaryTextColor,
    fontSize: 14,
    lineHeight: 1.6,
  },
  profileLink: {
    color: colorVars.primaryBlue,
    textDecorationColor: "rgba(115, 221, 255, .52)",
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textUnderlineOffset: 3,
  },
  profileList: {
    gap: 6,
    marginBlock: 0,
    marginInline: 0,
    color: colorVars.secondaryTextColor,
    display: "grid",
    fontSize: 13,
    lineHeight: 1.45,
    paddingInlineStart: 16,
  },
  profileSection: {
    gap: 7,
    display: "grid",
  },
  profileSections: {
    gap: 16,
    display: "grid",
  },
  profileSectionTitle: {
    marginBlock: 0,
    marginInline: 0,
    color: colorVars.primaryTextColor,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "var(--lui-letter-spacing)",
    lineHeight: 1,
    textTransform: "uppercase",
  },
});
