const STORAGE_KEY = "portfolioContentV1";
const DEFAULT_PHOTO = "assets/profile-placeholder.svg";

function getStoredPortfolio() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el && value) {
    el.textContent = value;
  }
}

function setContactLink(selector, href, label, fallbackLabel) {
  const el = document.querySelector(selector);
  if (!el) return;

  const icon = el.querySelector("svg")?.outerHTML || "";
  if (href) {
    el.href = href;
  }
  el.innerHTML = `${icon}${escapeHtml(label || fallbackLabel || "")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setBullets(selector, value) {
  const el = document.querySelector(selector);
  if (!el || !value) return;

  const items = String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!items.length) return;
  el.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function setPhoto(photo) {
  const img = document.getElementById("heroPhoto");
  if (!img) return;
  img.src = photo || DEFAULT_PHOTO;
}

function applyPortfolio(data) {
  window.portfolioData = data;
  setText(".brand-text small", data.brandSubtitle);
  setText(".hero h1", data.name);
  setText("#heroRole", data.role);
  setText(".hero-lead", data.heroLead);
  setText(".typing-prefix + .typing-text", data.heroTagline || "");

  setPhoto(data.profilePhoto);

  const aboutCards = document.querySelectorAll("#about .about-card p");
  if (aboutCards[0] && data.about1) aboutCards[0].textContent = data.about1;
  if (aboutCards[1] && data.about2) aboutCards[1].textContent = data.about2;
  if (aboutCards[2] && data.about3) aboutCards[2].textContent = data.about3;

  const timelineCards = document.querySelectorAll("#experience .timeline-card");
  if (timelineCards[0]) {
    setText("#experience .timeline-card:nth-child(1) .timeline-meta span:last-child", data.exp1Company);
    setText("#experience .timeline-card:nth-child(1) h3", data.exp1Role);
    setText("#experience .timeline-card:nth-child(1) .period", data.exp1Period);
    setBullets("#experience .timeline-card:nth-child(1) ul", data.exp1Bullets);
  }
  if (timelineCards[1]) {
    setText("#experience .timeline-card:nth-child(2) .timeline-meta span:last-child", data.exp2Company);
    setText("#experience .timeline-card:nth-child(2) h3", data.exp2Role);
    setText("#experience .timeline-card:nth-child(2) .period", data.exp2Period);
    setBullets("#experience .timeline-card:nth-child(2) ul", data.exp2Bullets);
  }

  setContactLink(
    "#contact a[href^='mailto:']",
    `mailto:${data.email}`,
    data.email,
    "putuagus0010@gmail.com"
  );
  setContactLink(
    "#contact a[href*='linkedin.com']",
    data.linkedin,
    String(data.linkedin || "").replace(/^https?:\/\//, ""),
    "linkedin.com/in/agusadi"
  );

  const githubLink = document.getElementById("githubLink");
  if (githubLink) {
    const icon = githubLink.querySelector("svg")?.outerHTML || "";
    const github = data.github || "";
    if (github) {
      githubLink.href = github;
      githubLink.innerHTML = `${icon}${escapeHtml(github.replace(/^https?:\/\//, ""))}`;
    } else {
      githubLink.href = "#";
      githubLink.innerHTML = `${icon}GitHub - add in dashboard`;
    }
  }

  const note = document.querySelector("#contact .contact-note");
  if (note && data.contactHighlight) {
    note.textContent = data.contactHighlight;
  }
}

const stored = getStoredPortfolio();
if (stored) {
  applyPortfolio(stored);
}
