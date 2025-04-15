const airportAudio = document.querySelector("#airport-audio");
console.log(airportAudio);

// here is my logic for playing the sound
//first I am fetching the right play button
const playButton = document.querySelector("#play-button");
console.log(playButton);
// playing sound on click
playButton.addEventListener("click", playAudio);
// my play logic
function playAudio() {
  airportAudio.play();
}
//airportAudio.play();

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

pauseButton.addEventListener("click", pauseAudio);

function pauseAudio() {
  airportAudio.pause();
}

const popSound = document.querySelector("#pop-sound");
console.log(popSound);

const popButton = document.querySelector("#pop-button");
console.log(popButton);
// playing sound on click
popButton.addEventListener("click", popAudio);

function popAudio() {
  // airportAudio.pause();
  popSound.play();
}
