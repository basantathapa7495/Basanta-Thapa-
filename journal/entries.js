// Add each published daily file here, in date order. Never add unpublished entries.
const journalEntries = [
 {day:1,date:"2026-09-11",title:"Turning 20 — Today, I begin.",description:"A birthday, changed plans, time with family, and a first step toward a better life.",file:"day-1.html",minutes:7},
 {day:2,date:"2026-09-12",title:"I woke up late — but I kept going.",description:"A messy day with low energy, a new YouTube upload, website fixes, reading, and small progress that still counted.",file:"day-2.html",minutes:6}
];
const archive = document.getElementById("journalEntries");
if (archive) {
 archive.innerHTML = [...journalEntries].reverse().map(e => `<article class="ds-card"><div class="entry-art" aria-hidden="true">${String(e.day).padStart(2,"0")}</div><p class="ds-kicker">Personal journal · Day ${e.day}</p><h2>${e.title}</h2><p>${e.description}</p><p><time datetime="${e.date}">${new Date(e.date+"T12:00:00").toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</time> · ${e.minutes} min read</p><a class="ds-button" href="${e.file}">Read article</a></article>`).join("");
}
const entryNav=document.querySelector(".entry-navigation");
if(entryNav){
 const index=journalEntries.findIndex(e=>e.day===Number(entryNav.dataset.day));
 const previous=journalEntries[index-1],next=journalEntries[index+1];
 entryNav.innerHTML=(previous?`<a href="${previous.file}">← Previous: Day ${previous.day}</a>`:'<span aria-disabled="true">First entry</span>')+'<a href="journal.html">All journal entries</a>'+(next?`<a href="${next.file}">Next: Day ${next.day} →</a>`:'<span aria-disabled="true">Next entry not published yet</span>');
}
