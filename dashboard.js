const STORAGE_KEY = "portfolioContentV1";

const DEFAULT_DATA = {
  name: "I Putu Agus Adi Artha Saputra",
  role: "Software Quality Assurance",
  brandSubtitle: "SQA | IT Support | Testing",
  heroEyebrow: "Software Quality Assurance | Manual & Automation Testing | IT Support",
  heroLead:
    "Saya adalah Software Quality Assurance dengan pengalaman profesional di PT Infotech Solution. Fokus saya ada pada manual dan automation testing, user support, troubleshooting, dokumentasi aplikasi, dan peningkatan product reliability serta user experience.",
  metric1: "1+ Tahun\nPengalaman QA dan IT Support",
  metric2: "3.45\nGPA Universitas Gunadarma",
  metric3: "5+\nSertifikasi utama",
  about1:
    "Saya memiliki pengalaman profesional di PT Infotech Solution sebagai Software Quality Assurance dan IT Support. Dalam pekerjaan sehari-hari, saya fokus pada manual testing, automation testing, analisis issue, dukungan pengguna, serta memastikan aplikasi tetap stabil setelah rilis.",
  about2:
    "Saya juga terbiasa menyusun dokumentasi, menyiapkan skenario UAT, berkoordinasi dengan vendor, menggunakan JIRA, JMeter, SQL, Figma, Visual Studio, HTML/CSS, dan Selenium untuk mendukung kualitas produk.",
  exp1Role: "Quality Assurance and Support IT",
  exp1Company: "PT Infotech Solution | IndiHome by Telkomsel",
  exp1Period: "Oktober 2024 - Present",
  exp1Status: "Present",
  exp1Bullets: [
    "Created user documentation and troubleshooting guides.",
    "Designed and executed UAT scenarios.",
    "Developed test cases for positive and negative scenarios.",
    "Provided user training and quick support.",
    "Analyzed and resolved user-reported issues.",
  ].join("\n"),
  exp2Role: "IT Application Support",
  exp2Company: "PT Infotech Solution | Nusantara TV",
  exp2Period: "Februari 2024 - Present",
  exp2Status: "Active",
  exp2Bullets: [
    "Trained users on ClassX application usage.",
    "Provided user support and guidance.",
    "Analyzed and resolved reported issues.",
    "Supported feature development and customization.",
    "Helped improve system performance and user satisfaction.",
  ].join("\n"),
  skillsTop: ["Product Research", "UI/UX Quality Assurance", "Toad", "Manual Testing", "Automation Testing", "UAT"].join("\n"),
  skillsTools: ["JIRA", "JMeter", "SQL", "Figma", "Visual Studio", "HTML / CSS", "Selenium", "Microsoft 365"].join("\n"),
  skillsSupport: ["Agile", "SDLC", "ITSM", "Documentation", "Troubleshooting", "User Training", "Hardware & Software Support", "Continuous Improvement"].join("\n"),
  cert1Title: "Information Technology Service Management",
  cert1Note: "Certificate of Competence (BNSP)",
  cert2Title: "ISO 9001 Quality Management System",
  cert2Note: "Quality management system certification",
  cert3Title: "SQL Server for Intermediate",
  cert3Note: "Certification from the profile document",
  cert4Title: "Oracle for Beginner",
  cert4Note: "Certification from the profile document",
  cert5Title: "Building Website using HTML 5",
  cert5Note: "Web fundamentals certification",
  focus1Title: "User Guides",
  focus1Text: "Saya membuat user documentation dan troubleshooting guide agar pengguna lebih mandiri.",
  focus2Title: "UAT and Test Cases",
  focus2Text: "Saya merancang skenario UAT dan test case positif maupun negatif untuk menjaga kualitas fitur.",
  focus3Title: "User Training",
  focus3Text: "Saya memberi pelatihan singkat dan support cepat untuk membantu adopsi aplikasi.",
  focus4Title: "Issue Resolution",
  focus4Text: "Saya menganalisis issue yang dilaporkan pengguna dan membantu meningkatkan performa sistem.",
  email: "putuagus0010@gmail.com",
  phone: "+62 813-8616-9910",
  linkedin: "https://www.linkedin.com/in/agusadi",
  contactHighlight:
    "QA manual testing, automation testing, product research, UI/UX QA, documentation, troubleshooting, dan koordinasi lintas tim.",
};

const form = document.getElementById("editorForm");
const previewRoot = document.getElementById("previewRoot");
const statusEl = document.getElementById("status");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");
const importInput = document.getElementById("importInput");

const fields = Array.from(form.elements).filter((el) => el.name);

function readStoredData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    return { ...structuredClone(DEFAULT_DATA), ...JSON.parse(raw) };
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

function setStatus(message) {
  statusEl.textContent = message;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function splitLines(value) {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function linesToTags(value) {
  return splitLines(value)
    .map((line) => `<span class="tag">${escapeHtml(line)}</span>`)
    .join("");
}

function bulletsHtml(value) {
  const items = splitLines(value);
  if (!items.length) return "<p class='muted'>No items yet.</p>";
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function populateForm(data) {
  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(data, field.name)) {
      field.value = data[field.name];
    }
  }
}

function collectForm() {
  const data = structuredClone(DEFAULT_DATA);
  for (const field of fields) {
    data[field.name] = field.value;
  }
  return data;
}

function renderPreview(data) {
  const metrics = splitLines(data.metric1).length > 1
    ? [data.metric1, data.metric2, data.metric3]
    : [data.metric1, data.metric2, data.metric3];

  const [m1Title, ...m1Desc] = String(metrics[0]).split("\n");
  const [m2Title, ...m2Desc] = String(metrics[1]).split("\n");
  const [m3Title, ...m3Desc] = String(metrics[2]).split("\n");

  previewRoot.innerHTML = `
    <section class="preview-hero">
      <h3>${escapeHtml(data.name)}</h3>
      <p>${escapeHtml(data.role)}</p>
      <p>${escapeHtml(data.heroEyebrow)}</p>
      <p>${escapeHtml(data.heroLead)}</p>
      <div class="preview-metrics">
        <div><strong>${escapeHtml(m1Title)}</strong><div>${escapeHtml(m1Desc.join(" "))}</div></div>
        <div><strong>${escapeHtml(m2Title)}</strong><div>${escapeHtml(m2Desc.join(" "))}</div></div>
        <div><strong>${escapeHtml(m3Title)}</strong><div>${escapeHtml(m3Desc.join(" "))}</div></div>
      </div>
    </section>

    <section class="preview-section">
      <h4>About</h4>
      <div class="preview-grid">
        <p>${escapeHtml(data.about1)}</p>
        <p>${escapeHtml(data.about2)}</p>
      </div>
    </section>

    <section class="preview-section">
      <h4>Experience</h4>
      <div class="preview-grid">
        <div class="preview-card">
          <strong>${escapeHtml(data.exp1Role)}</strong>
          <p>${escapeHtml(data.exp1Company)}</p>
          <p>${escapeHtml(data.exp1Period)} | ${escapeHtml(data.exp1Status)}</p>
          ${bulletsHtml(data.exp1Bullets)}
        </div>
        <div class="preview-card">
          <strong>${escapeHtml(data.exp2Role)}</strong>
          <p>${escapeHtml(data.exp2Company)}</p>
          <p>${escapeHtml(data.exp2Period)} | ${escapeHtml(data.exp2Status)}</p>
          ${bulletsHtml(data.exp2Bullets)}
        </div>
      </div>
    </section>

    <section class="preview-section">
      <h4>Skills</h4>
      <div class="preview-grid">
        <div>
          <div class="preview-tags">${linesToTags(data.skillsTop)}</div>
        </div>
        <div>
          <div class="preview-tags">${linesToTags(data.skillsTools)}</div>
        </div>
        <div>
          <div class="preview-tags">${linesToTags(data.skillsSupport)}</div>
        </div>
      </div>
    </section>

    <section class="preview-section">
      <h4>Certifications</h4>
      <div class="preview-grid">
        <p><strong>${escapeHtml(data.cert1Title)}</strong><br>${escapeHtml(data.cert1Note)}</p>
        <p><strong>${escapeHtml(data.cert2Title)}</strong><br>${escapeHtml(data.cert2Note)}</p>
        <p><strong>${escapeHtml(data.cert3Title)}</strong><br>${escapeHtml(data.cert3Note)}</p>
        <p><strong>${escapeHtml(data.cert4Title)}</strong><br>${escapeHtml(data.cert4Note)}</p>
        <p><strong>${escapeHtml(data.cert5Title)}</strong><br>${escapeHtml(data.cert5Note)}</p>
      </div>
    </section>

    <section class="preview-section">
      <h4>Focus Work</h4>
      <div class="preview-grid">
        <p><strong>${escapeHtml(data.focus1Title)}</strong><br>${escapeHtml(data.focus1Text)}</p>
        <p><strong>${escapeHtml(data.focus2Title)}</strong><br>${escapeHtml(data.focus2Text)}</p>
        <p><strong>${escapeHtml(data.focus3Title)}</strong><br>${escapeHtml(data.focus3Text)}</p>
        <p><strong>${escapeHtml(data.focus4Title)}</strong><br>${escapeHtml(data.focus4Text)}</p>
      </div>
    </section>

    <section class="preview-section">
      <h4>Contact</h4>
      <p>${escapeHtml(data.email)}<br>${escapeHtml(data.phone)}<br>${escapeHtml(data.linkedin)}</p>
      <p>${escapeHtml(data.contactHighlight)}</p>
    </section>
  `;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  setStatus("Saved to localStorage.");
}

function sync() {
  const data = collectForm();
  renderPreview(data);
  saveData(data);
}

const initial = readStoredData();
populateForm(initial);
renderPreview(initial);
setStatus("Loaded dashboard data.");

fields.forEach((field) => {
  field.addEventListener("input", () => {
    const data = collectForm();
    renderPreview(data);
    setStatus("Preview updated.");
  });
});

saveBtn.addEventListener("click", () => {
  sync();
});

resetBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  populateForm(DEFAULT_DATA);
  renderPreview(DEFAULT_DATA);
  setStatus("Reset to defaults.");
});

exportBtn.addEventListener("click", () => {
  const data = collectForm();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "portfolio-content.json";
  a.click();
  URL.revokeObjectURL(url);
  setStatus("Exported JSON.");
});

importInput.addEventListener("change", async () => {
  const file = importInput.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const merged = { ...structuredClone(DEFAULT_DATA), ...parsed };
    populateForm(merged);
    renderPreview(merged);
    saveData(merged);
    setStatus("Imported JSON successfully.");
  } catch (error) {
    console.error(error);
    setStatus("Import failed. Please check the JSON file.");
  } finally {
    importInput.value = "";
  }
});
