"use client"
import Card from "@/components/card";
import { generateDeck } from "@/utils/generateDeck";

const DeckDisplay = () => {
    const deck = generateDeck();
  
    return (
      <div className="flex flex-wrap gap-2 p-4">
        {deck.map((card, index) => (
          <Card 
            key={index} 
            suit={card.suit} 
            value={card.value} 
            onClick={() => console.log(`Clicked ${card.value} of ${card.suit}`)} 
          />
        ))}
      </div>
    );
  };
  
  export default DeckDisplay;