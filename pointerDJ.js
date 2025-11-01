let currentSong = null;
let fadeInterval = null;

document.addEventListener("mousemove", (event) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = event.clientX;
  const y = event.clientY;

  const horizontal = x < width / 2 ? "left" : "right";
  const vertical = y < height / 2 ? "top" : "bottom";

  let songId;

  if (horizontal === "left" && vertical === "top") {
    songId = "song1";
  } else if (horizontal === "right" && vertical === "top") {
    songId = "song2";
  } else if (horizontal === "left" && vertical === "bottom") {
    songId = "song3";
  } else {
    songId = "song4";
  }

  playSongWithFade(songId);
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
