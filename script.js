// ---------- TYPING ANIMATION (larger, smooth) ----------
const phrases = [
  "building the life i’m dreaming about.",
 "Trying to finish my book.",
 "Thinking about consciousness.",
 "Building quietly."
];
let pIdx = 0, cIdx = 0, del = false, currText = "";
const typingSpan = document.getElementById("typingLine");
function typeLoop() {
  if (!typingSpan) return;
  const full = phrases[pIdx];
  if (!del) currText = full.substring(0, cIdx + 1), cIdx++;
  else currText = full.substring(0, cIdx - 1), cIdx--;
  typingSpan.innerHTML = `<span style="background: linear-gradient(125deg, #c97e5a, #4f8b8c); -webkit-background-clip:text; background-clip:text; color:transparent; font-weight: 500;">${currText}</span><span style="color:#d8a25c;"> ▊</span>`;
  if (!del && cIdx === full.length) { del = true; setTimeout(typeLoop, 1800); return; }
  if (del && cIdx === 0) { del = false; pIdx = (pIdx+1)%phrases.length; setTimeout(typeLoop, 320); return; }
  setTimeout(typeLoop, del ? 45 : 70);
}
setTimeout(typeLoop, 180);

// ---------- READING TRACKER (balanced, data intact) ----------
const books = [
  { title: "Meditations", author: "Aurelius", progress: 88, colorClass: "fill-green", pages: 180 },
  { title: "Sapiens", author: "Harari", progress: 72, colorClass: "fill-blue", pages: 443 },
  { title: "Atomic Habits", author: "Clear", progress: 100, colorClass: "fill-orange", pages: 319 },
  { title: "The Power of Now", author: "Tolle", progress: 60, colorClass: "fill-pink", pages: 236 }
];
function renderReading() {
  const container = document.getElementById("readingListDynamic");
  if (!container) return;
  container.innerHTML = "";
  books.forEach(book => {
    const div = document.createElement("div");
    div.className = "progress-item";
    div.innerHTML = `
      <div class="progress-label mono">${book.title}</div>
      <div class="progress-bar-bg"><div class="progress-fill ${book.colorClass}" style="width: ${book.progress}%;"></div></div>
      <span class="mono" style="font-size:0.75rem; font-weight:500;">${book.progress}%</span>
    `;
    container.appendChild(div);
  });
  const avg = books.reduce((a,b)=>a+b.progress,0)/books.length;
  const totalPages = books.reduce((a,b)=>a+b.pages,0);
  const readPages = books.reduce((a,b)=> a + Math.floor((b.progress/100)*b.pages),0);
  const footerStats = document.getElementById("readingFooterStats");
  if(footerStats) footerStats.innerHTML = `<span>📊 avg completion: ${Math.round(avg)}%</span><span>📖 ${readPages} / ${totalPages} pages</span>`;
}
renderReading();

// ---------- MUSIC TOGGLE (keeping external file) ----------
let audioElement = null;
let isMusicOn = false;
const musicBtn = document.getElementById("musicBtn");

function initAudio() {
  audioElement = new Audio("music.mp3");
  audioElement.loop = true;
  audioElement.volume = 0.25;
}

if(musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (!audioElement) initAudio();
    if (!isMusicOn) {
      audioElement.play().catch(e => console.log("autoplay blocked"));
      musicBtn.innerHTML = "🔇 mute";
      musicBtn.style.borderColor = "#d8a25c";
      isMusicOn = true;
    } else {
      audioElement.pause();
      musicBtn.innerHTML = "🎧 vibe";
      musicBtn.style.borderColor = "";
      isMusicOn = false;
    }
  });
}


// ---------- NEWSLETTER ----------
const subBtn = document.getElementById("subscribeNewsBtn");
const emailInput = document.getElementById("newsletterEmail");
const msgDiv = document.getElementById("subMsg");
subBtn?.addEventListener("click", () => {
  const email = emailInput?.value.trim() || "";
  if (!email || !email.includes("@")) {
    if(msgDiv) msgDiv.innerText = "✨ please enter a valid email.";
  } else { 
    if(msgDiv) msgDiv.innerHTML = `🎉 yay, ${email.split('@')[0]} — you're on the colorful list.`;
    if(emailInput) emailInput.value = "";
    setTimeout(() => { if(msgDiv) msgDiv.innerHTML = ""; }, 3000);
  }
});

// ---------- MOBILE HAMBURGER ----------
const hamburger = document.getElementById("hamburgerBtn");
const navLinks = document.querySelector(".nav-links");
hamburger?.addEventListener("click", () => {
  navLinks?.classList.toggle("show");
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("show");
  });
});



// new 
// Homepage blog preview – sample posts (replace with your real ones)
const homepagePosts = [
  {
    date: "May 18, 2026",
    title: "Meditation and the myth of productivity",
    excerpt: "Why sitting still might be the most counter‑cultural thing you can do in a world obsessed with output.",
    link: "blog-post1.html"  // replace with real URL
  },
  {
    date: "May 11, 2026",
    title: "Why I'm building in public (even when it's messy)",
    excerpt: "Sharing unfinished work is terrifying. But it’s also the fastest way to grow, connect, and ship.",
    link: "blog-post2.html"
  },
  {
    date: "May 4, 2026",
    title: "Reading 45 books a year: my system",
    excerpt: "No speed reading. No skimming. Just a simple habit stack and a love for slow, deliberate reading.",
    link: "blog-post3.html"
  }
];

function renderHomepageBlog() {
  const grid = document.getElementById('homepageBlogGrid');
  if (!grid) return;
  grid.innerHTML = homepagePosts.map(post => `
    <article class="blog-card">
      <div class="blog-date">${post.date}</div>
      <h3 class="blog-title"><a href="${post.link}">${post.title}</a></h3>
      <p class="blog-excerpt">${post.excerpt}</p>
      <a href="${post.link}" class="read-more">continue reading →</a>
    </article>
  `).join('');
}

// Call it when DOM loads
if (document.getElementById('homepageBlogGrid')) {
  renderHomepageBlog();
}


// new 

// Homepage projects preview data
const homepageProjects = [
  {
    icon: "📖",
    title: "PageTurn",
    description: "Ebook reader + highlights, reading streaks. React + Firebase. Beta testing.",
    status: "beta · active",
    link: "projects.html#pageturn"
  },
  {
    icon: "🧠",
    title: "MindStack",
    description: "Second brain for readers & thinkers. Publicly built, open source.",
    status: "in development",
    link: "projects.html#mindstack"
  },
  {
    icon: "🌐",
    title: "One Source (book)",
    description: "Exploring unity behind world religions. Manuscript in progress.",
    status: "writing · 60%",
    link: "projects.html#onesource"
  },
  {
    icon: "🎧",
    title: "Nepali Vibe Radio",
    description: "Curated lo-fi + ambient playlist inspired by Kathmandu streets.",
    status: "curating",
    link: "projects.html#nepalivibe"
  }
];

function renderHomepageProjects() {
  const grid = document.getElementById('homepageProjectsGrid');
  if (!grid) return;
  grid.innerHTML = homepageProjects.map(project => `
    <div class="project-card">
      <div class="project-icon">${project.icon}</div>
      <h3 class="project-title"><a href="${project.link}">${project.title}</a></h3>
      <p class="project-description">${project.description}</p>
      <span class="project-status">${project.status}</span>
    </div>
  `).join('');
}

// Call it when DOM is ready
if (document.getElementById('homepageProjectsGrid')) {
  renderHomepageProjects();
}