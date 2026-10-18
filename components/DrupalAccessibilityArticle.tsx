"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article: ArticleData = {
  kicker: "Drupal Notes • Accessibility",
  focus: "Accessibility",
  icon: "shield",
  series: "Drupal Notes",
  theme: "Public-sector web",
  title: "Accessibility as a Build Requirement: WCAG 2.2 AA Checks in a Drupal CI Pipeline",
  subtitle:
    "Public-sector websites must meet accessibility regulations. Here is how I made WCAG 2.2 AA something the build checks on every push, what it caught, and what automated testing can't tell you.",
  readTime: "8 min",
  blocks: [
    {
      t: "p",
      text: "UK public-sector websites have a legal duty to be accessible, and the standard they are measured against is WCAG. For a council, the people who most need a service, such as older residents, screen reader users and people on old phones, are often the people a careless website shuts out.",
    },
    {
      t: "p",
      text: "When I built **Council Services on Drupal 11**, a bin day finder for a fictional council, I treated accessibility as a requirement from the first commit, not a check at the end. This post covers what that meant in practice.",
    },
    {
      t: "pull",
      text: "If accessibility only gets checked before launch, it gets traded away. If the build checks it, it can't be.",
    },
    { t: "h2", text: "Automated Checks on Every Push" },
    {
      t: "p",
      text: "The GitHub Actions pipeline installs a fresh Drupal site, then a Playwright script visits five page states at desktop and mobile sizes and runs axe-core against each one. Any violation fails the build.",
    },
    {
      t: "list",
      items: [
        "The home page.",
        "The empty postcode form.",
        "The results after a successful search.",
        "The form after a validation error.",
        "The login page, which shows the form as a sidebar block.",
      ],
    },
    {
      t: "code",
      text: "const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];",
    },
    {
      t: "p",
      text: "The same script checks that the skip link is the first Tab stop and that focus moves to the results after a search. It also saves screenshots as a build artifact, so a reviewer can see what was tested without running anything.",
    },
    { t: "h2", text: "What It Caught" },
    {
      t: "p",
      text: "The first run found two real problems. Neither was obvious by looking at the page.",
    },
    {
      t: "table",
      headers: ["Problem", "Cause", "Fix"],
      rows: [
        [
          "Two contentinfo landmarks",
          "The base theme wraps every status message in role=\"contentinfo\", which clashes with the site footer",
          "A theme override that uses role=\"alert\" for errors and role=\"status\" for other messages",
        ],
        [
          "Content outside any landmark",
          "The \"this is a demo site\" banner sat between the header and the main content",
          "Made it a labelled section, so screen reader users can find and skip it",
        ],
      ],
    },
    {
      t: "p",
      text: "Now axe-core reports 0 violations across all five states, and the pipeline keeps it that way.",
    },
    { t: "h2", text: "Patterns That Help Everyone" },
    {
      t: "p",
      text: "I didn't invent the interface. I followed the GOV.UK Design System, because its patterns have been researched with real users, including disabled users.",
    },
    {
      t: "list",
      items: [
        "**Error summary.** When validation fails, a box titled \"There is a problem\" appears at the top and links straight to the field.",
        "**Hint and error before the input.** \"For example, S1 2HH\" and any error message come before the text box, so screen readers announce them first.",
        "**Specific error messages.** \"Enter a real UK postcode, like S1 2HH\" says what to do, not just that something went wrong.",
        "**A skip link.** The first thing a keyboard user reaches with Tab is a link that jumps to the main content.",
        "**Focus moves to the results.** After a search, a small script moves focus to the results heading, so screen reader users know the results have appeared.",
      ],
    },
    { t: "h2", text: "Contrast, Fonts and JavaScript" },
    {
      t: "p",
      text: "WCAG AA needs a contrast ratio of at least 4.5:1 for normal text. I checked every colour pair in the theme, and the lowest is 6.2:1. The theme uses system fonts and no JavaScript framework, so pages load quickly on slow connections. The form works with JavaScript turned off; the script only adds the focus improvement.",
    },
    { t: "h2", text: "What Automation Can't Tell You" },
    {
      t: "p",
      text: "Automated tools only catch part of the picture. axe-core can tell you a label is missing. It can't tell you whether the label makes sense, whether the order of a page is logical when read aloud, or whether a real person can complete the task.",
    },
    {
      t: "list",
      items: [
        "Manual testing with NVDA on Windows and VoiceOver on iPhone.",
        "Testing at 200% and 400% zoom.",
        "Keyboard-only walkthroughs of every journey.",
        "Ideally, testing with residents who use assistive technology every day.",
      ],
    },
    {
      t: "p",
      text: "Those are the next steps for this project, and they're written up in the repository's accessibility report alongside the automated results.",
    },
    {
      t: "pull",
      text: "Automated checks set the floor. People decide whether a service actually works.",
    },
  ],
};

export default function DrupalAccessibilityArticle() {
  return <ArticleShell article={article} />;
}
