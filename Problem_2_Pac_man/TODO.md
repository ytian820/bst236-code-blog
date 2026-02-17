# Pac-Man Game (Valentine's Special) - Implementation Plan

## 1. Project Setup
- [x] Create basic file structure:
    - `pacman.html`: Main game page.
    - `style.css`: Styling for the game container and UI.
    - `game.js`: Main game logic.
- [x] Set up the HTML canvas and game loop in `game.js`.

## 2. Core Game Mechanics
- [x] **Maze Generation**:
    - Design a 2D grid-based map layout (using a 2D array: 0=dot, 1=wall, 2=empty, etc.).
    - Render walls and background.
- [x] **Pac-Man**:
    - Implement movement (arrow keys).
    - Implement collision with walls.
    - Implement eating dots (score increase).
    - Implement screen wrapping (teleport from left to right edge).
- [x] **Ghosts**:
    - Create basic ghost class (Red, Pink, Cyan, Orange).
    - Implement simple chase logic (move towards Pac-Man or random valid moves).
    - Handle collision with Pac-Man (loss of life or game over).

## 3. Valentine's Special Features
- [x] **Rose Power-Up** 🌹:
    - Spawn logic: Randomly appear in empty spots at intervals.
    - Visual: Draw a rose emoji or sprite.
    - Collection effect: Switch game state to "Powered Up".
- [x] **Heart Shooting Mechanic** 💕:
    - While powered up, Pac-Man automatically shoots hearts in facing direction.
    - **Projectile Logic**: Hearts travel until they hit a wall or ghost.
- [x] **Ghost Elimination**:
    - Collision detection between Hearts and Ghosts.
    - Ghost "death" animation/respawn logic.
    - Score bonus for shooting ghosts.

## 4. Game UI & Polish
- [x] **HUD**: Display Score, Lives, and "Valentine's Mode" timer.
- [x] **Game States**: Start Screen, Playing, Game Over, Victory.
- [x] **Visuals**:
    - Use Valentine's colors (pinks, reds, purples).
    - Custom sprite drawing (or simple canvas shapes) for Pac-Man and Ghosts.
- [ ] **Mobile Responsiveness** (Optional): Ensure canvas scales or has controls.

## 5. Integration
- [x] Link `pacman.html` from `Problem_1_Github_website/index.html`.
- [x] Add "Back to Home" link on the game page.

## NB: Implementation Notes
- Use standard HTML5 Canvas API.
- Keep logic in `game.js` for modularity.
- Ensure the game loop uses `requestAnimationFrame`.
