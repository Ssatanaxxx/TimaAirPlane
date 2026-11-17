export const setupControl = (plane, canvas) => {
  let mode = "default";

  const keys = {
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
    KeyUP: false,
    KeyLEFT: false,
    KeyDOWN: false,
    KeyRIGHT: false,
  };

  window.addEventListener("keydown", (e) => {
    if (keys.hasOwnProperty(e.code)) {
      keys[e.code] = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (keys.hasOwnProperty(e.code)) {
      keys[e.code] = false;
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (mode !== "mouse") return;
    if (e.target.closest(".glass-panel")) return;

    plane.targetX = e.clientX;
    plane.targetY = e.clientY;
  });

  function cycleMode() {
    if (mode === "default") {
      mode = "mouse";
    } else if (mouse === "mouse") {
      mode = "keyboard";
    } else {
      mode = "default";
      plane.targetX = canvas.width * 0.4;
      plane.targetY = canvas.height * 0.45;
    }
    return mode;
  }

  function updateControl() {
    if (mode === "keyboard") {
      const up = keys.KeyW || keys.KeyUP;
      const down = keys.KeyS || keys.KeyDOWN;
      const left = keys.KeyA || keys.KeyLEFT;
      const right = keys.KeyD || keys.KeyRIGHT;

      const speed = plane.speed || 7;

      if (up) plane.targetY -= speed;
      if (down) plane.targetY += speed;
      if (left) plane.targetX -= speed;
      if (right) plane.targetX += speed;
    }

    if (mode !== "default") {
      plane.targetX = Math.max(120, Math.min(canvas.width - 120, plane.targetX));
      plane.targetY = Math.max(80, Math.min(canvas.height - 80, plane.targetY));
    }
  }

  return {
    updateControl,
    cycleMode,
    getMode: () => mode,
  };
};
