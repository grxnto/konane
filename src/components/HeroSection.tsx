import React from 'react';
import { motion } from 'framer-motion';
import GameBoard from './GameBoard';
import { GameState, Position } from '../types/game';

interface HeroSectionProps {
  onStartGame: () => void;
  previewGameState: GameState;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartGame, previewGameState }) => {
  const dummyPieceClick = (position: Position) => {
    // No-op for preview board
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Play Digital{' '}
            <span className="text-gray-700">
              Hawaiian Checkers
            </span>
            : Kōnane
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the ancient Hawaiian strategy game loved by royalty. 
            Test your skills in this beautiful digital adaptation.
          </motion.p>
          
          <motion.button
            onClick={onStartGame}
            className="px-8 py-4 bg-gray-800 text-white text-xl font-semibold rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Play
          </motion.button>
        </motion.div>
        
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            <GameBoard 
              gameState={previewGameState}
              onPieceClick={dummyPieceClick}
              size="preview"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;