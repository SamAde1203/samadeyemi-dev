"use client";

import ArticleShell, { type ArticleData } from "./ArticleShell";

const article: ArticleData = {
  kicker: "Drupal Notes • Drupal 11",
  focus: "Drupal 11",
  icon: "boxes",
  series: "Drupal Notes",
  theme: "Public-sector web",
  title: "Back to Drupal After Ten Years: Building a Council Service in Drupal 11",
  subtitle:
    "I last wrote Drupal code over a decade ago and have spent the years since on WordPress, Python and AI. Here is what changed when I came back to build a bin day finder for a fictional council.",
  readTime: "9 min",
  blocks: [
    {
      t: "p",
      text: "Most of my recent work is Python, FastAPI and AI systems, and I have built WordPress sites for around fifteen years. Drupal was something I last used more than ten years ago. When I started looking at public-sector web roles, I wanted proof, for myself as much as anyone, that I could still build properly in it.",
    },
    {
      t: "p",
      text: "So I built a small but complete project: **Council Services on Drupal 11**. Residents of the fictional Demo City Council enter a postcode and see their next black, blue and brown bin collections. It has a custom module, a custom accessible theme, 26 automated tests and a CI pipeline. The code is on GitHub at github.com/SamAde1203/council-services-drupal.",
    },
    {
      t: "pull",
      text: "Drupal 11 feels much more like modern PHP than the Drupal I remember.",
    },
    { t: "h2", text: "What Changed Since I Last Used Drupal" },
    {
      t: "p",
      text: "The biggest change is that Drupal now reads like a well-structured Symfony application. The ideas I use every day in Python, such as small services, dependency injection and configuration kept out of code, are the normal way of working.",
    },
    {
      t: "table",
      headers: ["Then", "Drupal 11"],
      rows: [
        ["Procedural hooks in a .module file", "Hook classes with a #[Hook] attribute"],
        ["Annotations in doc comments for plugins", "PHP attributes such as #[Block]"],
        ["Global functions and static calls", "Services injected through the container"],
        ["Settings hard-coded or in variables", "Configuration with a schema, exportable and deployable"],
        ["Tests as an afterthought", "PHPUnit unit, kernel and functional tests built into core"],
      ],
    },
    { t: "h2", text: "Hooks Are Now Classes" },
    {
      t: "p",
      text: "Hooks used to be functions named after the module. In Drupal 11 they can live in a class, marked with an attribute. The class can use traits and injected services like any other code.",
    },
    {
      t: "code",
      text: "final class BinDayFinderHooks {\n\n  #[Hook('theme')]\n  public function theme(): array {\n    return [\n      'bin_day_finder_results' => [\n        'variables' => [\n          'postcode' => NULL,\n          'verified' => TRUE,\n          'collections' => [],\n        ],\n      ],\n    ];\n  }\n\n}",
    },
    {
      t: "p",
      text: "Plugins work the same way. The sidebar block that puts the postcode form in any region is declared with a #[Block] attribute instead of a doc-comment annotation.",
    },
    { t: "h2", text: "Services Behind Interfaces" },
    {
      t: "p",
      text: "The module has two services. **PostcodeLookup** checks a postcode exists using the postcodes.io API. **CollectionScheduleProvider** turns a postcode into collection dates. Each sits behind an interface and is wired up in the services file.",
    },
    {
      t: "code",
      text: "bin_day_finder.postcode_lookup:\n  class: Drupal\\bin_day_finder\\Service\\PostcodeLookup\n  arguments:\n    - '@http_client'\n    - '@cache.default'\n    - '@config.factory'\n    - '@datetime.time'\n    - '@logger.channel.bin_day_finder'",
    },
    {
      t: "p",
      text: "This matters for a council. The schedule here is demonstration data, but a real council would connect the same interface to its waste-management system. Nothing else in the module would need to change, and the tests can swap in a fake HTTP client so they never call the real API.",
    },
    { t: "h2", text: "Designing for When Things Fail" },
    {
      t: "p",
      text: "A public service shouldn't stop working because a third-party API is down. If postcodes.io returns a 404, the postcode isn't real and the resident sees a clear error. If it times out or returns a server error, the module logs a warning and still gives the resident an answer, labelled as unverified.",
    },
    {
      t: "list",
      items: [
        "A 5-second timeout, so a slow API never hangs the page.",
        "Successful lookups cached for 24 hours, tagged so that saving the settings clears them.",
        "Rate limiting with Drupal's flood service: 20 searches per visitor per hour by default.",
        "An admin settings page, so staff can change these without a developer.",
      ],
    },
    { t: "h2", text: "Two Bugs the Tests Caught" },
    {
      t: "p",
      text: "The functional tests drive the real form through a browser-like client. They found two bugs I would not have spotted by clicking around.",
    },
    {
      t: "h3",
      text: "1. A crash on the second search",
    },
    {
      t: "p",
      text: "I had written the form's injected services as **private readonly** properties, which is my habit in modern PHP. The first search worked and the second crashed. Drupal serialises a form between requests and re-injects its services when it wakes it up. That code runs in a parent class, so it can't write to private readonly properties declared in the child. Changing them to **protected** fixed it, and I left a comment in the class explaining why.",
    },
    {
      t: "h3",
      text: "2. Old results beside a new error",
    },
    {
      t: "p",
      text: "Search for a valid postcode, then type an invalid one, and the page showed the new error above the previous postcode's dates. A resident could easily read the wrong dates. The fix is to clear any stored result at the start of validation.",
    },
    {
      t: "code",
      text: "public function validateForm(array &$form, FormStateInterface $form_state): void {\n  // Never show the previous postcode's dates alongside a new search's error.\n  $form_state->set('result', NULL);\n  unset($form['results']);\n  // ...flood check, then the postcode lookup\n}",
    },
    { t: "h2", text: "How I Worked" },
    {
      t: "p",
      text: "I used Claude Code as a pair programmer throughout, the same way I do in my Python work. It sped up the parts I had forgotten, such as file layouts and the exact names of core services. I reviewed every change, and the tests, coding standards checks and accessibility checks in CI decided what was finished, not the assistant.",
    },
    {
      t: "p",
      text: "The local setup uses DDEV and Docker, and one command installs the site, the module, the theme and a welcome page. Getting that working on Windows taught me more than I expected, from line endings in shell scripts to a corrupted database image, and it's now documented in the README.",
    },
    { t: "h2", text: "What I Would Do Next" },
    {
      t: "list",
      items: [
        "Connect the schedule interface to a real waste-management API.",
        "Add bin day reminder emails using Drupal's Queue API and cron.",
        "Run PHPStan at a high level alongside the coding standards.",
        "Move the theme's preprocess functions into hook classes before Drupal 11.5 deprecates .theme files.",
        "Test manually with NVDA and VoiceOver, on top of the automated checks.",
      ],
    },
    {
      t: "pull",
      text: "Coming back after ten years, the platform had moved on, and the engineering habits I use every day transferred directly.",
    },
  ],
};

export default function DrupalReturnArticle() {
  return <ArticleShell article={article} />;
}
