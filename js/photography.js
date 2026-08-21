// Load Cloudinary URLs
let backgrounds = [];
let index = 0;

// Fetch the JSON file generated from getAllImageUrls.js
fetch("../photography-urls.json")
  .then(res => res.json())
  .then(urls => {
    backgrounds = urls;
    if (backgrounds.length > 0) {
      setBackground(backgrounds[0]);
    }
  })
  .catch(err => console.error("Failed to load backgrounds:", err));

// Function to set background
function setBackground(url) {
  const bg = document.getElementById("background");
  bg.style.backgroundImage = `url('${url}')`;
}

// Change background on click
document.addEventListener("click", () => {
  if (backgrounds.length === 0) return;
  index = (index + 1) % backgrounds.length;
  setBackground(backgrounds[index]);
});
