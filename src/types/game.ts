export type Player = 'black' | 'white';
export type PieceType = Player | null;
export type GamePhase = 'setup' | 'playing' | 'finished';

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  board: PieceType[][];
  currentPlayer: Player;
  selectedPiece: Position | null;
  validMoves: Position[];
  gameStarted: boolean;
  winner: Player | null;
  phase: GamePhase;
  removedPieces: number;
}