let currentAudio = null;
let isDraggingProgress = false;

// Format time helper
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Initialize tracks
document.querySelectorAll(".track-item").forEach((track) => {
  track.addEventListener("click", () => {
    const audioSrc = track.getAttribute("data-audio");

    // Stop previous audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create new audio element
    currentAudio = new Audio(audioSrc);

    // Setup progress bar
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
document.getElementById("play-button").addEventListener("click", () => {
  if (currentAudio) currentAudio.play();
});

document.getElementById("pause-button").addEventListener("click", () => {
  if (currentAudio) currentAudio.pause();
});

// Progress bar interaction
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
