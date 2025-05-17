const ALBUMS = [
  {
    title: "Song 1",
    cover: "/assignment3/images/cover1.jpg",
    audio: "/assignment3/audio/chance.mp3",
  },
  {
    title: "Song 2",
    cover: "images/album2.jpg",
    audio: "audio/song2.mp3",
  },
  {
    title: "Song 3",
    cover: "images/album3.jpg",
    audio: "audio/song3.mp3",
  },
  {
    title: "Song 4",
    cover: "images/album4.jpg",
    audio: "audio/song4.mp3",
  },
  {
    title: "Song 5",
    cover: "images/album5.jpg",
    audio: "audio/song5.mp3",
  },
  {
    title: "Song 6",
    cover: "images/album6.jpg",
    audio: "audio/song6.mp3",
  },
];

class MusicPlayer {
  constructor() {
    this.carousel = document.getElementById("carousel");
    this.vinylPage = document.getElementById("vinylPage");
    this.player = document.getElementById("player");
    this.initCarousel();
    this.initVinylControls();
  }

  initCarousel() {
    ALBUMS.forEach((album, i) => {
      const albumEl = document.createElement("div");
      albumEl.className = "album";
      albumEl.style.backgroundImage = `url(${album.cover})`;
      this.setAlbumPosition(albumEl, i);
      albumEl.addEventListener("click", () => this.showVinyl(album));
      this.carousel.appendChild(albumEl);
    });

    this.currentAngle = 0;
    window.addEventListener("wheel", (e) => {
      this.currentAngle += e.deltaY * 0.2;
      this.carousel.style.transform = `rotateY(${this.currentAngle}deg)`;
    });
  }

  setAlbumPosition(el, index) {
    const angle = (index * 60) % 360;
    const scale = 1 - Math.abs(angle - 180) / 300;
    el.style.transform = `
                rotateY(${angle}deg)
                translateZ(400px)
                scale(${scale})
            `;
  }

  showVinyl(album) {
    document.querySelector(".scene").style.display = "none";
    this.vinylPage.style.display = "block";
    this.player.src = album.audio;

    document.getElementById("trackTitle").textContent = album.title;
    document.getElementById("playPauseBtn").textContent = "Play";
    document.getElementById("albumArt").src = album.cover;

    setTimeout(() => {
      this.vinylPage.querySelector(".vinyl").style.transform =
        "translateX(300px)";
    }, 50);
  }

  initVinylControls() {
    let isDragging = false;
    const handle = this.vinylPage.querySelector(".handle");

    handle.addEventListener("mousedown", () => {
      isDragging = true;
      document.addEventListener("mousemove", this.dragHandle);
      document.addEventListener("mouseup", () => {
        isDragging = false;
        document.removeEventListener("mousemove", this.dragHandle);
      });
    });

    // Vinyl click to close
    this.vinylPage.querySelector(".vinyl").addEventListener("click", () => {
      this.goBackToCarousel();
    });

    // New: Play/Pause Button
    document.getElementById("playPauseBtn").addEventListener("click", () => {
      if (this.player.paused) {
        this.player.play();
        this.vinylPage.classList.add("playing");
        document.getElementById("playPauseBtn").textContent = "Pause";
      } else {
        this.player.pause();
        this.vinylPage.classList.remove("playing");
        document.getElementById("playPauseBtn").textContent = "Play";
      }
    });

    // New: Back Button
    document.getElementById("backBtn").addEventListener("click", () => {
      this.goBackToCarousel();
    });

    // Update progress bar as audio plays
    this.player.addEventListener("timeupdate", () => {
      const progressBar = document.getElementById("progressBar");
      progressBar.max = this.player.duration;
      progressBar.value = this.player.currentTime;
    });

    // Allow seeking via progress bar
    document.getElementById("progressBar").addEventListener("input", (e) => {
      this.player.currentTime = e.target.value;
    });
  }

  goBackToCarousel() {
    this.player.pause();
    this.vinylPage.classList.remove("playing");
    this.vinylPage.style.display = "none";
    document.querySelector(".scene").style.display = "block";
  }

  dragHandle = (e) => {
    const vinyl = this.vinylPage.querySelector(".vinyl");
    const vinylRect = vinyl.getBoundingClientRect();
    const handleRect = e.target.getBoundingClientRect();

    const collision = !(
      handleRect.right < vinylRect.left ||
      handleRect.left > vinylRect.right ||
      handleRect.bottom < vinylRect.top ||
      handleRect.top > vinylRect.bottom
    );

    if (collision && !this.player.paused) {
      this.player.pause();
      this.vinylPage.classList.remove("playing");
    } else if (collision) {
      this.player.play();
      this.vinylPage.classList.add("playing");
    }
  };
}

// Initialize player
new MusicPlayer();
