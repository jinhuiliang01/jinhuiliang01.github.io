let currentAudio = null;
let isDraggingProgress = false;

// Format time helper
// Not everyone could see the time 125 seconds = 2 minutes 5 seconds, so setting this could help people know the time generally.
// Also when people playing their audio player platform, most of the song shows how many minutes how many seconds instead of just purely seconds.
// So this help people to get used to other platforms.
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Initialize tracks
// Each song in a playlist is represented by a track-item element, also each has its audio file path stored in data-audio,
// so when clicking a track it would start playing that song.
document.querySelectorAll(".track-item").forEach((track) => {
  track.addEventListener("click", () => {
    const audioSrc = track.getAttribute("data-audio");

    // Stop previous audio
    // When people wanna skip to another song, I don't want two audio playing together.
    // With this function, poeple could directly skip another audio.
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create new audio element
    currentAudio = new Audio(audioSrc);

    // Setup progress bar
    // When people playing sound, some of time just wanna listen to the chorus part, so there's a progress bar for them to choose which part they wanna listen to.
    currentAudio.addEventListener("timeupdate", () => {
      if (!isDraggingProgress) {
        const progress =
          (currentAudio.currentTime / currentAudio.duration) * 100;
        document.getElementById("progress-bar").value = progress;
        document.getElementById("current-time").textContent = formatTime(
          currentAudio.currentTime
        );
      }
    });

    currentAudio.addEventListener("loadedmetadata", () => {
      document.getElementById("duration").textContent = formatTime(
        currentAudio.duration
      );
    });

    currentAudio.play();
  });
});

// Play/Pause controls
// When people wanna stop playing the audio, they could stop it at anytime.
document.getElementById("play-button").addEventListener("click", () => {
  if (currentAudio) currentAudio.play();
});

document.getElementById("pause-button").addEventListener("click", () => {
  if (currentAudio) currentAudio.pause();
});

// Progress bar interaction
// Some people get used to dragging the progress bar but not just click it, so here is another option.
const progressBar = document.getElementById("progress-bar");
progressBar.addEventListener("input", (e) => {
  isDraggingProgress = true;
  if (currentAudio) {
    const seekTime = (e.target.value / 100) * currentAudio.duration;
    currentAudio.currentTime = seekTime;
  }
});

progressBar.addEventListener("mouseup", () => {
  isDraggingProgress = false;
});

progressBar.addEventListener("touchend", () => {
  isDraggingProgress = false;
});
