const ALBUMS = [
  {
    title: "Dancing with the silence",
    cover: "/assignment3/images/cover2.png",
    audio: "/assignment3/audio/dancing with the silence.wav",
  },
  {
    title: "Luv u",
    cover: "/assignment3/images/cover3.png",
    audio: "/assignment3/audio/Luv u.wav",
  },
  {
    title: "Best Memory With You",
    cover: "/assignment3/images/cover1.png",
    audio: "/assignment3/audio/Best memory with you.mp3",
  },
  {
    title: "Light",
    cover: "images/album4.jpg",
    audio: "/assignment3/audio/intro_Light.mp3",
  },
  {
    title: "Memory",
    cover: "images/album5.jpg",
    audio: "/assignment3/audio/memory.mp3",
  },
  {
    title: "Heart To Hide",
    cover: "images/album6.jpg",
    audio: "/assignment3/audio/Heart to Hide.mp3",
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
      this.currentAngle += e.deltaY * 0.05;
      this.carousel.style.transform = `rotateY(${this.currentAngle}deg)`;
    });
  }

  setAlbumPosition(el, index) {
    const angle = (index * 60) % 360; // Adjust angle spacing as needed
    el.style.transform = `
      rotateY(${angle}deg)
      translateZ(500px)
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
