/* ============================================================
   Pac-Man Valentine's Special — Game Engine
   ============================================================ */
(() => {
  "use strict";

  // ─── DOM ──────────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const startScreen = $("startScreen");
  const gameScreen = $("gameScreen");
  const overScreen = $("overScreen");
  const winScreen = $("winScreen");
  const canvas = $("gameCanvas");
  const ctx = canvas.getContext("2d");
  const hudScore = $("hudScore");
  const hudLives = $("hudLives");
  const hudPower = $("hudPower");

  // ─── CONFIG ───────────────────────────────────────────────
  const TILE = 20;          // pixels per tile
  const FPS = 60;
  const PAC_SPEED = 2;      // px per frame
  const GHOST_SPEED = 1.5;
  const HEART_SPEED = 5;
  const POWER_DURATION = 6;   // seconds
  const ROSE_INTERVAL = 10;  // seconds between rose spawns
  const HEART_INTERVAL = 300; // ms between heart shots while powered
  const INITIAL_LIVES = 3;

  // ─── MAZE (1=wall, 0=dot, 2=empty, 3=ghost-house) ────────
  // 28 cols × 22 rows  (classic-ish)
  const MAZE_TEMPLATE = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 1, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 3, 3, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 1, 3, 3, 3, 3, 3, 3, 1, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 3, 3, 3, 3, 3, 3, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const COLS = MAZE_TEMPLATE[0].length;
  const ROWS = MAZE_TEMPLATE.length;

  // ─── STATE ────────────────────────────────────────────────
  let maze, dots, totalDots, score, lives, running, animId;
  let pacman, ghosts, hearts, rose;
  let powerTimer, roseTimer, heartShotTimer;
  let lastTime;
  let keysDown = {};

  // ─── HELPERS ──────────────────────────────────────────────
  const tileCenter = (col, row) => ({ x: col * TILE + TILE / 2, y: row * TILE + TILE / 2 });
  const toTile = px => Math.floor(px / TILE);
  const isWall = (c, r) => c < 0 || c >= COLS || r < 0 || r >= ROWS || maze[r][c] === 1;
  const wrap = (val, max) => ((val % max) + max) % max;

  const dirVec = { left: { x: -1, y: 0 }, right: { x: 1, y: 0 }, up: { x: 0, y: -1 }, down: { x: 0, y: 1 } };

  function canMove(px, py, dir, speed) {
    const v = dirVec[dir];
    const nx = px + v.x * speed;
    const ny = py + v.y * speed;
    const half = TILE / 2 - 2;
    // check four corners
    const corners = [
      { x: nx - half, y: ny - half },
      { x: nx + half, y: ny - half },
      { x: nx - half, y: ny + half },
      { x: nx + half, y: ny + half },
    ];
    for (const c of corners) {
      const tc = toTile(wrap(c.x, COLS * TILE));
      const tr = toTile(c.y);
      if (tr < 0 || tr >= ROWS) return false;
      if (maze[tr][tc] === 1) return false;
    }
    return true;
  }

  // ─── INIT ─────────────────────────────────────────────────
  function initGame() {
    // deep copy maze
    maze = MAZE_TEMPLATE.map(r => [...r]);
    dots = 0;
    totalDots = 0;
    score = 0;
    lives = INITIAL_LIVES;
    hearts = [];
    rose = null;
    powerTimer = 0;
    roseTimer = ROSE_INTERVAL;
    heartShotTimer = 0;

    // count dots
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (maze[r][c] === 0) totalDots++;
    dots = totalDots;

    // sizing
    canvas.width = COLS * TILE;
    canvas.height = ROWS * TILE;

    // pac-man start (row 16, col 13/14 area)
    const pc = tileCenter(14, 16);
    pacman = { x: pc.x, y: pc.y, dir: "left", nextDir: "left", mouthOpen: 0, mouthDir: 1, powered: false };

    // ghosts
    const ghostDefs = [
      { color: "#ff4444", col: 13, row: 10 }, // Red  – Blinky
      { color: "#ffb8ff", col: 14, row: 10 }, // Pink – Pinky
      { color: "#00ffff", col: 13, row: 11 }, // Cyan – Inky
      { color: "#ffb852", col: 14, row: 11 }, // Orange – Clyde
    ];
    ghosts = ghostDefs.map(g => {
      const p = tileCenter(g.col, g.row);
      return {
        x: p.x, y: p.y,
        color: g.color,
        dir: "up",
        speed: GHOST_SPEED,
        dead: false,
        deadTimer: 0,
        startCol: g.col, startRow: g.row,
        lastDecTileC: -1, lastDecTileR: -1, // track last decision tile
      };
    });

    updateHUD();
  }

  // ─── HUD ──────────────────────────────────────────────────
  function updateHUD() {
    hudScore.textContent = `Score: ${score}`;
    hudLives.textContent = "❤️ ".repeat(Math.max(lives, 0)).trim();
    if (pacman.powered) {
      hudPower.classList.remove("hidden");
      hudPower.textContent = `🌹 ${powerTimer.toFixed(1)}s`;
    } else {
      hudPower.classList.add("hidden");
    }
  }

  // ─── DRAWING ──────────────────────────────────────────────
  function drawMaze() {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c * TILE, y = r * TILE;
        if (maze[r][c] === 1) {
          // wall
          ctx.fillStyle = "#3b0764";
          ctx.fillRect(x, y, TILE, TILE);
          ctx.strokeStyle = "#7c3aed";
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 1, y + 1, TILE - 2, TILE - 2);
        } else {
          ctx.fillStyle = "#0a0014";
          ctx.fillRect(x, y, TILE, TILE);
        }
        // dot
        if (maze[r][c] === 0) {
          ctx.fillStyle = "#ffc0cb";
          ctx.beginPath();
          ctx.arc(x + TILE / 2, y + TILE / 2, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  function drawPacman() {
    const { x, y } = pacman;
    // wrap for drawing
    const dx = wrap(x, COLS * TILE);
    const dy = y;

    // angle by direction
    let startAngle = 0;
    if (pacman.dir === "right") startAngle = 0;
    if (pacman.dir === "down") startAngle = Math.PI / 2;
    if (pacman.dir === "left") startAngle = Math.PI;
    if (pacman.dir === "up") startAngle = -Math.PI / 2;

    const mouth = 0.25 * Math.abs(Math.sin(pacman.mouthOpen));

    ctx.save();
    ctx.translate(dx, dy);
    // glow when powered up
    if (pacman.powered) {
      ctx.shadowColor = "#ff4d8d";
      ctx.shadowBlur = 14;
    }
    ctx.fillStyle = pacman.powered ? "#ff4d8d" : "#ffd700";
    ctx.beginPath();
    ctx.arc(0, 0, TILE / 2 - 2, startAngle + mouth * Math.PI, startAngle + (2 - mouth) * Math.PI);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    // eye
    const eyeAngle = startAngle + Math.PI / 4.5;
    const eyeR = TILE / 5;
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(Math.cos(eyeAngle) * eyeR, Math.sin(eyeAngle) * eyeR, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawGhost(g) {
    if (g.dead) return; // dead ghosts are invisible until respawn
    const { x, y, color } = g;
    const r = TILE / 2 - 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;

    // body
    ctx.beginPath();
    ctx.arc(0, -2, r, Math.PI, 0, false);
    ctx.lineTo(r, r);
    // wavy bottom
    const w = r / 2;
    ctx.quadraticCurveTo(r - w / 2, r - 3, r - w, r);
    ctx.quadraticCurveTo(r - 1.5 * w, r - 3, r - 2 * w, r);
    ctx.quadraticCurveTo(-r + 1.5 * w, r - 3, -r + w, r);
    ctx.quadraticCurveTo(-r + w / 2, r - 3, -r, r);
    ctx.lineTo(-r, -2);
    ctx.closePath();
    ctx.fill();

    // eyes
    const eyeOff = 3;
    for (const sx of [-eyeOff, eyeOff]) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(sx, -3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(sx + (dirVec[g.dir]?.x || 0), -3 + (dirVec[g.dir]?.y || 0), 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawRose() {
    if (!rose) return;
    ctx.font = `${TILE - 2}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🌹", rose.x, rose.y);
  }

  function drawHearts() {
    ctx.font = `${TILE - 6}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const h of hearts) {
      ctx.fillText("💕", h.x, h.y);
    }
  }

  // ─── UPDATE ───────────────────────────────────────────────
  function update(dt) {
    // ── Pac-Man Movement ──
    pacman.mouthOpen += 0.15;
    if (canMove(pacman.x, pacman.y, pacman.nextDir, PAC_SPEED)) {
      pacman.dir = pacman.nextDir;
    }
    if (canMove(pacman.x, pacman.y, pacman.dir, PAC_SPEED)) {
      const v = dirVec[pacman.dir];
      pacman.x += v.x * PAC_SPEED;
      pacman.y += v.y * PAC_SPEED;
    }
    // wrap horizontally
    pacman.x = wrap(pacman.x, COLS * TILE);

    // ── Eat dots ──
    const pc = toTile(pacman.x);
    const pr = toTile(pacman.y);
    if (pc >= 0 && pc < COLS && pr >= 0 && pr < ROWS && maze[pr][pc] === 0) {
      maze[pr][pc] = 2;
      dots--;
      score += 10;
      if (dots <= 0) { victory(); return; }
    }

    // ── Rose spawn ──
    roseTimer -= dt;
    if (roseTimer <= 0 && !rose) {
      spawnRose();
      roseTimer = ROSE_INTERVAL + Math.random() * 5;
    }

    // ── Rose collect ──
    if (rose) {
      const dx = pacman.x - rose.x;
      const dy = pacman.y - rose.y;
      if (Math.sqrt(dx * dx + dy * dy) < TILE * 0.7) {
        pacman.powered = true;
        powerTimer = POWER_DURATION;
        heartShotTimer = 0;
        rose = null;
        score += 50;
      }
    }

    // ── Power-up timer ──
    if (pacman.powered) {
      powerTimer -= dt;
      heartShotTimer -= dt * 1000;
      if (heartShotTimer <= 0) {
        shootHeart();
        heartShotTimer = HEART_INTERVAL;
      }
      if (powerTimer <= 0) {
        pacman.powered = false;
        powerTimer = 0;
      }
    }

    // ── Hearts movement ──
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      const v = dirVec[h.dir];
      h.x += v.x * HEART_SPEED;
      h.y += v.y * HEART_SPEED;
      // wrap
      h.x = wrap(h.x, COLS * TILE);
      const tc = toTile(h.x);
      const tr = toTile(h.y);
      // remove if hit wall or out of bounds
      if (tr < 0 || tr >= ROWS || isWall(tc, tr)) {
        hearts.splice(i, 1);
        continue;
      }
      // hit ghost?
      for (const g of ghosts) {
        if (g.dead) continue;
        const gx = g.x - h.x;
        const gy = g.y - h.y;
        if (Math.sqrt(gx * gx + gy * gy) < TILE * 0.7) {
          g.dead = true;
          g.deadTimer = 4; // seconds to respawn
          score += 200;
          hearts.splice(i, 1);
          break;
        }
      }
    }

    // ── Ghost Logic ──
    for (const g of ghosts) {
      if (g.dead) {
        g.deadTimer -= dt;
        if (g.deadTimer <= 0) {
          g.dead = false;
          const p = tileCenter(g.startCol, g.startRow);
          g.x = p.x; g.y = p.y;
          g.dir = "up";
          g.lastDecTileC = -1; g.lastDecTileR = -1;
        }
        continue;
      }
      moveGhost(g);
      // collision with pacman
      const gx = g.x - pacman.x;
      const gy = g.y - pacman.y;
      if (Math.sqrt(gx * gx + gy * gy) < TILE * 0.75) {
        loseLife();
        return;
      }
    }

    updateHUD();
  }

  // ─── GHOST AI ─────────────────────────────────────────────
  const opposite = { up: "down", down: "up", left: "right", right: "left" };

  /** True when the ghost is inside the ghost-house (tile value 3). */
  const inGhostHouse = (c, r) =>
    r >= 0 && r < ROWS && c >= 0 && c < COLS && maze[r][c] === 3;

  /**
   * Tile-passability check that is context-aware:
   *  – if the ghost is INSIDE the ghost house, value-3 tiles are passable
   *  – if the ghost is OUTSIDE, value-3 tiles are treated as walls
   *    (prevents re-entry)
   */
  const ghostBlocked = (nc, nr, ghostInHouse) => {
    if (isWall(nc, nr)) return true;
    if (!ghostInHouse && nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && maze[nr][nc] === 3) return true;
    return false;
  };

  function chooseGhostDir(g, gc, gr) {
    const isInHouse = inGhostHouse(gc, gr);

    // ── Ghost-house exit mode: always navigate upward to leave ──
    if (isInHouse) {
      // Step 1: centre on the exit columns (13 or 14)
      if (gc < 13 && !ghostBlocked(gc + 1, gr, true)) { g.dir = "right"; return; }
      if (gc > 14 && !ghostBlocked(gc - 1, gr, true)) { g.dir = "left"; return; }
      // Step 2: go UP toward the exit
      if (!ghostBlocked(gc, gr - 1, true)) { g.dir = "up"; return; }
      // fallback: any non-wall direction
      for (const d of ["up", "left", "right", "down"]) {
        const v = dirVec[d];
        if (!ghostBlocked(gc + v.x, gr + v.y, true)) { g.dir = d; return; }
      }
      return;
    }

    // ── Normal AI (outside ghost house) ──
    const dirs = ["up", "down", "left", "right"];
    const possible = dirs.filter(d => {
      if (d === opposite[g.dir]) return false;
      const v = dirVec[d];
      const nc = ((gc + v.x) % COLS + COLS) % COLS;
      const nr = gr + v.y;
      return !ghostBlocked(nc, nr, false);
    });

    if (possible.length === 0) {
      // dead-end: allow reverse
      const rev = opposite[g.dir];
      const rv = dirVec[rev];
      if (!ghostBlocked(((gc + rv.x) % COLS + COLS) % COLS, gr + rv.y, false)) g.dir = rev;
    } else if (Math.random() < 0.6) {
      // chase pacman: pick direction that minimises distance
      let best = possible[0], bestDist = Infinity;
      for (const d of possible) {
        const v = dirVec[d];
        const nx = gc * TILE + TILE / 2 + v.x * TILE;
        const ny = gr * TILE + TILE / 2 + v.y * TILE;
        const dist = (nx - pacman.x) ** 2 + (ny - pacman.y) ** 2;
        if (dist < bestDist) { bestDist = dist; best = d; }
      }
      g.dir = best;
    } else {
      g.dir = possible[Math.floor(Math.random() * possible.length)];
    }
  }

  function moveGhost(g) {
    const gc = toTile(g.x);
    const gr = toTile(g.y);
    const cx = gc * TILE + TILE / 2;
    const cy = gr * TILE + TILE / 2;
    const isInHouse = inGhostHouse(gc, gr);
    const atCenter = Math.abs(g.x - cx) < g.speed + 0.5 &&
      Math.abs(g.y - cy) < g.speed + 0.5;

    // Only make a direction decision once per tile
    if (atCenter && (gc !== g.lastDecTileC || gr !== g.lastDecTileR)) {
      g.x = cx;
      g.y = cy;
      g.lastDecTileC = gc;
      g.lastDecTileR = gr;
      chooseGhostDir(g, gc, gr);
    }

    // Move in current direction
    const v = dirVec[g.dir];
    const nx = wrap(g.x + v.x * g.speed, COLS * TILE);
    const ny = g.y + v.y * g.speed;
    const ntc = toTile(nx);
    const ntr = toTile(ny);

    // Wall collision (ghost-house-aware)
    const blocked = ntr < 0 || ntr >= ROWS || ghostBlocked(ntc, ntr, isInHouse);
    if (!blocked) {
      g.x = nx;
      g.y = ny;
    } else {
      // Hit a wall — snap to center and force re-decision next frame
      g.x = cx;
      g.y = cy;
      g.lastDecTileC = -1;
      g.lastDecTileR = -1;
    }
  }

  // ─── ROSE & HEARTS ────────────────────────────────────────
  function spawnRose() {
    const empties = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (maze[r][c] === 0 || maze[r][c] === 2) empties.push({ c, r });
    if (empties.length === 0) return;
    const spot = empties[Math.floor(Math.random() * empties.length)];
    rose = { x: spot.c * TILE + TILE / 2, y: spot.r * TILE + TILE / 2 };
  }

  function shootHeart() {
    hearts.push({ x: pacman.x, y: pacman.y, dir: pacman.dir });
  }

  // ─── LIFE / GAME-OVER / WIN ───────────────────────────────
  function loseLife() {
    lives--;
    if (lives <= 0) {
      gameOver();
      return;
    }
    // reset positions
    resetPositions();
  }

  function resetPositions() {
    const pc = tileCenter(14, 16);
    pacman.x = pc.x; pacman.y = pc.y;
    pacman.dir = "left"; pacman.nextDir = "left";
    pacman.powered = false; powerTimer = 0;
    hearts = [];

    ghosts.forEach(g => {
      const p = tileCenter(g.startCol, g.startRow);
      g.x = p.x; g.y = p.y; g.dir = "up"; g.dead = false;
      g.lastDecTileC = -1; g.lastDecTileR = -1;
    });
    updateHUD();
  }

  function gameOver() {
    running = false;
    cancelAnimationFrame(animId);
    $("finalScore").textContent = `Score: ${score}`;
    showScreen(overScreen);
  }

  function victory() {
    running = false;
    cancelAnimationFrame(animId);
    $("winScore").textContent = `Score: ${score}`;
    showScreen(winScreen);
  }

  // ─── GAME LOOP ────────────────────────────────────────────
  function gameLoop(timestamp) {
    if (!running) return;
    const dt = lastTime ? (timestamp - lastTime) / 1000 : 1 / FPS;
    lastTime = timestamp;

    update(Math.min(dt, 0.05)); // cap dt
    draw();
    animId = requestAnimationFrame(gameLoop);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawRose();
    drawHearts();
    drawPacman();
    ghosts.forEach(drawGhost);
  }

  // ─── SCREEN MANAGEMENT ───────────────────────────────────
  function showScreen(el) {
    [startScreen, gameScreen, overScreen, winScreen].forEach(s => s.classList.add("hidden"));
    el.classList.remove("hidden");
  }

  function startGame() {
    initGame();
    showScreen(gameScreen);
    running = true;
    lastTime = null;
    animId = requestAnimationFrame(gameLoop);
  }

  // ─── INPUT ────────────────────────────────────────────────
  const keyMap = {
    ArrowLeft: "left", a: "left",
    ArrowRight: "right", d: "right",
    ArrowUp: "up", w: "up",
    ArrowDown: "down", s: "down",
  };

  document.addEventListener("keydown", e => {
    const dir = keyMap[e.key];
    if (dir) {
      e.preventDefault();
      pacman.nextDir = dir;
    }
  });

  // ─── BUTTONS ──────────────────────────────────────────────
  $("startBtn").addEventListener("click", startGame);
  $("restartBtn").addEventListener("click", startGame);
  $("winRestartBtn").addEventListener("click", startGame);
})();
