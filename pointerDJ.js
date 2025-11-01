let currentSong = null;
let fadeInterval = null;

// 🎵 List your songs here (add as many as you like)
const songList = [
  "song1",
  "song2",
  "song3",
  "song4",
  "song5" // Add as many as you like
];

// 🟩 Grid dimensions
const totalCells = Math.ceil(Math.sqrt(songList.length)) ** 2; // full square grid
const gridSize = Math.sqrt(totalCells); // rows & columns

// Create visual grid overlay
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.pointerEvents = "none"; // let mouse go through
overlay.style.zIndex = "999";
document.body.appendChild(overlay);

// Draw the grid
for (let r = 0; r < gridSize; r++) {
  for (let c = 0; c < gridSize; c++) {
    const cell = document.createElement("div");
    cell.style.position = "absolute";
    cell.style.border = "1px solid rgba(0,0,0,0.1)";
    cell.style.width = `${100 / gridSize}%`;
    cell.style.height = `${100 / gridSize}%`;
    cell.style.left = `${(c * 100) / gridSize}%`;
    cell.style.top = `${(r * 100) / gridSize}%`;
    overlay.appendChild(cell);
  }
}

// Mouse movement handler
document.addEventListener("mousemove", (event) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = event.clientX;
  const y = event.clientY;

  const col = Math.floor((x / width) * gridSize);
  const row = Math.floor((y / height) * gridSize);
  const index = row * gridSize + col;

  // Only play a song if there’s one assigned to this cell
  if (index < songList.length) {
    playSongWithFade(songList[index]);
  } else {
    stopCurrentSong();
  }
});

function playSongWithFade(songId) {
  const newSong = document.getElementById(songId);
  if (!newSong || newSong === currentSong) return;

  if (currentSong) fadeOut(currentSong);

  newSong.volume = 0;
  newSong.currentTime = 0;
  newSong.play();
  fadeIn(newSong);

  currentSong = newSong;
}

function stopCurrentSong() {
  if (currentSong) fadeOut(currentSong);
  currentSong = null;
}

function fadeIn(audio) {
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (audio.volume < 1.0) {
      audio.volume = Math.min(audio.volume + 0.05, 1.0);
    } else {
      clearInterval(fadeInterval);
    }
  }, 100);
}

function fadeOut(audio) {
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume = Math.max(audio.volume - 0.05, 0);
    } else {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(fadeInterval);
    }
  }, 100);
}
