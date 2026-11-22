/**
 * Floating Rose Petals & Golden Confetti Canvas Engine
 */

class PetalsEngine {
  constructor(canvasId = "petals-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.petals = [];
    this.sparkles = [];
    this.maxPetals = 35;
    this.isRunning = false;

    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.initPetals();
    this.start();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initPetals() {
    this.petals = [];
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }
  }

  createPetal(randomY = false) {
    const isGoldFlake = Math.random() < 0.25;
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -20,
      size: isGoldFlake ? Math.random() * 4 + 3 : Math.random() * 12 + 10,
      speedX: Math.random() * 1.5 - 0.75,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 2 - 1,
      sway: Math.random() * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      opacity: Math.random() * 0.5 + 0.4,
      isGold: isGoldFlake,
      color: isGoldFlake
        ? "rgba(212, 175, 55,"
        : Math.random() < 0.5
        ? "rgba(235, 175, 180,"
        : "rgba(215, 120, 135,"
    };
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate((p.rotation * Math.PI) / 180);

    if (p.isGold) {
      // Golden star / shimmering diamond flake
      this.ctx.fillStyle = `${p.color} ${p.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      // Curved organic rose petal
      this.ctx.fillStyle = `${p.color} ${p.opacity})`;
      this.ctx.beginPath();
      this.ctx.moveTo(0, -p.size / 2);
      this.ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size / 2, p.size / 2, 0, p.size / 2);
      this.ctx.bezierCurveTo(-p.size / 2, p.size / 2, -p.size / 2, -p.size / 2, 0, -p.size / 2);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  burst(x = this.width / 2, y = this.height / 2, count = 40) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 8 + 3;
      const isGold = Math.random() < 0.6;

      this.sparkles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        gravity: 0.15,
        drag: 0.96,
        size: Math.random() * 6 + 4,
        color: isGold ? "#ffd700" : "#ff7b90",
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 10 - 5
      });
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update & draw background petals
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.sway += p.swaySpeed;
      p.x += p.speedX + Math.sin(p.sway) * 0.8;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      if (p.y > this.height + 30 || p.x < -30 || p.x > this.width + 30) {
        this.petals[i] = this.createPetal(false);
      }

      this.drawPetal(p);
    }

    // Update & draw burst sparkles/confetti
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      s.vx *= s.drag;
      s.vy = s.vy * s.drag + s.gravity;
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= s.decay;
      s.rotation += s.rotSpeed;

      if (s.alpha <= 0) {
        this.sparkles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(s.x, s.y);
      this.ctx.rotate((s.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, s.alpha);
      this.ctx.fillStyle = s.color;
      this.ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
      this.ctx.restore();
    }

    if (this.isRunning) {
      requestAnimationFrame(() => this.update());
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.update();
    }
  }

  stop() {
    this.isRunning = false;
  }
}

window.petalsEngine = new PetalsEngine();
