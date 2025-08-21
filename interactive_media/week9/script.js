const ball = document.querySelector(".ball");
const outer = document.querySelector(".outer");

const moveButton = document.querySelector("#move-button");
const rotateButton = document.querySelector("#rotate-button");
const scaleButton = document.querySelector("#scale-button");
const resetButton = document.querySelector("#reset-button");

moveButton.addEventListener("click", moveBall);
rotateButton.addEventListener("click", rotateBall);
scaleButton.addEventListener("click", scaleBall);
resetButton.addEventListener("click", resetBall);

let distanceMoved = 0;
let rotation = 0;
let scale = 1;

function updateBallTransform() {
  ball.style.transform = `translateX(${distanceMoved}px) rotate(${rotation}deg) scale(${scale})`;
}

function moveBall() {
  const outerWidth = outer.clientWidth / 2;
  const maxDistance = outerWidth - 50;
  if (distanceMoved < maxDistance) {
    distanceMoved += 10;
    distanceMoved = Math.min(distanceMoved, maxDistance);
  }
  updateBallTransform();
}

function rotateBall() {
  rotation += 45; // Increased rotation angle for more noticeable effect
  updateBallTransform();
}

function scaleBall() {
  if (scale > 0.2) {
    scale -= 0.1;
    scale = Math.max(scale, 0.2); // Prevent scale from going below 0.2
  }
  updateBallTransform();
}

function resetBall() {
  distanceMoved = 0;
  rotation = 0;
  scale = 1;
  updateBallTransform();
}
