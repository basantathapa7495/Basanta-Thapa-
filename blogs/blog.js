const blogPosts = [
  {
    id: 4,
    title: "The Quiet Ways We Feel Close",
    excerpt: "A reflection on non-sexual intimacy: the small, ordinary moments that make someone feel safe, seen, and loved.",
    date: "September 24, 2026",
    readTime: "4 min read",
    category: "long-form",
    categoryLabel: "Long-form",
    image: "../assets/img/blog2.jpg",
    link: "non-sexual-intimacy.html"
  },
  {
    id: 1,
    title: "How I Built This Website",
    excerpt: "The story behind this site—the design choices, the tools I used, and what building it taught me about learning through action.",
    date: "June 02, 2026",
    readTime: "6 min read",
    category: "build",
    categoryLabel: "Build",
    image: "../assets/img/blog1.jpg",
    link: "blog1.html"
  },
  {
    id: 2,
    title: "Why I Chose the Slow Path",
    excerpt: "A reflection on long-form thinking, resisting quick trends, and creating work that can remain useful beyond one moment.",
    date: "May 28, 2026",
    readTime: "7 min read",
    category: "long-form",
    categoryLabel: "Long-form",
    image: "../assets/img/blog2.jpg",
    link: "blog2.html"
  },
  {
    id: 3,
    title: "The 10 Books That Changed My Thinking",
    excerpt: "The books that shaped how I think about life, useful work, business, creativity, and becoming a better learner.",
    date: "May 21, 2026",
    readTime: "8 min read",
    category: "learning",
    categoryLabel: "Learning",
    image: "../assets/img/blog3.jpg",
    link: "blog3.html"
  }
];

let currentCategory = "all";
let searchQuery = "";

function renderBlogPosts() {
  const grid = document.getElementById("blogGrid");
  if (!grid) return;

  const query = searchQuery.toLowerCase();
  const filtered = blogPosts.filter((post) => {
    const matchesCategory = currentCategory === "all" || post.category === currentCategory;
    const searchable = `${post.title} ${post.excerpt} ${post.categoryLabel}`.toLowerCase();
    return matchesCategory && searchable.includes(query);
  });

  document.getElementById("publishedCount")?.replaceChildren(String(blogPosts.length));
  document.getElementById("resultCount")?.replaceChildren(String(filtered.length));

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="no-results">
        <div>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
          <p>No notes match this search yet.</p>
        </div>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((post, index) => `
    <a href="${post.link}" class="blog-card fade-up" style="animation-delay:${Math.min(index * 0.06, 0.18)}s">
      <div class="blog-image-wrapper">
        <img src="${post.image}" alt="" loading="lazy">
        <span class="blog-index">${String(post.id).padStart(2, "0")}</span>
      </div>
      <div class="blog-content-wrapper">
        <span class="blog-category category-${post.category}">${post.categoryLabel}</span>
        <div class="blog-meta"><span>${post.date}</span><span>${post.readTime}</span></div>
        <h2>${post.title}</h2>
        <p class="blog-excerpt">${post.excerpt}</p>
        <span class="blog-read-link">Read article <span>→</span></span>
      </div>
    </a>
  `).join("");
}

function setupFilters() {
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      currentCategory = button.dataset.category;
      renderBlogPosts();
    });
  });
}

function setupSearch() {
  document.getElementById("searchInput")?.addEventListener("input", (event) => {
    searchQuery = event.target.value.trim();
    renderBlogPosts();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderBlogPosts();
  setupFilters();
  setupSearch();
});
