export function drawSky(ctx, canvas, timeOfDay, stars, flightTime) {
  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  if (timeOfDay === "day") {
    gradient.addColorStop(0, "#3f3f3f");
    gradient.addColorStop(0.6, "#565656");
    gradient.addColorStop(1, "#767879");
  } else if (timeOfDay === "sunset") {
    gradient.addColorStop(0, "#0f172a");
    gradient.addColorStop(0.35, "#581c87");
    gradient.addColorStop(0.65, "#c026d3");
    gradient.addColorStop(0.85, "#f97316");
    gradient.addColorStop(1, "#fde047");
  } else {
    gradient.addColorStop(0, "#020617");
    gradient.addColorStop(0.7, "#0f172a");
    gradient.addColorStop(1, "#1e293b");
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (timeOfDay === "night") {
    ctx.fillStyle = "#ffffff";
    stars.forEach((star) => {
      ctx.globalAlpha = Math.sin(flightTime * 2 + star.x) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;
  }
}
