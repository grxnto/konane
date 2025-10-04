import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const rulesContent = (
    <div className="text-sm text-gray-700 space-y-2">
      <p className="font-semibold">How to Play Kōnane:</p>
      <ul className="list-disc list-inside space-y-1 text-xs">
        <li>Players alternate turns moving their pieces</li>
        <li>You can only move by jumping over an opponent's piece</li>
        <li>Jumped pieces are removed from the board</li>
        <li>You must jump if a jump is available</li>
        <li>Multiple jumps in one turn are allowed</li>
        <li>The player who cannot move loses</li>
      </ul>
    </div>
  );

  const learnContent = (
    <div className="text-sm text-gray-700 space-y-2">
      <p className="font-semibold">History of Kōnane:</p>
      <p className="text-xs leading-relaxed">
        Kōnane is an ancient Hawaiian strategy game, also known as Hawaiian Checkers. 
        It was traditionally played by Hawaiian ali'i (royalty) and was considered 
        a game of skill and strategy. The game was played on various board sizes, 
        with the most common being 8x8 or 10x10 grids.
      </p>
      <p className="text-xs leading-relaxed">
        The name "Kōnane" comes from the Hawaiian word meaning "bright moonlight," 
        as the game was often played during bright moonlit nights.
      </p>
    </div>
  );

  return (
    <header className="bg-gray-800 text-white">
      <div className="p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">Kōnane</h1>
          
          <div className="flex space-x-4">
            <button
              onClick={() => toggleDropdown('rules')}
              className="flex items-center space-x-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
            >
              <span>Rules</span>
              <motion.div
                animate={{ rotate: activeDropdown === 'rules' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>
            
            <button
              onClick={() => toggleDropdown('learn')}
              className="flex items-center space-x-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200"
            >
              <span>Learn</span>
              <motion.div
                animate={{ rotate: activeDropdown === 'learn' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Full-width dropdown content */}
      <AnimatePresence>
        {activeDropdown === 'rules' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-gray-700 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto p-6">
              <div className="bg-white rounded-lg p-6 text-gray-800">
                {rulesContent}
              </div>
            </div>
          </motion.div>
        )}
        {activeDropdown === 'learn' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-gray-700 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto p-6">
              <div className="bg-white rounded-lg p-6 text-gray-800">
                {learnContent}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Backdrop to close dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  );
};

export default Header;