# Purple Maiʻa Project: Kōnane

## Core Learnings & Goals
- NextJS Basics
- Components, props, state, hooks (useState, useEffect).
- Project structure (pages/, app/, components/)	


## Typescript Functions
- Type-safety
- imports/exports etc.


## User Interaction
- Click pieces to select.
- Highlight valid moves.
- Switch turns between players.


## Game Logic
- Implement legal jumps + capture pieces.
- Update board after movesg.
- End game when no moves remain.


## UI & Feedback
- Show current player.
- Highlight moves.
- Display winner/game over.


## Styling & Deployment
- Grid-based CSS/Tailwind layout.
- Deploy to Netlify/Vercel/GitHub Pages.

## Konane Rules
### Board & setup
- Use a rectangular grid (common: 6×6, 8×8, 10×10; larger is fine). Fill every square in a checkerboard pattern with two colors (traditionally black lava vs white coral).
- Black starts by removing one black stone from the center or a corner (traditionally). White then removes one white stone that’s orthogonally adjacent to the empty space that Black just made. After these two removals, normal play begins.
### Turns & movement (captures only)
- Every move is a capture. There are no “slides.” If you can’t capture on your turn, you lose. (Last player to make a legal capture wins.) 
- Capturing = hop orthogonally (in a way that is at right angles to something else) over one adjacent opponent piece into the immediately empty square beyond it, removing the jumped piece. No diagonals.
- Multiple jumps with the same piece in a single turn are allowed but only in the same straight line (no turning corners). Stopping early is allowed; continuing is optional. 
- That’s it—no kings, no promotion, no zones, no scoring; just blocking your opponent until they have no capture.
