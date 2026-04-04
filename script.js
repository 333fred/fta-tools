/*
  Add new links by appending an item inside one of the sections below.

  Each item should look like:
  {
    name: "Tool name",
    resourceUrl: "https://example.com",
    sourceUrl: "https://github.com/example/project", // optional
    maintainer: "Who maintains it",
    description: "Why an FTA would open it",
    tags: ["keyword", "another keyword"]
  }
*/

const toolSections = [
  {
    title: "Event Planning and Analytics",
    description: "Scheduling and cycle-time tools that can help FTAs evaluate event flow.",
    items: [
      {
        name: "Cycle Time Reports",
        resourceUrl: "http://lopreiato.me/frc-cycle-times/",
        sourceUrl: "https://github.com/phil-lopreiato/frc-cycle-times",
        maintainer: "Phil Lopreiato",
        description: "Cycle-time reporting for reviewing match throughput and field timing trends.",
        tags: ["cycle time", "reports", "analytics"]
      },
      {
        name: "Nexus for FRC",
        resourceUrl: "https://frc.nexus/",
        maintainer: "Evan Forbes",
        description: "An event management system for FIRST Robotics Competition events.",
        tags: ["nexus", "queue", "inspection", "csa", "lri", "fta", "notepad"]
      },
      {
        name: "Schedule Builder",
        resourceUrl: "https://lopreiato.me/frc-schedule-builder/",
        sourceUrl: "https://github.com/phil-lopreiato/frc-schedule-builder",
        maintainer: "Phil Lopreiato",
        description: "Build event schedules with a web interface tailored to FRC timing needs.",
        tags: ["schedule", "planning", "builder"]
      },
      {
        name: "Schedule Builder",
        resourceUrl: "https://frc-scheduler.roadfeldt.com:8088/",
        sourceUrl: "https://github.com/croadfeldt/frc-scheduler-server",
        maintainer: "Chris Roadfeldt",
        description: "Alternative schedule builder deployment for generating event schedules.",
        tags: ["schedule", "planning", "builder"]
      }
    ]
  },
  {
    title: "Official FIRST Resources",
    description: "Core sites that are regularly useful before and during events.",
    items: [
      {
        name: "FRC Events",
        resourceUrl: "https://frc-events.firstinspires.org/",
        maintainer: "FIRST",
        description: "Official schedules, match results, rankings, and event details.",
        tags: ["events", "results", "schedules"]
      },
      {
        name: "Game Manual",
        resourceUrl: "https://firstfrc.blob.core.windows.net/frc2026/Manual/2026GameManual.pdf",
        maintainer: "FIRST",
        description: "Direct PDF link to the current FRC game manual.",
        tags: ["game manual", "rules", "season"]
      },
      {
        name: "Field Manual",
        resourceUrl: "https://firstfrc.blob.core.windows.net/frc2026/FieldAssets/field-manual.pdf",
        maintainer: "FIRST",
        description: "Direct PDF link to the current official field manual.",
        tags: ["field manual", "field", "pdf"]
      },
      {
        name: "FRC Q&A",
        resourceUrl: "https://frc-qa.firstinspires.org/qa",
        maintainer: "FIRST",
        description: "Browse official questions and answers about the game and rules.",
        tags: ["questions", "rules", "clarifications"]
      },
      {
        name: "FRC Resource Library",
        resourceUrl: "https://www.firstinspires.org/resources/library#first_robotics_competition",
        maintainer: "FIRST",
        description: "FIRST's central home for FRC manuals, updates, and season resources.",
        tags: ["manual", "resources", "official"]
      }
    ]
  },
  {
    title: "Robot Software and Diagnostics",
    description: "Reference material and tools that help when debugging robot-side issues.",
    items: [
      {
        name: "WPILib Docs",
        resourceUrl: "https://docs.wpilib.org/en/stable/",
        sourceUrl: "https://github.com/wpilibsuite/frc-docs",
        maintainer: "WPILib Suite",
        description: "Primary documentation for FRC control system software and configuration.",
        tags: ["wpilib", "software", "docs"]
      },
      {
        name: "WPILib ScreenSteps",
        resourceUrl: "https://docs.wpilib.org/en/stable/docs/zero-to-robot/introduction.html",
        sourceUrl: "https://github.com/wpilibsuite/frc-docs",
        maintainer: "WPILib Suite",
        description: "Step-by-step control system setup instructions and core bring-up guidance.",
        tags: ["setup", "control system", "network"]
      },
      {
        name: "AdvantageScope",
        resourceUrl: "https://www.advantagescope.org/",
        sourceUrl: "https://github.com/Mechanical-Advantage/AdvantageScope",
        maintainer: "Mechanical Advantage",
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
        resourceUrl: "https://www.thebluealliance.com/",
        sourceUrl: "https://github.com/the-blue-alliance/the-blue-alliance",
        maintainer: "The Blue Alliance contributors",
        description: "Community database of teams, events, and match history.",
        tags: ["teams", "history", "stats"]
      },
      {
        name: "Chief Delphi",
        resourceUrl: "https://www.chiefdelphi.com/",
        maintainer: "Chief Delphi",
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
  const card = document.createElement("article");
  card.className = "card";

  const mainLink = document.createElement("a");
  mainLink.className = "card__main-link";
  mainLink.href = item.resourceUrl;
  mainLink.target = "_blank";
  mainLink.rel = "noreferrer noopener";
  mainLink.setAttribute("aria-label", `${item.name} resource (opens in a new tab)`);

  const title = document.createElement("h3");
  title.className = "card__title";
  title.textContent = item.name;

  const description = document.createElement("p");
  description.className = "card__description";
  description.textContent = item.description;

  const maintainer = document.createElement("p");
  maintainer.className = "card__maintainer";

  const maintainerLabel = document.createElement("span");
  maintainerLabel.className = "card__maintainer-label";
  maintainerLabel.textContent = "Maintainer: ";

  maintainer.append(maintainerLabel, item.maintainer);

  const footer = document.createElement("div");
  footer.className = "card__footer";

  const links = document.createElement("div");
  links.className = "card__links";

  if (item.sourceUrl) {
    const sourceLink = document.createElement("a");
    sourceLink.className = "card__link";
    sourceLink.href = item.sourceUrl;
    sourceLink.target = "_blank";
    sourceLink.rel = "noreferrer noopener";
    sourceLink.textContent = "View source";
    sourceLink.setAttribute("aria-label", `${item.name} source (opens in a new tab)`);
    links.append(sourceLink);
  }

  footer.append(maintainer, links, createTagList(item.tags));

  const externalIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  externalIcon.setAttribute("class", "card__external-icon");
  externalIcon.setAttribute("aria-hidden", "true");
  externalIcon.setAttribute("viewBox", "0 0 24 24");
  externalIcon.setAttribute("fill", "none");
  externalIcon.setAttribute("stroke", "currentColor");
  externalIcon.setAttribute("stroke-width", "2");
  externalIcon.setAttribute("stroke-linecap", "round");
  externalIcon.setAttribute("stroke-linejoin", "round");

  const iconBox = document.createElementNS("http://www.w3.org/2000/svg", "path");
  iconBox.setAttribute("d", "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6");
  const iconArrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  iconArrow.setAttribute("d", "M15 3h6v6M10 14L21 3");
  externalIcon.append(iconBox, iconArrow);

  card.append(mainLink, title, description, footer, externalIcon);

  return card;
}

function matchesSearch(item, query) {
  const haystack = [
    item.name,
    item.description,
    item.maintainer,
    item.resourceUrl,
    item.sourceUrl || "",
    ...(item.tags || [])
  ]
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
