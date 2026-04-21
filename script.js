const yearEl = document.getElementById("year");
const cursorGlow = document.getElementById("cursorGlow");
const particles = document.getElementById("particles");
const themeToggle = document.getElementById("themeToggle");
const themeLabel = themeToggle?.querySelector(".theme-label");
const typingEl = document.getElementById("typingTagline");
const projectModal = document.getElementById("projectModal");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalDescription = document.getElementById("projectModalDescription");
const projectModalTools = document.getElementById("projectModalTools");
const contactForm = document.getElementById("contactForm");
const heroPhoto = document.getElementById("heroPhoto");

const STORAGE_THEME_KEY = "portfolioTheme";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

yearEl.textContent = new Date().getFullYear();

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_THEME_KEY, theme);
  if (themeLabel) {
    themeLabel.textContent = theme === "light" ? "Light" : "Dark";
  }
}

const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
if (savedTheme === "light" || savedTheme === "dark") {
  setTheme(savedTheme);
} else {
  setTheme(document.documentElement.dataset.theme || "dark");
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

function createParticles(count = 18) {
  if (!particles) return;
  particles.innerHTML = "";

  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("span");
    dot.className = "particle";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${100 + Math.random() * 40}%`;
    dot.style.width = `${2 + Math.random() * 4}px`;
    dot.style.height = dot.style.width;
    dot.style.opacity = `${0.22 + Math.random() * 0.45}`;
    dot.style.animationDuration = `${10 + Math.random() * 14}s`;
    dot.style.animationDelay = `${Math.random() * 12}s`;
    particles.appendChild(dot);
  }
}

if (!reduceMotion) {
  createParticles();
}

if (cursorGlow && !reduceMotion) {
  let rafId = null;
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 3;
  let currentX = targetX;
  let currentY = targetY;

  const animate = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    cursorGlow.style.transform = `translate3d(${currentX - 130}px, ${currentY - 130}px, 0)`;
    rafId = requestAnimationFrame(animate);
  };

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cursorGlow.style.opacity = "0.92";
    if (!rafId) {
      rafId = requestAnimationFrame(animate);
    }
  });

  window.addEventListener("pointerleave", () => {
    cursorGlow.style.opacity = "0";
  });
}

const sections = document.querySelectorAll(".reveal");
const skillMeteors = document.querySelectorAll(".meter-fill");

function revealSkills() {
  skillMeteors.forEach((fill) => {
    const level = fill.dataset.level || "0";
    fill.style.width = `${level}%`;
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.id === "skills") {
          revealSkills();
        }
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

sections.forEach((section) => observer.observe(section));

function typeTagline(element, phrases) {
  if (!element || reduceMotion) {
    if (element) element.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = phrases[phraseIndex];
    element.textContent = current.slice(0, charIndex);

    if (!deleting) {
      charIndex += 1;
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(tick, 1300);
        return;
      }
    } else {
      charIndex -= 1;
      if (charIndex < 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        charIndex = 0;
      }
    }

    setTimeout(tick, deleting ? 32 : 52);
  };

  tick();
}

typeTagline(typingEl, [
  window.portfolioData?.heroTagline ||
    "Passionate about ensuring software quality through testing and continuous improvement.",
  "Manual testing, UAT, and user support with a calm, quality-first mindset.",
  "Building toward automation with precision, structure, and clean execution.",
]);

const projectButtons = document.querySelectorAll(".project-btn");

function openModal({ title, description, tools }) {
  if (!projectModal) return;

  projectModalTitle.textContent = title;
  projectModalDescription.textContent = description;
  projectModalTools.innerHTML = tools
    .split(",")
    .map((tool) => `<span>${tool.trim()}</span>`)
    .join("");

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!projectModal) return;
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal({
      title: button.dataset.title || "Project",
      description: button.dataset.description || "",
      tools: button.dataset.tools || "",
    });
  });
});

projectModal?.addEventListener("click", (event) => {
  const closeTarget = event.target.closest("[data-close-modal]");
  if (closeTarget) closeModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const subject = encodeURIComponent(`Portfolio inquiry from ${name || "Visitor"}`);
  const body = encodeURIComponent(`${message}\n\nReply to: ${email || "your email here"}`);
  window.location.href = `mailto:putuagus0010@gmail.com?subject=${subject}&body=${body}`;
});

if (heroPhoto && !reduceMotion) {
  heroPhoto.addEventListener("pointerenter", () => {
    heroPhoto.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.1), 0 28px 60px rgba(0,0,0,0.34), 0 0 36px rgba(78,243,255,0.22)";
  });

  heroPhoto.addEventListener("pointerleave", () => {
    heroPhoto.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.08), 0 24px 50px rgba(0,0,0,0.28)";
  });
}
