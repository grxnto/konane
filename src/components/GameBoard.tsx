import React from 'react';
import { motion } from 'framer-motion';
import { GameState, Position, Player } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
  onPieceClick: (position: Position) => void;
  size?: 'preview' | 'full';
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, onPieceClick, size = 'full' }) => {
  const boardSize = size === 'preview' ? 'w-64 h-64' : 'w-96 h-96';
  const cellSize = size === 'preview' ? 'w-8 h-8' : 'w-12 h-12';
  
  const isValidMove = (position: Position) => {
    return gameState.validMoves.some(
      move => move.row === position.row && move.col === position.col
    );
  };

  const isSelected = (position: Position) => {
    return gameState.selectedPiece?.row === position.row && 
           gameState.selectedPiece?.col === position.col;
  };

  const renderPiece = (piece: Player | null, position: Position) => {
    if (!piece) return null;
    
    return (
      <motion.div
        key={`${position.row}-${position.col}-${piece}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        whileHover={gameState.phase === 'playing' ? { scale: 1.1 } : {}}
        className={`w-full h-full rounded-full border-2 cursor-pointer transition-all duration-200 ${
          piece === 'black' 
            ? 'bg-gray-800 border-gray-600' 
            : 'bg-gray-200 border-gray-400'
        } ${
          isSelected(position) ? 'ring-4 ring-gray-500' : ''
        } ${
          gameState.phase === 'setup' && !gameState.selectedPiece ? 'hover:ring-2 hover:ring-gray-400' : ''
        }`}
        onClick={() => onPieceClick(position)}
      />
    );
  };

  return (
    <div className={`${boardSize} bg-gray-300 p-2 rounded-xl`}>
      <div className="w-full h-full grid grid-cols-8 gap-1 bg-gray-400 p-2 rounded-lg">
        {gameState.board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const position = { row: rowIndex, col: colIndex };
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const canMove = isValidMove(position);
            
            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={`${cellSize} ${
                  isLight ? 'bg-gray-100' : 'bg-gray-200'
                } ${
                  canMove ? 'bg-gray-400' : ''
                } rounded-sm border border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200`}
                onClick={() => onPieceClick(position)}
                whileHover={canMove ? { scale: 1.05 } : {}}
              >
                {renderPiece(piece, position)}
                {canMove && !piece && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 bg-gray-600 rounded-full opacity-80"
                  />
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GameBoard;