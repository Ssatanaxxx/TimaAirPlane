class Trail {
  constructor(options = {}) {
    this.history = [];
    this.maxPoints = options.maxPoints || 25;
    this.spawnInterval = options.spawnInterval || 4;
    this.frameCount = 0;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} angle
   * @param {number} flightSpeedMult
   */
  update(x, y, angle, flightSpeedMult = 1.0) {
    this.frameCount++;

    if (this.frameCount % this.spawnInterval === 0) {
      this.history.unshift({
        x: x,
        y: y,
        angle: angle,
        life: 1.0,
      });
    }

    const driftSpeed = 3.2 * flightSpeedMult;
    for (let i = this.history.length - 1; i >= 0; i--) {
      const p = this.history[i];
      p.x -= driftSpeed;
      p.life -= 0.02 * flightSpeedMult;

      if (p.life <= 0 || p.x < -150) {
        this.history.splice(i, 1);
      }
    }

    if (this.history.length > this.maxPoints) {
      this.history.pop();
    }
  }

  drawShadow(ctx) {
    ctx.beginPath();
    ctx.moveTo(70, 0);
    ctx.bezierCurveTo(60, -22, 10, -24, -75, -15);
    ctx.bezierCurveTo(-90, -15, -90, 15, -75, 15);
    ctx.bezierCurveTo(10, 24, 60, 22, 70, 0);

    ctx.moveTo(-80, -10);
    ctx.lineTo(-115, -50);
    ctx.lineTo(-90, -50);
    ctx.lineTo(-50, -10);

    ctx.moveTo(5, -8);
    ctx.lineTo(-15, -45);
    ctx.lineTo(-30, -45);
    ctx.lineTo(-20, -8);

    ctx.moveTo(25, 2);
    ctx.lineTo(-15, 55);
    ctx.lineTo(-38, 55);
    ctx.lineTo(-10, 5);

    ctx.moveTo(-15, 55);
    ctx.lineTo(-38, 55);
    ctx.lineTo(-33, 46);
    ctx.lineTo(-18, 46);
    ctx.closePath();
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} timeOfDay
   */
  render(ctx, timeOfDay = "day") {
    ctx.save();

    let strokeBase = "255, 255, 255";
    let fillBase = "186, 230, 253";

    if (timeOfDay === "sunset") {
      strokeBase = "252, 254, 73";
      fillBase = "243, 115, 22";
    } else if (timeOfDay === "night") {
      strokeBase = "52, 175, 227";
      fillBase = "89, 102, 240";
    }

    for (let i = this.history.length - 1; i >= 0; i--) {
      const p = this.history[i];
      const scale = 0.85 + p.life * 0.15;
      const alpha = Math.pow(p.life, 1.8) * 0.35;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.scale(scale, scale);

      ctx.shadowColor = `rgba(${strokeBase}, ${alpha * 0.9})`;
      ctx.shadowBlur = 10;
      ctx.fillStyle = `rgba(${fillBase}, ${alpha * 0.12})`;

      this.drawShadow(ctx);
      ctx.fill();

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(${strokeBase}, ${alpha})`;
      ctx.stroke();

      ctx.restore();
    }

    ctx.restore();
  }
}

export default Trail;
