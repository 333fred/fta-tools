/*
  Add new links by appending an item inside one of the sections below.

  Each item should look like:
  {
    name: "Tool name",
    url: "https://example.com",
    description: "Why an FTA would open it",
    tags: ["keyword", "another keyword"]
  }
*/

const toolSections = [
  {
    title: "Official FIRST Resources",
    description: "Core sites that are regularly useful before and during events.",
    items: [
      {
        name: "FRC Events",
        url: "https://frc-events.firstinspires.org/",
        description: "Official schedules, match results, rankings, and event details.",
        tags: ["events", "results", "schedules"]
      },
      {
        name: "FRC Resource Library",
        url: "https://www.firstinspires.org/resource-library/frc",
        description: "FIRST's central home for FRC manuals, updates, and season resources.",
        tags: ["manual", "resources", "official"]
      },
      {
        name: "Competition Manual and Q&A",
        url: "https://www.firstinspires.org/resource-library/frc/competition-manual-qa-system",
        description: "Quick jump point for the current manual and official rules questions.",
        tags: ["rules", "manual", "q&a"]
      },
      {
        name: "FRC Q&A",
        url: "https://frc-qa.firstinspires.org/qa",
        description: "Browse official questions and answers about the game and rules.",
        tags: ["questions", "rules", "clarifications"]
      }
    ]
  },
  {
    title: "Robot Software and Diagnostics",
    description: "Reference material and tools that help when debugging robot-side issues.",
    items: [
      {
        name: "WPILib Docs",
        url: "https://docs.wpilib.org/en/stable/",
        description: "Primary documentation for FRC control system software and configuration.",
        tags: ["wpilib", "software", "docs"]
      },
      {
        name: "WPILib ScreenSteps",
        url: "https://docs.wpilib.org/en/stable/docs/zero-to-robot/introduction.html",
        description: "Step-by-step control system setup instructions and core bring-up guidance.",
        tags: ["setup", "control system", "network"]
      },
      {
        name: "AdvantageScope",
        url: "https://www.advantagescope.org/",
        description: "Useful for reviewing logs and telemetry when teams are debugging behavior.",
        tags: ["logs", "telemetry", "analysis"]
      }
    ]
  },
  {
    title: "Community Reference",
    description: "Commonly used community tools that can add context during event support.",
    items: [
      {
        name: "The Blue Alliance",
        url: "https://www.thebluealliance.com/",
        description: "Community database of teams, events, and match history.",
        tags: ["teams", "history", "stats"]
      },
      {
        name: "Chief Delphi",
        url: "https://www.chiefdelphi.com/",
        description: "Community discussions and past troubleshooting threads.",
        tags: ["community", "forum", "support"]
      }
    ]
  }
];

if (!Array.isArray(toolSections)) {
  throw new Error("toolSections must be an array.");
}

const searchInput = document.querySelector("#tool-search");
const sectionsRoot = document.querySelector("#sections");
const emptyState = document.querySelector("#empty-state");
const toolCount = document.querySelector("#tool-count");

function createTagList(tags) {
  const tagList = document.createElement("div");
  tagList.className = "tag-list";

  for (const tag of tags) {
    const tagElement = document.createElement("span");
    tagElement.className = "tag";
    tagElement.textContent = tag;
    tagList.append(tagElement);
  }

  return tagList;
}

function createCard(item) {
  const card = document.createElement("a");
  card.className = "card";
  card.href = item.url;
  card.target = "_blank";
  card.rel = "noreferrer noopener";
  card.setAttribute("aria-label", `${item.name} (opens in a new tab)`);

  const title = document.createElement("h3");
  title.className = "card__title";
  title.textContent = item.name;

  const description = document.createElement("p");
  description.className = "card__description";
  description.textContent = item.description;

  const meta = document.createElement("div");
  meta.className = "card__meta";

  const openText = document.createElement("span");
  openText.textContent = "Open link";

  meta.append(createTagList(item.tags), openText);
  card.append(title, description, meta);

  return card;
}

function matchesSearch(item, query) {
  const haystack = [item.name, item.description, ...(item.tags || [])]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function renderSections(query = "") {
  sectionsRoot.replaceChildren();

  let visibleToolCount = 0;

  for (const sectionData of toolSections) {
    const items = sectionData.items.filter((item) => matchesSearch(item, query));

    if (items.length === 0) {
      continue;
    }

    visibleToolCount += items.length;

    const section = document.createElement("section");
    section.className = "section";

    const header = document.createElement("div");
    header.className = "section__header";

    const title = document.createElement("h2");
    title.className = "section__title";
    title.textContent = sectionData.title;

    const description = document.createElement("p");
    description.className = "section__description";
    description.textContent = sectionData.description;

    header.append(title, description);

    const grid = document.createElement("div");
    grid.className = "card-grid";
    items.forEach((item) => grid.append(createCard(item)));

    section.append(header, grid);
    sectionsRoot.append(section);
  }

  const totalLabel = `${visibleToolCount} link${visibleToolCount === 1 ? "" : "s"}`;
  toolCount.textContent = totalLabel;
  emptyState.hidden = visibleToolCount !== 0;
}

searchInput.addEventListener("input", (event) => {
  renderSections(event.target.value.trim().toLowerCase());
});

renderSections();
