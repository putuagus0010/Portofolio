const yearEl = document.getElementById("year");
const reveals = document.querySelectorAll(".reveal");

yearEl.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

reveals.forEach((section) => observer.observe(section));

const hero = document.querySelector(".hero");

if (hero) {
  hero.style.setProperty("--mx", "35%");
  hero.style.setProperty("--my", "25%");

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--mx", `${x}%`);
    hero.style.setProperty("--my", `${y}%`);
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--mx", "35%");
    hero.style.setProperty("--my", "25%");
  });
}
