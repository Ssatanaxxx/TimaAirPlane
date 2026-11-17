export function drawAirplane(ctx, x, y, angle, propAngle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Тень под самолетом
  ctx.save();
  ctx.translate(0, 120);
  ctx.scale(1, 0.2);
  ctx.beginPath();
  ctx.arc(-20, 0, 70, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(15, 23, 42, 0.15)";
  ctx.fill();
  ctx.restore();

  // Хвостовой киль
  ctx.fillStyle = "#7b7676";
  ctx.beginPath();
  ctx.moveTo(-80, -10);
  ctx.lineTo(-115, -50);
  ctx.lineTo(-90, -50);
  ctx.lineTo(-50, -10);
  ctx.closePath();
  ctx.fill();

  // Руль направления
  ctx.fillStyle = "#7b7676";
  ctx.beginPath();
  ctx.moveTo(-75, -5);
  ctx.lineTo(-100, -20);
  ctx.lineTo(-85, -20);
  ctx.lineTo(-60, -5);
  ctx.closePath();
  ctx.fill();

  // Корпус
  let bodyGradient = ctx.createLinearGradient(0, -25, 0, 25);
  bodyGradient.addColorStop(0, "#f8fafc");
  bodyGradient.addColorStop(0.5, "#e2e8f0");
  bodyGradient.addColorStop(1, "#94a3b8");

  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.moveTo(70, 0);
  ctx.bezierCurveTo(60, -22, 10, -24, -75, -15);
  ctx.bezierCurveTo(-90, -15, -90, 15, -75, 15);
  ctx.bezierCurveTo(10, 24, 60, 22, 70, 0);
  ctx.closePath();
  ctx.fill();

  // Полоса
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.moveTo(65, -2);
  ctx.bezierCurveTo(30, -8, -30, -5, -75, -2);
  ctx.lineTo(-75, 4);
  ctx.bezierCurveTo(-30, 2, 30, 4, 65, 0);
  ctx.closePath();
  ctx.fill();

  // Стекло кабины
  let glassGradient = ctx.createLinearGradient(20, -18, 55, -5);
  glassGradient.addColorStop(0, "#38bdf8");
  glassGradient.addColorStop(1, "#0284c7");
  ctx.fillStyle = glassGradient;
  ctx.beginPath();
  ctx.moveTo(20, -14);
  ctx.lineTo(48, -12);
  ctx.bezierCurveTo(55, -8, 52, 0, 42, 0);
  ctx.lineTo(20, -2);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(25, -11);
  ctx.lineTo(42, -9);
  ctx.stroke();

  // Иллюминаторы
  ctx.fillStyle = "#0f172a";
  for (let i = -30; i <= 0; i += 15) {
    ctx.beginPath();
    ctx.arc(i, -3, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Верхнее крыло
  ctx.fillStyle = "#cbd5e1";
  ctx.beginPath();
  ctx.moveTo(5, -8);
  ctx.lineTo(-15, -45);
  ctx.lineTo(-30, -45);
  ctx.lineTo(-20, -8);
  ctx.closePath();
  ctx.fill();

  // Нижнее крыло
  let wingGradient = ctx.createLinearGradient(0, 0, 0, 50);
  wingGradient.addColorStop(0, "#f1f5f9");
  wingGradient.addColorStop(1, "#cbd5e1");
  ctx.fillStyle = wingGradient;
  ctx.beginPath();
  ctx.moveTo(25, 2);
  ctx.lineTo(-15, 55);
  ctx.lineTo(-38, 55);
  ctx.lineTo(-10, 5);
  ctx.closePath();
  ctx.fill();

  // Нос и кок
  ctx.fillStyle = "#475569";
  ctx.beginPath();
  ctx.arc(68, 0, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1e293b";
  ctx.beginPath();
  ctx.arc(71, 0, 5, 0, Math.PI * 2);
  ctx.fill();

  // Пропеллер
  ctx.save();
  ctx.translate(73, 0);

  ctx.fillStyle = "rgba(226, 232, 240, 0.25)";
  ctx.beginPath();
  ctx.ellipse(0, 0, 4, 42, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 5, 45, 0, 0, Math.PI * 2);
  ctx.stroke();

  const bladeScale = Math.cos(propAngle);
  const bladeHeight = 42;

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.ellipse(
    0,
    0,
    Math.max(1.5, Math.abs(bladeScale) * 5),
    bladeHeight * Math.abs(Math.sin(propAngle)),
    0,
    0,
    Math.PI * 2,
  );
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(
    0,
    0,
    Math.max(1.5, Math.abs(Math.sin(propAngle)) * 5),
    bladeHeight * Math.abs(bladeScale),
    0,
    0,
    Math.PI * 2,
  );
  ctx.fill();

  ctx.fillStyle = "#eab308";
  ctx.beginPath();
  let tipY = bladeHeight * Math.abs(Math.sin(propAngle));
  if (tipY > 10) {
    ctx.arc(0, tipY - 2, 2.5, 0, Math.PI * 2);
    ctx.arc(0, -tipY + 2, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#e2e8f0";
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  ctx.restore();
}
