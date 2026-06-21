// ---------- TYPING ANIMATION (larger, smooth) ----------
const phrases = [
  "building the life i'm dreaming about.",
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