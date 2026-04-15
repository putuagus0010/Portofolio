const STORAGE_KEY = "portfolioContentV1";

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
  if (el && value) el.textContent = value;
}

function setContactLink(selector, href, label) {
  const el = document.querySelector(selector);
  if (!el || !label) return;
  const icon = el.querySelector("svg")?.outerHTML || "";
  el.href = href;
  el.innerHTML = `${icon}${escapeHtml(label)}`;
}

function setMultiLine(selector, value) {
  const el = document.querySelector(selector);
  if (!el || !value) return;
  const parts = String(value).split("\n").map((line) => line.trim()).filter(Boolean);
  if (parts.length) el.innerHTML = parts.map((part) => `<span>${part}</span>`).join("");
}

function setList(selector, value) {
  const el = document.querySelector(selector);
  if (!el || !value) return;
  const items = String(value).split("\n").map((line) => line.trim()).filter(Boolean);
  if (items.length) el.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function applyPortfolio(data) {
  setText(".brand-text small", data.brandSubtitle);
  setText(".eyebrow", data.heroEyebrow);
  setText(".hero h1 span", data.name);
  setText(".hero-lead", data.heroLead);
  setText(".metrics article:nth-child(1) strong", data.metric1?.split("\n")[0]);
  setText(".metrics article:nth-child(1) span", data.metric1?.split("\n")[1]);
  setText(".metrics article:nth-child(2) strong", data.metric2?.split("\n")[0]);
  setText(".metrics article:nth-child(2) span", data.metric2?.split("\n")[1]);
  setText(".metrics article:nth-child(3) strong", data.metric3?.split("\n")[0]);
  setText(".metrics article:nth-child(3) span", data.metric3?.split("\n")[1]);
  setText(".profile-badge", "Open for opportunities");
  setText(".hero-card-content h2", data.name);
  setText(".hero-card-content > p", data.role);
  setText(".fact-list div:nth-child(1) dd", "Depok, Jawa Barat, Indonesia");
  setText(".fact-list div:nth-child(2) dd", "Bahasa Indonesia | English");
  setText(".fact-list div:nth-child(3) dd", "Manual Testing | Automation Testing | IT Support");

  const about = document.querySelectorAll("#tentang .about-card p");
  if (about[0] && data.about1) about[0].textContent = data.about1;
  if (about[1] && data.about2) about[1].textContent = data.about2;

  const timelineCards = document.querySelectorAll("#pengalaman .timeline-card");
  if (timelineCards[0]) {
    setText("#pengalaman .timeline-card:nth-child(1) .timeline-meta span:last-child", data.exp1Company);
    setText("#pengalaman .timeline-card:nth-child(1) h3", data.exp1Role);
    setText("#pengalaman .timeline-card:nth-child(1) .period", data.exp1Period);
    const list = timelineCards[0].querySelector("ul");
    if (list) {
      const items = String(data.exp1Bullets || "").split("\n").map((line) => line.trim()).filter(Boolean);
      list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    }
    setText("#pengalaman .timeline-card:nth-child(1) .chip.hot", data.exp1Status);
  }
  if (timelineCards[1]) {
    setText("#pengalaman .timeline-card:nth-child(2) .timeline-meta span:last-child", data.exp2Company);
    setText("#pengalaman .timeline-card:nth-child(2) h3", data.exp2Role);
    setText("#pengalaman .timeline-card:nth-child(2) .period", data.exp2Period);
    const list = timelineCards[1].querySelector("ul");
    if (list) {
      const items = String(data.exp2Bullets || "").split("\n").map((line) => line.trim()).filter(Boolean);
      list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    }
    setText("#pengalaman .timeline-card:nth-child(2) .chip", data.exp2Status);
  }

  const skillsCards = document.querySelectorAll("#keahlian .skill-card .chips");
  if (skillsCards[0]) setMultiLine("#keahlian .skill-card:nth-child(1) .chips", data.skillsTop);
  if (skillsCards[1]) setMultiLine("#keahlian .skill-card:nth-child(2) .chips", data.skillsTools);
  if (skillsCards[2]) setMultiLine("#keahlian .skill-card:nth-child(3) .chips", data.skillsSupport);

  const certCards = document.querySelectorAll("#sertifikasi .cert-card");
  const certPairs = [
    [data.cert1Title, data.cert1Note],
    [data.cert2Title, data.cert2Note],
    [data.cert3Title, data.cert3Note],
    [data.cert4Title, data.cert4Note],
    [data.cert5Title, data.cert5Note],
  ];
  certCards.forEach((card, index) => {
    const pair = certPairs[index];
    if (!pair) return;
    const title = card.querySelector("h3");
    const note = card.querySelector("p");
    if (title) title.textContent = pair[0];
    if (note) note.textContent = pair[1];
  });

  const focusCards = document.querySelectorAll("#fokus .project-card");
  const focusPairs = [
    [data.focus1Title, data.focus1Text],
    [data.focus2Title, data.focus2Text],
    [data.focus3Title, data.focus3Text],
    [data.focus4Title, data.focus4Text],
  ];
  focusCards.forEach((card, index) => {
    const pair = focusPairs[index];
    if (!pair) return;
    const title = card.querySelector("h3");
    const text = card.querySelector("p");
    if (title) title.textContent = pair[0];
    if (text) text.textContent = pair[1];
  });

  setContactLink("#kontak a[href^='mailto:']", `mailto:${data.email}`, data.email);
  setContactLink("#kontak a[href^='tel:']", `tel:${String(data.phone).replace(/[^\d+]/g, "")}`, data.phone);
  const linkedinLabel = String(data.linkedin).replace(/^https?:\/\//, "");
  setContactLink("#kontak a[href*='linkedin.com']", data.linkedin, linkedinLabel);

  const highlight = document.querySelector("#kontak .contact-card.glow p");
  if (highlight && data.contactHighlight) highlight.textContent = data.contactHighlight;
}

const stored = getStoredPortfolio();
if (stored) {
  applyPortfolio(stored);
}
