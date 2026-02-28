// Mobile menu
const burgerBtn = document.getElementById("burgerBtn");
const mobileNav = document.getElementById("mobileNav");

if (burgerBtn && mobileNav) {
  burgerBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
  });

  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobileNav.classList.remove("show"));
  });
}

// Scroll reveal (IntersectionObserver)
const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((el) => io.observe(el));
}

// Accordion (smooth height animation)
const acc = document.getElementById("accordion");
if (acc) {
  const items = Array.from(acc.querySelectorAll(".acc-item"));

  const closeItem = (item) => {
    const panel = item.querySelector(".acc-panel");
    item.classList.remove("active");
    panel.style.height = panel.scrollHeight + "px";
    // force reflow
    panel.offsetHeight;
    panel.style.height = "0px";
  };

  const openItem = (item) => {
    const panel = item.querySelector(".acc-panel");
    item.classList.add("active");
    panel.style.height = panel.scrollHeight + "px";
    panel.addEventListener(
      "transitionend",
      () => {
        // allow content changes after open
        if (item.classList.contains("active")) {
          panel.style.height = "auto";
        }
      },
      { once: true }
    );
  };

  items.forEach((item) => {
    const btn = item.querySelector(".acc-btn");
    const panel = item.querySelector(".acc-panel");
    // init
    panel.style.height = "0px";

    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // минимализм: можно оставить множественное открытие,
      // но чаще выглядит чище "только один открыт"
      items.forEach((it) => {
        if (it !== item && it.classList.contains("active")) closeItem(it);
      });

      if (isActive) closeItem(item);
      else openItem(item);
    });
  });
}

// Custom Select (dropdown)
const selects = document.querySelectorAll(".select");

const closeAllSelects = () => {
  selects.forEach((s) => {
    s.classList.remove("is-open");
    const btn = s.querySelector(".select__btn");
    if (btn) btn.setAttribute("aria-expanded", "false");
  });
};

selects.forEach((select) => {
  const btn = select.querySelector(".select__btn");
  const valueEl = select.querySelector(".select__value");
  const hidden = select.querySelector('input[type="hidden"]');
  const options = select.querySelectorAll(".select__option");

  if (!btn || !valueEl || !hidden) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = select.classList.contains("is-open");
    closeAllSelects();
    if (!isOpen) {
      select.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });

  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      options.forEach((o) => o.classList.remove("is-active"));
      opt.classList.add("is-active");

      valueEl.textContent = opt.textContent.trim();
      hidden.value = opt.dataset.value || opt.textContent.trim();

      select.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
});

// close on outside click / esc
document.addEventListener("click", () => closeAllSelects());
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllSelects();
});