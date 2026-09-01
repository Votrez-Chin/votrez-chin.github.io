(function () {
  "use strict";

  var container = document.getElementById("pointer-dj-container");
  var startBtn = document.getElementById("startBtn");
  var startOverlay = document.getElementById("startOverlay");
  var muteBtn = document.getElementById("muteBtn");
  var volRange = document.getElementById("volRange");
  var nowPlaying = document.getElementById("now-playing");

  // One entry for each invisible screen area:
  // top-left, top-right, bottom-left, bottom-right
  var moods = [
    {
      title: "Rap",
      song: "https://res.cloudinary.com/dfgtus3xa/video/upload/v1787336779/Novel_Fergus_-_%E5%9C%B0%E7%9B%A4%E4%BD%AC_cKtRm_3wG-Y.mp3",
      image: "https://res.cloudinary.com/dfgtus3xa/image/upload/v1787336661/500x500.jpg"
    },
    {
      title: "Jazz",
      song: "https://res.cloudinary.com/dfgtus3xa/video/upload/v1787335131/Project.mp3",
      image: "https://res.cloudinary.com/dfgtus3xa/image/upload/v1787335287/mqdefault.jpg"
    },
    {
      title: "Electronic",
      song: "https://res.cloudinary.com/dfgtus3xa/video/upload/v1787335517/%E3%83%A1%E3%82%AF%E3%83%AB%E3%83%A1_vG5_bwL7UkI.mp3",
      image: "https://res.cloudinary.com/dfgtus3xa/image/upload/v1787335353/maxresdefault.jpg"
    },
    {
      title: "Rock",
      song: "https://res.cloudinary.com/dfgtus3xa/video/upload/v1787336784/Nirvana_-_Smells_Like_Teen_Spirit_Official_Music_Video_hTWKbfoikeg.mp3",
      image: "https://res.cloudinary.com/dfgtus3xa/image/upload/v1787336706/ab67616d00001e02e175a19e530c898d167d39bf.jpg"
    }
  ];

  var player = new Audio();
  player.loop = true;
  player.volume = 0.55;

  var started = false;
  var muted = false;
  var currentMood = -1;

  function selectMood(index) {
    if (index === currentMood) return;

    currentMood = index;

    var mood = moods[index];

    // Changes the visible background image
    container.style.backgroundImage = 'url("' + mood.image + '")';
    nowPlaying.textContent = "Now playing: " + mood.title;

    // Do not play audio until the person presses Enter
    if (!started || muted) return;

    player.src = mood.song;
    player.load();

    player.play().catch(function (error) {
      console.error("Could not play music:", error);
      nowPlaying.textContent = "Could not load: " + mood.title;
    });
  }

  function getMoodFromCursor(event) {
    var rect = container.getBoundingClientRect();

    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    var isRightSide = x > rect.width / 2;
    var isBottomSide = y > rect.height / 2;

    // 0 = top-left, 1 = top-right, 2 = bottom-left, 3 = bottom-right
    if (!isBottomSide && !isRightSide) return 0;
    if (!isBottomSide && isRightSide) return 1;
    if (isBottomSide && !isRightSide) return 2;
    return 3;
  }

  container.addEventListener("mousemove", function (event) {
    selectMood(getMoodFromCursor(event));
  });

  startBtn.addEventListener("click", function () {
    started = true;
    muted = false;
    startOverlay.classList.add("hidden");

    // Start whichever mood the cursor last selected
    if (currentMood === -1) {
      selectMood(0);
    } else {
      currentMood = -1; // forces the selected song to load
      selectMood(getMoodFromCursor({
        clientX: window.innerWidth / 2,
        clientY: container.getBoundingClientRect().top + 20
      }));
    }
  });

  muteBtn.addEventListener("click", function () {
    muted = !muted;

    if (muted) {
      player.pause();
      muteBtn.textContent = "×";
    } else {
      player.play();
      muteBtn.textContent = "♪";
    }
  });

  volRange.addEventListener("input", function () {
    player.volume = volRange.value / 100;
  });

  // Default appearance before the visitor moves their cursor
  selectMood(0);
})();