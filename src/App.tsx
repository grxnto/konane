import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import GameSection from './components/GameSection';
import useKonaneGame from './hooks/useKonaneGame';

function App() {
  const { gameState, previewGameState, handlePieceClick, startGame, newGame } = useKonaneGame();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <AnimatePresence mode="wait">
        {!gameState.gameStarted ? (
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <HeroSection 
              onStartGame={startGame}
              previewGameState={previewGameState}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <GameSection
              gameState={gameState}
              onPieceClick={handlePieceClick}
              onNewGame={newGame}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;