document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

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
