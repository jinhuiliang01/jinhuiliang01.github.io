// This is an array (list) that stores information about all our music albums
// Each album is an object {} containing title, cover image path, and audio file path
const ALBUMS = [
  {
    title: "Dancing with the silence", // The name of the song
    cover: "/interactive_media/assignment3/images/cover2.png", // File path to the album cover image
    audio: "/interactive_media/assignment3/audio/dancing with the silence.wav", // File path to the audio file
  },
  {
    title: "Luv u",
    cover: "/interactive_media/assignment3/images/cover3.png",
    audio: "/interactive_media/assignment3/audio/Luv u.wav",
  },
  {
    title: "Best Memory With You",
    cover: "/interactive_media/assignment3/images/cover1.png",
    audio: "/interactive_media/assignment3/audio/Best memory with you.mp3",
  },
  {
    title: "Light",
    cover: "/interactive_media/assignment3/images/cover4.jpg",
    audio: "/interactive_media/assignment3/audio/intro_Light.mp3",
  },
  {
    title: "Memory",
    cover: "/interactive_media/assignment3/images/cover5.jpg",
    audio: "/interactive_media/assignment3/audio/memory.mp3",
  },
  {
    title: "Heart To Hide",
    cover: "/interactive_media/assignment3/images/cover6.jpg",
    audio: "/interactive_media/assignment3/audio/Heart to Hide.mp3",
  },
];

// This is a class - think of it as a blueprint for creating a music player
// Classes help organize code and create reusable objects
class MusicPlayer {
  // Constructor is a special function that runs when we create a new MusicPlayer
  // It sets up the initial state of our music player
  constructor() {
    // Find the HTML element with id "carousel" and store it in this.carousel
    // document.getElementById() searches the webpage for an element with that specific id
    this.carousel = document.getElementById("carousel");

    // Find the HTML audio element with id "player" and store it in this.player
    // This is the invisible audio player that actually plays our music
    this.player = document.getElementById("player");

    // Keep track of what's currently playing (starts as null = nothing playing)
    this.currentlyPlaying = null;

    // Call the initCarousel function to set everything up
    this.initCarousel();
  }

  // This function converts seconds (like 83.5) into a readable time format (like "1:23")
  formatTime(seconds) {
    // If the input isn't a valid number, return "0:00"
    if (isNaN(seconds)) return "0:00";

    // Math.floor() rounds down to the nearest whole number
    // Divide by 60 to get minutes (83 seconds = 1 minute)
    const minutes = Math.floor(seconds / 60);

    // Use % (modulo) to get the remaining seconds after removing full minutes
    // 83 % 60 = 23 (83 seconds = 1 minute and 23 seconds)
    const remainingSeconds = Math.floor(seconds % 60);

    // Create the time string: "1:23"
    // .toString() converts number to text
    // .padStart(2, '0') adds a zero in front if needed (like "05" instead of "5")
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  // This function creates all the album covers and sets up the 3D carousel
  initCarousel() {
    // forEach() loops through each album in our ALBUMS array
    // (album, i) means: album = current album object, i = index number (0, 1, 2...)
    ALBUMS.forEach((album, i) => {
      // Calculate the rotation angle for this album in the 3D circle
      // 360° divided by number of albums = angle between each album
      const angle = (360 / ALBUMS.length) * i;

      // Create a new div element to hold this album
      const albumEl = document.createElement("div");

      // Add the CSS class "album" to style this element
      albumEl.className = "album";

      // Position this album in 3D space:
      // rotateY() spins it around the Y-axis (like a carousel)
      // translateZ() moves it forward in 3D space (600px from center)
      albumEl.style.transform = `rotateY(${angle}deg) translateZ(600px)`;

      // Create the inner container that will flip when hovered
      const inner = document.createElement("div");
      inner.className = "album-inner";

      // Create the front face of the album (shows the cover image)
      const front = document.createElement("div");
      front.className = "album-front";
      // Set the background image to the album cover
      front.style.backgroundImage = `url(${album.cover})`;

      // Create the back face of the album (shows the music controls)
      const back = document.createElement("div");
      back.className = "album-back";

      // Create an image element for the small album cover on the back
      const img = document.createElement("img");
      img.src = album.cover; // Set the image source to the album cover

      // Create a heading element for the song title
      const title = document.createElement("h2");
      title.textContent = album.title; // Set the text to the album title

      // Create a container to hold the progress bar and timeline
      const progressContainer = document.createElement("div");
      progressContainer.className = "progress-container";

      // Create the progress bar (slider) for scrubbing through the song
      const progress = document.createElement("input");
      progress.type = "range"; // Makes it a slider
      progress.min = 0; // Minimum value is 0 (start of song)
      progress.step = 1; // Move in 1-second increments

      // Create the timeline display container (shows current time / total time)
      const timeline = document.createElement("div");
      timeline.className = "timeline";

      // Create span for current time display (like "1:23")
      const currentTime = document.createElement("span");
      currentTime.textContent = "0:00"; // Start at 0:00

      // Create span for total time display (like "3:45")
      const totalTime = document.createElement("span");
      totalTime.textContent = "0:00"; // Start at 0:00

      // Add both time displays to the timeline container
      timeline.appendChild(currentTime);
      timeline.appendChild(totalTime);

      // Add progress bar and timeline to the progress container
      progressContainer.appendChild(progress);
      progressContainer.appendChild(timeline);

      // Create the play/pause button
      const playPause = document.createElement("button");
      playPause.innerHTML = "▶"; // Start with play icon

      // Add all elements to the back of the album in order:
      back.appendChild(img); // Album image
      back.appendChild(title); // Song title
      back.appendChild(progressContainer); // Progress bar and timeline
      back.appendChild(playPause); // Play/pause button

      // Add front and back to the inner container
      inner.appendChild(front);
      inner.appendChild(back);

      // Add the inner container to the album element
      albumEl.appendChild(inner);

      // Add the complete album to the carousel
      this.carousel.appendChild(albumEl);

      // Set up event listener for when mouse enters this album
      // addEventListener() listens for specific events (like "mouseenter")
      albumEl.addEventListener("mouseenter", () => {
        // Load this album's audio file into the player
        this.player.src = album.audio;

        // Pause any currently playing music
        this.player.pause();

        // Reset progress bar to beginning
        progress.value = 0;

        // Reset button to show play icon
        playPause.innerHTML = "▶";

        // Reset time displays
        currentTime.textContent = "0:00";
        totalTime.textContent = "0:00";
      });

      // Set up event listener for when play/pause button is clicked
      playPause.addEventListener("click", () => {
        // If something else is playing, stop it first
        if (this.currentlyPlaying && this.currentlyPlaying !== this.player) {
          this.currentlyPlaying.pause();
        }

        // Check if the current player is paused
        if (this.player.paused) {
          // If paused, start playing
          this.player.play();
          playPause.innerHTML = "⏸"; // Change to pause icon
          this.currentlyPlaying = this.player; // Remember what's playing
        } else {
          // If playing, pause it
          this.player.pause();
          playPause.innerHTML = "▶"; // Change to play icon
        }
      });

      // Set up event listener for when the audio time updates (fires every ~250ms while playing)
      this.player.addEventListener("timeupdate", () => {
        // Set the maximum value of progress bar to song duration
        progress.max = this.player.duration || 0;

        // Set current position of progress bar to current playback time
        progress.value = this.player.currentTime;

        // Update the time displays using our formatTime function
        currentTime.textContent = this.formatTime(this.player.currentTime);
        totalTime.textContent = this.formatTime(this.player.duration);
      });

      // Set up event listener for when audio metadata is loaded (gets song info like duration)
      this.player.addEventListener("loadedmetadata", () => {
        // Update total time display when we know the song length
        totalTime.textContent = this.formatTime(this.player.duration);
      });

      // Set up event listener for when user drags the progress bar
      progress.addEventListener("input", (e) => {
        // Set the audio playback position to where the user dragged the slider
        // e.target.value is the new position on the progress bar
        this.player.currentTime = e.target.value;
      });
    });

    // Keep track of the current rotation angle of the carousel
    this.currentAngle = 0;

    // Set up event listener for mouse wheel scrolling
    window.addEventListener("wheel", (e) => {
      // e.deltaY is how much the user scrolled (positive = down, negative = up)
      // Multiply by 0.05 to make the rotation speed reasonable
      this.currentAngle += e.deltaY * 0.05;

      // Apply the rotation to the carousel
      // This makes the whole carousel spin around the Y-axis
      this.carousel.style.transform = `rotateY(${this.currentAngle}deg)`;
    });
  }
}

// Create a new instance of our MusicPlayer class
// This actually runs all the code and sets up the music player
new MusicPlayer();
