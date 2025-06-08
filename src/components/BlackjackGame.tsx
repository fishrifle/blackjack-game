import { useState } from "react";
import { Heart, Diamond, Club, Spade } from "lucide-react";

type Suit = "Hearts" | "Diamonds" | "Clubs" | "Spades";
type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

interface Card {
  suit: Suit;
  rank: Rank;
}

const suits: Suit[] = ["Hearts", "Diamonds", "Clubs", "Spades"];
const ranks: Rank[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const createDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  return deck;
};

const shuffleDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const calculateScore = (hand: Card[]): number => {
  let score = 0;
  let aces = 0;

  for (const card of hand) {
    if (card.rank === "A") {
      aces++;
      score += 11;
    } else if (["J", "Q", "K"].includes(card.rank)) {
      score += 10;
    } else {
      score += parseInt(card.rank, 10);
    }
  }

  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
};

const getSuitIcon = (suit: Suit) => {
  switch (suit) {
    case "Hearts":
      return <Heart className="w-6 h-6 text-red-500 fill-current" />;
    case "Diamonds":
      return <Diamond className="w-6 h-6 text-red-500 fill-red-500" />;
    case "Clubs":
      return <Club className="w-6 h-6 text-black fill-current" />;
    case "Spades":
      return <Spade className="w-6 h-6 text-black fill-current" />;
    default:
      return null;
  }
};

const BlackjackGame = () => {
  const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameMessage, setGameMessage] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  

const dealCard = (currentDeck: Card[]): Card => {
  const card = currentDeck[0];
  setDeck((prevDeck) => prevDeck.slice(1));
  return card;
};

 const startNewGame = () => {
   const newDeck = shuffleDeck(createDeck());
   setDeck(newDeck);
   const initialPlayerHand = [newDeck[0], newDeck[1]];
   const initialDealerHand = [newDeck[2], newDeck[3]];
   setPlayerHand(initialPlayerHand);
   setDealerHand(initialDealerHand);
   setDeck(newDeck.slice(4)); // Remove the dealt cards from the deck
   setGameMessage("");
   setIsGameOver(false);
 };

  const hit = () => {
    const newPlayerHand = [...playerHand, dealCard(deck)];
    setPlayerHand(newPlayerHand);
    const playerScore = calculateScore(newPlayerHand);
    if (playerScore > 21) {
      setGameMessage("You bust! Dealer wins.");
      setIsGameOver(true);
    }
  };

 const stand = () => {
   let dealerScore = calculateScore(dealerHand);
   let newDealerHand = [...dealerHand];

   while (dealerScore < 17) {
     const card = dealCard(deck);
     newDealerHand = [...newDealerHand, card];
     dealerScore = calculateScore(newDealerHand);
   }
setDealerHand(newDealerHand);


   const playerScore = calculateScore(playerHand);
   if (dealerScore > 21) {
     setGameMessage("Dealer busts! You win.");
   } else if (playerScore > dealerScore) {
     setGameMessage("You win!");
   } else if (playerScore < dealerScore) {
     setGameMessage("Dealer wins.");
   } else {
     setGameMessage("It's a tie!");
   }
   setIsGameOver(true);
 };

  const doubleDown = () => {
    if (isGameOver) return; // Prevent action if the game is over

    // Player receives one more card
    const newPlayerHand = [...playerHand, dealCard(deck)];
    setPlayerHand(newPlayerHand);

    // Calculate player's score
    const playerScore = calculateScore(newPlayerHand);

    // Check if player busts
    if (playerScore > 21) {
      setGameMessage("You bust! Dealer wins.");
      setIsGameOver(true);
      return;
    }

    // Automatically stand after doubling down
    stand();
  };

  const renderCard = (card: Card) => {
    const cardColor =
      card.suit === "Hearts" || card.suit === "Diamonds"
        ? "text-red-500"
        : "text-black";
    return (
      <div className="bg-white border-2 border-gray-300 rounded-xl w-16 h-16 flex items-center justify-center flex-col">
        <span className={cardColor}>{card.rank}</span>
        {getSuitIcon(card.suit)}
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-2xl font-bold text-primary mb-6">Blackjack Game</h1>
   <div className="mb-4">
  <h2 className="text-lg font-bold text-gray-700">Dealer Hand</h2>
  <div className="flex space-x-2">
    {dealerHand.map((card, index) => (
      <div key={index}>
        {isGameOver || index === 0 ? renderCard(card) : <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16"></div>}
      </div>
    ))}
  </div>
  {isGameOver && <p className="mt-2 text-gray-600">Score: {calculateScore(dealerHand)}</p>}
</div>

<div>  
        
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-700">Player Hand</h2>
        <div className="flex space-x-2">
          {playerHand.map((card, index) => (
            <div key={index}>{renderCard(card)}</div>
          ))}
        </div>
        <p className="mt-2 text-gray-600">
          Score: {calculateScore(playerHand)}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-700">Game Message</h2>
        <p className="text-gray-600">{gameMessage}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={startNewGame}
          // disabled={isGameOver}
          className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          New Game
        </button>
        <button
          onClick={hit}
          disabled={isGameOver}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Hit
        </button>
        <button
          onClick={stand}
          disabled={isGameOver}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Stand
        </button>
        <button
          onClick={doubleDown}
          disabled={isGameOver}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Double Down
        </button>
      </div>
    </div>
  );
};

export default BlackjackGame;
