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
    cover: "/assignment3/images/cover4.jpg",
    audio: "/assignment3/audio/intro_Light.mp3",
  },
  {
    title: "Memory",
    cover: "/assignment3/images/cover5.jpg",
    audio: "/assignment3/audio/memory.mp3",
  },
  {
    title: "Heart To Hide",
    cover: "/assignment3/images/cover6.jpg",
    audio: "/assignment3/audio/Heart to Hide.mp3",
  },
];

class MusicPlayer {
  constructor() {
    this.carousel = document.getElementById("carousel");
    this.player = document.getElementById("player");
    this.currentlyPlaying = null;
    this.initCarousel();
  }

  initCarousel() {
    ALBUMS.forEach((album, i) => {
      const angle = (360 / ALBUMS.length) * i;
      const albumEl = document.createElement("div");
      albumEl.className = "album";
      albumEl.style.transform = `rotateY(${angle}deg) translateZ(600px)`;

      const inner = document.createElement("div");
      inner.className = "album-inner";

      const front = document.createElement("div");
      front.className = "album-front";
      front.style.backgroundImage = `url(${album.cover})`;

      const back = document.createElement("div");
      back.className = "album-back";

      const img = document.createElement("img");
      img.src = album.cover;
      const title = document.createElement("h2");
      title.textContent = album.title;

      const progress = document.createElement("input");
      progress.type = "range";
      progress.min = 0;
      progress.step = 1;

      const playPause = document.createElement("button");
      playPause.textContent = "Play";

      back.appendChild(img);
      back.appendChild(title);
      back.appendChild(progress);
      back.appendChild(playPause);

      inner.appendChild(front);
      inner.appendChild(back);
      albumEl.appendChild(inner);
      this.carousel.appendChild(albumEl);

      albumEl.addEventListener("mouseenter", () => {
        this.player.src = album.audio;
        this.player.pause();
        progress.value = 0;
        playPause.textContent = "Play";
      });

      playPause.addEventListener("click", () => {
        if (this.currentlyPlaying && this.currentlyPlaying !== this.player) {
          this.currentlyPlaying.pause();
        }

        if (this.player.paused) {
          this.player.play();
          playPause.textContent = "Pause";
          this.currentlyPlaying = this.player;
        } else {
          this.player.pause();
          playPause.textContent = "Play";
        }
      });

      this.player.addEventListener("timeupdate", () => {
        progress.max = this.player.duration || 0;
        progress.value = this.player.currentTime;
      });

      progress.addEventListener("input", (e) => {
        this.player.currentTime = e.target.value;
      });
    });

    this.currentAngle = 0;
    window.addEventListener("wheel", (e) => {
      this.currentAngle += e.deltaY * 0.05;
      this.carousel.style.transform = `rotateY(${this.currentAngle}deg)`;
    });
  }
}

// Initialize
new MusicPlayer();
