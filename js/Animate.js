function animate() {
  flightTime += 0.03 * flightSpeedMult;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSky(ctx, canvas, timeOfDay, stars, flightTime);
  drawClouds(ctx, canvas, clouds, flightSpeedMult, timeOfDay);

  propAngle += 0.35 * propSpeedMult;

  const bobbing = Math.sin(flightTime * 2) * (8 * turbulenceMult);
  const rollMotion = Math.cos(flightTime * 1.5) * (0.04 * turbulenceMult);

  plane.y += (plane.targetY - plane.y) * 0.05;

  const deltaY = (plane.targetY - plane.y) * 0.005;
  plane.angle = deltaY + rollMotion + pitchBoost;

  pitchBoost *= 0.92;

  const currentPlaneY = plane.y + bobbing;

  planeTrial.update(plane.x, currentPlaneY, plane.angle, flightSpeedMult);
  planeTrial.render(ctx, timeOfDay);

  drawAirplane(ctx, plane.x, currentPlaneY, plane.angle, propAngle);

  requestAnimationFrame(animate);
}
