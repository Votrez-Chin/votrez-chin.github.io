document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  if (!("IntersectionObserver" in window)) {
    faders.forEach(fader => fader.classList.add("show"));
    return;
  }

  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  faders.forEach(fader => {
    observer.observe(fader);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeBtn');

  if (!menuBtn || !overlay || !closeBtn) return;

  menuBtn.addEventListener('click', () => {
    overlay.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  });
});