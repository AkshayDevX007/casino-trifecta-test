import React from 'react';
import { motion } from 'framer-motion';

// Card component
const Card = ({ suit , value, onClick }: any) => {
  const getSuitSymbol = (suit: any) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return suit;
    }
  };

  const suitSymbol = getSuitSymbol(suit);
  const isRed = suit === 'hearts' || suit === 'diamonds';

  return (
    <motion.div 
      className={`card w-20 h-32 bg-white border border-gray-300 rounded-lg shadow-md flex flex-col justify-between p-2 ${isRed ? 'text-red-600' : 'text-black'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="text-left text-xl">{value}</div>
      <div className="text-center text-4xl">{suitSymbol}</div>
      <div className="text-left text-xl transform rotate-180">{value}</div>
    </motion.div>
  );
};

export default Card;
