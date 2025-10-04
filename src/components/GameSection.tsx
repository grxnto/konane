import React from 'react';
import { motion } from 'framer-motion';
import GameBoard from './GameBoard';
import { GameState, Position, Player } from '../types/game';

interface GameSectionProps {
  gameState: GameState;
  onPieceClick: (position: Position) => void;
  onNewGame: () => void;
}

const GameSection: React.FC<GameSectionProps> = ({ gameState, onPieceClick, onNewGame }) => {
  const getCurrentPlayerColor = () => {
    return gameState.currentPlayer === 'black' ? 'text-gray-900' : 'text-gray-600';
  };

  const getCurrentPlayerName = () => {
    return gameState.currentPlayer === 'black' ? 'Black' : 'White';
  };

  return (
    <motion.section
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <motion.h2
          className="text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Kōnane
        </motion.h2>
        
        <motion.button
          onClick={onNewGame}
          className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          New Game
        </motion.button>
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <GameBoard 
          gameState={gameState}
          onPieceClick={onPieceClick}
          size="full"
        />
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {gameState.phase === 'setup' && (
          <div className="bg-white p-4 rounded-xl">
            <p className="text-lg text-gray-700">Setup Phase: Each player removes one piece</p>
            <p className={`text-xl font-bold ${getCurrentPlayerColor()}`}>
              {getCurrentPlayerName()} - Click a piece to remove it ({2 - gameState.removedPieces} remaining)
            </p>
          </div>
        )}
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {gameState.phase === 'finished' && gameState.winner ? (
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Game Over!</h3>
            <p className={`text-xl font-semibold ${gameState.winner === 'black' ? 'text-gray-900' : 'text-gray-600'}`}>
              {gameState.winner === 'black' ? 'Black' : 'White'} Wins!
            </p>
          </motion.div>
        ) : gameState.phase === 'playing' && (
          <motion.div
            className="bg-white p-4 rounded-xl shadow-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="text-lg text-gray-700">Current Turn:</p>
            <p className={`text-2xl font-bold ${getCurrentPlayerColor()}`}>
              {getCurrentPlayerName()}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default GameSection;