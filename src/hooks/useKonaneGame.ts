import { useState, useCallback } from 'react';
import { GameState, Position, Player, PieceType, GamePhase } from '../types/game';

const useKonaneGame = () => {
  const initializeBoard = (): PieceType[][] => {
    const board: PieceType[][] = [];
    for (let row = 0; row < 8; row++) {
      board[row] = [];
      for (let col = 0; col < 8; col++) {
        // Alternating pattern of pieces
        if ((row + col) % 2 === 0) {
          board[row][col] = 'black';
        } else {
          board[row][col] = 'white';
        }
      }
    }
    
    return board;
  };

  const [gameState, setGameState] = useState<GameState>({
    board: initializeBoard(),
    currentPlayer: 'black',
    selectedPiece: null,
    validMoves: [],
    gameStarted: false,
    winner: null,
    phase: 'setup' as GamePhase,
    removedPieces: 0,
  });

  const createPreviewBoard = (): PieceType[][] => {
    const board: PieceType[][] = [];
    for (let row = 0; row < 8; row++) {
      board[row] = [];
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 0) {
          board[row][col] = 'black';
        } else {
          board[row][col] = 'white';
        }
      }
    }
    return board;
  };

  const previewGameState: GameState = {
    board: createPreviewBoard(),
    currentPlayer: 'black',
    selectedPiece: null,
    validMoves: [],
    gameStarted: false,
    winner: null,
    phase: 'setup' as GamePhase,
    removedPieces: 0,
  };

  const isValidPosition = (row: number, col: number): boolean => {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  };

  const getValidMoves = (board: PieceType[][], position: Position, player: Player): Position[] => {
    const validMoves: Position[] = [];
    const directions = [
      { row: -1, col: 0 }, // up
      { row: 1, col: 0 },  // down
      { row: 0, col: -1 }, // left
      { row: 0, col: 1 },  // right
    ];

    for (const direction of directions) {
      let currentRow = position.row;
      let currentCol = position.col;
      let hasJumped = false;

      while (true) {
        currentRow += direction.row;
        currentCol += direction.col;

        if (!isValidPosition(currentRow, currentCol)) break;

        const currentCell = board[currentRow][currentCol];

        if (currentCell === null) {
          if (hasJumped) {
            validMoves.push({ row: currentRow, col: currentCol });
          }
          // Continue in the same direction to find more landing spots after a jump
        } else if (currentCell !== player && !hasJumped) {
          // Found an opponent piece to jump over
          hasJumped = true;
        } else {
          // Found a same-color piece or another opponent after jumping
          break;
        }
      }
    }

    return validMoves;
  };

  const getAllValidMovesForPlayer = (board: PieceType[][], player: Player): boolean => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === player) {
          const moves = getValidMoves(board, { row, col }, player);
          if (moves.length > 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const makeMove = (board: PieceType[][], from: Position, to: Position, player: Player): PieceType[][] => {
    const newBoard = board.map(row => [...row]);
    newBoard[to.row][to.col] = player;
    newBoard[from.row][from.col] = null;

    // Remove jumped pieces
    const rowDirection = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
    const colDirection = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;

    let currentRow = from.row + rowDirection;
    let currentCol = from.col + colDirection;

    while (currentRow !== to.row || currentCol !== to.col) {
      if (newBoard[currentRow][currentCol] !== null && newBoard[currentRow][currentCol] !== player) {
        newBoard[currentRow][currentCol] = null;
      }
      currentRow += rowDirection;
      currentCol += colDirection;
    }

    return newBoard;
  };

  const handlePieceClick = useCallback((position: Position) => {
    if (gameState.winner) return;

    // Setup phase: players remove pieces
    if (gameState.phase === 'setup') {
      const piece = gameState.board[position.row][position.col];
      if (piece === gameState.currentPlayer) {
        const newBoard = gameState.board.map(row => [...row]);
        newBoard[position.row][position.col] = null;
        
        const newRemovedPieces = gameState.removedPieces + 1;
        const nextPlayer: Player = gameState.currentPlayer === 'black' ? 'white' : 'black';
        
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          currentPlayer: newRemovedPieces >= 2 ? 'black' : nextPlayer,
          removedPieces: newRemovedPieces,
          phase: newRemovedPieces >= 2 ? 'playing' : 'setup',
        }));
      }
      return;
    }

    // Playing phase: normal game moves
    const piece = gameState.board[position.row][position.col];

    if (gameState.selectedPiece === null) {
      // Selecting a piece
      if (piece === gameState.currentPlayer) {
        const validMoves = getValidMoves(gameState.board, position, gameState.currentPlayer);
        setGameState(prev => ({
          ...prev,
          selectedPiece: position,
          validMoves,
        }));
      }
    } else {
      // Already have a piece selected
      if (piece === gameState.currentPlayer) {
        // Selecting a different piece of the same color
        const validMoves = getValidMoves(gameState.board, position, gameState.currentPlayer);
        setGameState(prev => ({
          ...prev,
          selectedPiece: position,
          validMoves,
        }));
      } else {
        // Attempting to make a move
        const isValidMove = gameState.validMoves.some(
          move => move.row === position.row && move.col === position.col
        );

        if (isValidMove) {
          const newBoard = makeMove(
            gameState.board,
            gameState.selectedPiece,
            position,
            gameState.currentPlayer
          );

          const nextPlayer: Player = gameState.currentPlayer === 'black' ? 'white' : 'black';
          const canNextPlayerMove = getAllValidMovesForPlayer(newBoard, nextPlayer);

          setGameState(prev => ({
            ...prev,
            board: newBoard,
            currentPlayer: nextPlayer,
            selectedPiece: null,
            validMoves: [],
            winner: canNextPlayerMove ? null : prev.currentPlayer,
            phase: canNextPlayerMove ? 'playing' : 'finished',
          }));
        } else {
          // Invalid move, deselect
          setGameState(prev => ({
            ...prev,
            selectedPiece: null,
            validMoves: [],
          }));
        }
      }
    }
  }, [gameState]);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
    }));
  }, []);

  const newGame = useCallback(() => {
    setGameState({
      board: initializeBoard(),
      currentPlayer: 'black',
      selectedPiece: null,
      validMoves: [],
      gameStarted: true,
      winner: null,
      phase: 'setup',
      removedPieces: 0,
    });
  }, []);

  return {
    gameState,
    previewGameState,
    handlePieceClick,
    startGame,
    newGame,
  };
};

export default useKonaneGame;