export function drawClouds(ctx, canvas, clouds, flightSpeedMult, timeOfDay) {
  clouds.forEach((cloud) => {
    cloud.x -= cloud.speed * flightSpeedMult;
    if (cloud.x < -150) {
      cloud.x = canvas.width + 150;
      cloud.y = Math.random() * (canvas.height * 0.65);
    }

    ctx.save();
    ctx.translate(cloud.x, cloud.y);
    ctx.scale(cloud.scale, cloud.scale);

    if (timeOfDay === "day") {
      ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
    } else if (timeOfDay === "sunset") {
      ctx.fillStyle = `rgba(253, 224, 71, ${cloud.opacity * 0.4})`;
    } else {
      ctx.fillStyle = `rgba(148, 163, 184, ${cloud.opacity * 0.25})`;
    }

    ctx.beginPath();
    cloud.puffs.forEach((puff) => {
      ctx.moveTo(puff.offsetX + puff.radius, puff.offsetY);
      ctx.arc(puff.offsetX, puff.offsetY, puff.radius, 0, Math.PI * 2);
    });
    ctx.fill();
    ctx.restore();
  });
}
