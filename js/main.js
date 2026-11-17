import Trail from "./shadow.js";
import { drawSky } from "./sky.js";
import { drawClouds } from "./Clouds.js";
import { drawAirplane } from "./DrawAirplane.js";
import { setupControl } from "./example.js";

const canvas = document.getElementById("skyCanvas");
const ctx = canvas.getContext("2d");

const speedSlider = document.getElementById("speedSlider");
const speedVal = document.getElementById("speedVal");
const propSlider = document.getElementById("propSlider");
const propVal = document.getElementById("propVal");
const turbSlider = document.getElementById("turbSlider");
const turbVal = document.getElementById("turbVal");
const timeBtn = document.getElementById("timeBtn");
const timeIcon = document.getElementById("timeIcon");
const timeText = document.getElementById("timeText");

const controlsBtn = document.getElementById("controls");
const controlIcon = document.getElementById("controlIcon");
const controlText = document.getElementById("controlText");

let flightSpeedMult = 1.0;
let propSpeedMult = 1.0;
let turbulenceMult = 1.0;
let timeOfDay = "day";
let propAngle = 0;
let flightTime = 0;
let pitchBoost = 0;

const planeTrial = new Trail({ maxPoints: 22, spawnInterval: 3 });

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const clouds = [];
const numClouds = 14;

function initClouds() {
  clouds.length = 0;
  for (let i = 0; i < numClouds; i++) {
    clouds.push({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height * 0.7),
      scale: 0.5 + Math.random() * 0.8,
      speed: 0.8 + Math.random() * 1.5,
      opacity: 0.4 + Math.random() * 0.5,
      puffs: Array.from({ length: 5 }, () => ({
        offsetX: (Math.random() - 0.5) * 60,
        offsetY: (Math.random() - 0.5) * 20,
        radius: 25 + Math.random() * 25,
      })),
    });
  }
}
initClouds();

const stars = Array.from({ length: 60 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight * 0.6,
  radius: Math.random() * 1.5,
  alpha: Math.random(),
}));

const plane = {
  x: canvas.width * 0.4,
  y: canvas.height * 0.45,
  targetX: canvas.width * 0.4,
  targetY: canvas.height * 0.45,
  width: 180,
  height: 60,
  angle: 0,
  speed: 7,
};

const control = setupControl(plane, canvas);
controlsBtn.addEventListener("click", () => {
  const currentMode = control.cycleMode();

  if (currentMode === "default") {
    currentMode.textContent = "Auto";
    controlIcon.className = "fa-solid fa-computer-plane";
  } else if (mouse === "mouse") {
    currentMode.textContent = "Mouse";
    controlIcon.className = "fa-solid fa-computer-mouse";
  } else {
    mouse = "keyboard";
    currentMode.textContent = "Keyboard";
    controlIcon.className = "fa-solid fa-computer-keyboard";

    plane.targetX = canvas.width * 0.4;
    plane.targetY = canvas.height * 0.45;
  }
});

window.addEventListener("click", (e) => {
  if (e.target.closest(".glass-panel")) return;
  if (control.getMode() !== "default") return;

  pitchBoost = -0.25;
  plane.targetY = Math.max(100, plane.targetY - 50);
  setTimeout(() => {
    plane.targetY = canvas.height * 0.45;
  }, 600);
});

function animate() {
  flightTime += 0.03 * flightSpeedMult;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSky(ctx, canvas, timeOfDay, stars, flightTime);
  drawClouds(ctx, canvas, clouds, flightSpeedMult, timeOfDay);

  propAngle += 0.35 * propSpeedMult;

  const bobbing = Math.sin(flightTime * 2) * (8 * turbulenceMult);
  const rollMotion = Math.cos(flightTime * 1.5) * (0.04 * turbulenceMult);

  plane.x += (plane.targetX - plane.x) * 0.06;
  plane.y += (plane.targetY - plane.y) * 0.06;

  const deltaY = (plane.targetY - plane.y) * 0.005;
  const clampedPitch = Math.max(-0.45, Math.min(0.45, deltaY));

  plane.angle = clampedPitch + rollMotion + pitchBoost;

  pitchBoost *= 0.92;

  const currentPlaneY = plane.y + bobbing;

  planeTrial.update(plane.x, currentPlaneY, plane.angle, flightSpeedMult);
  planeTrial.render(ctx, timeOfDay);

  drawAirplane(ctx, plane.x, currentPlaneY, plane.angle, propAngle);

  requestAnimationFrame(animate);
}

speedSlider.addEventListener("input", (e) => {
  flightSpeedMult = parseFloat(e.target.value);
  speedVal.textContent = flightSpeedMult.toFixed(1) + "x";
});

propSlider.addEventListener("input", (e) => {
  propSpeedMult = parseFloat(e.target.value);
  propVal.textContent = propSpeedMult.toFixed(1) + "x";
});

turbSlider.addEventListener("input", (e) => {
  turbulenceMult = parseFloat(e.target.value);
  if (turbulenceMult === 0) turbVal.textContent = "Выкл";
  else if (turbulenceMult < 1) turbVal.textContent = "Низкая";
  else if (turbulenceMult === 1) turbVal.textContent = "Средняя";
  else turbVal.textContent = "Высокая";
});

timeBtn.addEventListener("click", () => {
  if (timeOfDay === "day") {
    timeOfDay = "sunset";
    timeText.textContent = "Закат";
    timeIcon.className = "fa-solid fa-cloud-sun";
  } else if (timeOfDay === "sunset") {
    timeOfDay = "night";
    timeText.textContent = "Ночь";
    timeIcon.className = "fa-solid fa-moon";
  } else {
    timeOfDay = "day";
    timeText.textContent = "День";
    timeIcon.className = "fa-solid fa-sun";
  }
});

window.onload = function () {
  animate();
};
