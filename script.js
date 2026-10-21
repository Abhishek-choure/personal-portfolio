
/* =========================================
   1. ANIMATED TYPING EFFECT
========================================= */

const typingText = document.getElementById("typingText");

if (typingText) {
  const roles = [
    "Java Full Stack Developer",
    "Frontend Web Developer",
    "B.Tech CSE Graduate",
    "Aspiring Software Developer"
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = true;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingText.textContent = currentRole.substring(
      0,
      Math.max(0, charIndex)
    );

    let delay = deleting ? 45 : 85;

    if (!deleting && charIndex === currentRole.length) {
      deleting = true;
      delay = 1400;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }

    window.setTimeout(typeEffect, delay);
  }

  window.setTimeout(typeEffect, 1200);
}


/* =========================================
   2. DARK / LIGHT MODE
========================================= */

const themeBtn = document.getElementById("themeBtn");
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark-mode", isDark);

  if (themeBtn) {
    themeBtn.textContent = isDark ? "☀️" : "🌙";

    themeBtn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      isDark ? "#0b1120" : "#f8fafc"
    );
  }

  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch (error) {
    // Theme still works if storage is unavailable.
  }
}

let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("portfolio-theme") || "light";
} catch (error) {
  // Use light theme by default.
}

setTheme(savedTheme);

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    setTheme(isDark ? "light" : "dark");
  });
}


/* =========================================
   3. MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  if (!menuBtn || !navLinks) return;

  navLinks.classList.remove("show-menu");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open navigation");
  menuBtn.textContent = "☰";
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show-menu");

    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", event => {
    if (
      !navLinks.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}


/* =========================================
   4. SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}


/* =========================================
   5. ACTIVE NAVIGATION ON SCROLL
========================================= */

const navItems = document.querySelectorAll("#navLinks a");

const observedSections = document.querySelectorAll(
  "main section[id]"
);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    entries => {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort(
          (a, b) =>
            b.intersectionRatio - a.intersectionRatio
        );

      if (visibleEntries.length === 0) return;

      const currentId = visibleEntries[0].target.id;

      navItems.forEach(link => {
        const isActive =
          link.getAttribute("href") === `#${currentId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-15% 0px -65% 0px",
      threshold: [0, 0.1, 0.25, 0.5]
    }
  );

  observedSections.forEach(section => {
    sectionObserver.observe(section);
  });
}


/* =========================================
   6. CONTACT FORM VALIDATION
========================================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    formStatus.textContent = "";
    formStatus.style.color = "";

    if (name.length < 2) {
      formStatus.textContent =
        "Please enter your name (at least 2 characters).";
      nameInput.focus();
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      formStatus.textContent =
        "Please enter a valid email address.";
      emailInput.focus();
      return;
    }

    if (message.length < 10) {
      formStatus.textContent =
        "Please enter a message with at least 10 characters.";
      messageInput.focus();
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`
    );

    const mailtoLink =
      `mailto:abhishekchoure49@gmail.com` +
      `?subject=${subject}&body=${body}`;

    formStatus.textContent =
      "Your email draft is ready. Please send it from your email app.";

    formStatus.style.color = "#16a34a";

    window.location.href = mailtoLink;
  });
}


/* =========================================
   7. AUTOMATIC FOOTER YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

