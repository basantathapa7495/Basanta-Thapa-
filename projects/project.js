const projects = [
  {
    title: "Birthday Surprise Generator",
    description: "Create a playful birthday page with a personal message, confetti, music, and a shareable surprise.",
    image: "../assets/img/project1.jpg",
    link: "project1.html",
    category: "web-app",
    categoryLabel: "Web app",
    status: "live",
    tags: ["JavaScript", "Interaction", "Celebration"]
  },
  {
    title: "Age Calculator",
    description: "A focused utility that turns a birth date into a clear age result with a simple, friendly experience.",
    image: "../assets/img/project2.jpg",
    link: "project2.html",
    category: "utility",
    categoryLabel: "Utility",
    status: "live",
    tags: ["JavaScript", "Dates", "Utility"]
  },
  {
    title: "Love Percentage Calculator",
    description: "A lighthearted name-based experiment made to practice form handling, logic, and playful interface design.",
    image: "../assets/img/project3.jpg",
    link: "project3.html",
    category: "fun-tool",
    categoryLabel: "Fun tool",
    status: "live",
    tags: ["JavaScript", "Forms", "Playful UI"]
  }
];

const projectGrid = document.getElementById("projectGrid");
const searchInput = document.getElementById("projectSearch");
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const resultCount = document.getElementById("resultCount");
const projectCount = document.getElementById("projectCount");
const liveCount = document.getElementById("liveCount");
const emptyState = document.getElementById("emptyState");

let activeFilter = "all";

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function renderProjects(items) {
  projectGrid.innerHTML = items.map((project, index) => {
    const tags = project.tags
      .map(tag => `<span class="project-tag">${escapeHtml(tag)}</span>`)
      .join("");

    return `
      <article class="project-card">
        <div class="project-image-wrap">
          <img class="project-image" src="${project.image}" alt="" loading="lazy">
          <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="project-status">${project.status === "live" ? "Live now" : "In progress"}</span>
        </div>
        <div class="project-content">
          <p class="project-category">${project.categoryLabel}</p>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <p class="project-description">${escapeHtml(project.description)}</p>
          <div class="project-tags" aria-label="Skills used">${tags}</div>
          <a class="project-link" href="${project.link}">
            Open project
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9"/>
            </svg>
          </a>
        </div>
      </article>
    `;
  }).join("");

  resultCount.textContent = items.length;
  emptyState.hidden = items.length !== 0;
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeFilter === "all" || project.category === activeFilter;
    const searchableText = [
      project.title,
      project.description,
      project.categoryLabel,
      ...project.tags
    ].join(" ").toLowerCase();

    return matchesCategory && searchableText.includes(query);
  });

  renderProjects(filteredProjects);
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach(filterButton => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

projectCount.textContent = projects.length;
liveCount.textContent = projects.filter(project => project.status === "live").length;
renderProjects(projects);
