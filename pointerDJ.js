// pointerDJ.js

// Array of audio file paths corresponding to each region (3x3 grid = 9 regions)
const songs = [
  "audio/song1.mp3",
  "audio/song2.mp3",
  "audio/song3.mp3",
  "audio/song4.mp3",
  "audio/song5.mp3",
  "audio/song6.mp3",
  "audio/song7.mp3",
  "audio/song8.mp3",
  "audio/song9.mp3"
];

// Create a single audio element to play songs
let audio = new Audio();
audio.loop = true;

// Track screen width and height
let width = window.innerWidth;
let height = window.innerHeight;

// Function to determine which region the pointer is in
function getRegion(x, y) {
  const col = Math.floor((x / width) * 3); // 0,1,2
  const row = Math.floor((y / height) * 3); // 0,1,2
  return row * 3 + col; // region index 0-8
}

// Track last region to avoid restarting same song
let lastRegion = -1;

// Mouse movement listener
document.addEventListener("mousemove", (e) => {
  const region = getRegion(e.clientX, e.clientY);
  
  if (region !== lastRegion) {
    lastRegion = region;
    audio.src = songs[region];
    audio.play().catch(err => {
      console.log("Audio play prevented:", err);
    });
  }
});

// Update width and height on window resize
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
});

