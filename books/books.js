const books = [
  {
    title: "Earn Before You Graduate",
    price: "NPR 499",
    cover: "../assets/img/book1.jpg",
    link: "ebg.html",
    category: "skills",
    label: "Skills & income",
    description: "A practical starting point for building useful skills and creating income while you are still learning."
  },
  {
    title: "Eat Healthy, Live Better",
    price: "NPR 399",
    cover: "../assets/img/book2.jpg",
    link: "ehb.html",
    category: "health",
    label: "Health",
    description: "Straightforward ideas for making healthier food choices and building a more sustainable daily lifestyle."
  },
  {
    title: "The Hindu Wisdom",
    price: "NPR 449",
    cover: "../assets/img/book3.jpg",
    link: "hw.html",
    category: "wisdom",
    label: "Wisdom",
    description: "An accessible exploration of enduring Hindu ideas and the lessons they can offer modern everyday life."
  },
  {
    title: "The Lie of Modern Life",
    price: "NPR 349",
    cover: "../assets/img/book4.jpg",
    link: "lm.html",
    category: "life",
    label: "Modern life",
    description: "A reflection on distraction, pressure, and the stories modern life encourages us to accept without question."
  }
];

const comingSoon = [
  { title: "The Seven Deadly Sins", status: "Concept in development", cover: "../assets/img/book5.jpg" },
  { title: "One Source", status: "Early writing stage", cover: "../assets/img/book6.jpg" }
];

const grid = document.getElementById("bookGrid");
const search = document.getElementById("bookSearch");
const buttons = [...document.querySelectorAll(".filter-btn")];
const resultCount = document.getElementById("resultCount");
const titleCount = document.getElementById("titleCount");
const emptyState = document.getElementById("emptyState");
let activeFilter = "all";

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function renderBooks(items) {
  grid.innerHTML = items.map(book => `
    <article class="book-card">
      <a href="${book.link}" class="book-cover-link" aria-label="Explore ${escapeHtml(book.title)}">
        <span class="book-category">${book.label}</span>
        <img src="${book.cover}" alt="${escapeHtml(book.title)} book cover" loading="lazy">
      </a>
      <div class="book-content">
        <h3 class="book-title">${escapeHtml(book.title)}</h3>
        <p class="book-description">${escapeHtml(book.description)}</p>
        <div class="book-footer">
          <span class="book-price">${book.price}</span>
          <a href="${book.link}" class="book-link">Explore <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  `).join("");

  resultCount.textContent = items.length;
  emptyState.hidden = items.length !== 0;
}

function applyFilters() {
  const query = search.value.trim().toLowerCase();
  const matches = books.filter(book => {
    const categoryMatch = activeFilter === "all" || book.category === activeFilter;
    const text = [book.title, book.label, book.description].join(" ").toLowerCase();
    return categoryMatch && text.includes(query);
  });
  renderBooks(matches);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    buttons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    applyFilters();
  });
});

search.addEventListener("input", applyFilters);

document.getElementById("comingSoonGrid").innerHTML = comingSoon.map(book => `
  <article class="coming-card">
    <img src="${book.cover}" alt="${escapeHtml(book.title)} concept cover" loading="lazy">
    <div class="coming-copy">
      <span>In development</span>
      <h3>${escapeHtml(book.title)}</h3>
      <p>${book.status}</p>
    </div>
  </article>
`).join("");

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const willOpen = !item.classList.contains("open");

    document.querySelectorAll(".faq-item").forEach(other => {
      other.classList.remove("open");
      other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });

    if (willOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

titleCount.textContent = String(books.length).padStart(2, "0");
renderBooks(books);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".footer-now b")?.remove();
});
