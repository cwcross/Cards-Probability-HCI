import { useState } from 'react';
import { startNewGame, drawCard, resetGame, getGameState } from './services/api';
import './App.css';

function App() {
  const [gameType, setGameType] = useState(null);
  const [hand, setHand] = useState([]);
  const [bustProb, setBustProb] = useState(0);
  const [loading, setLoading] = useState(false);

  const startGame = async (type) => {
    setLoading(true);
    await startNewGame(type);
    setGameType(type);
    setHand([]);
    setBustProb(0);
    setLoading(false);
  };

  const handleDrawCard = async (card) => {
    setLoading(true);
    const result = await drawCard(card);
    setHand(result.hand);
    setBustProb(result.bust_probability);
    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    await resetGame();
    setHand([]);
    setBustProb(0);
    setLoading(false);
  };

  const flip7Cards = ['0','1','2','3','4','5','6','7','8','9','10','11','12','f3','2c','+x','x2','fr'];
  const blackjackCards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

  if (!gameType) {
    return (
      <div className="game-selector">
        <h1>Card Game Probability Calculator</h1>
        <button onClick={() => startGame('flip7')}>Play Flip7</button>
        <button onClick={() => startGame('blackjack')}>Play Blackjack</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>{gameType === 'flip7' ? 'Flip7' : 'Blackjack'}</h1>
      
      <div className="hand-display">
        <h2>Your Hand:</h2>
        <div className="cards">
          {hand.length === 0 ? (
            <p>No cards yet. Draw your first card!</p>
          ) : (
            hand.map((card, i) => (
              <span key={i} className="card">{card}</span>
            ))
          )}
        </div>
      </div>

      <div className="probability">
        <h3>Bust Probability on Next Draw:</h3>
        <div className="prob-value">{(bustProb * 100).toFixed(1)}%</div>
      </div>

      <div className="card-buttons">
        {(gameType === 'flip7' ? flip7Cards : blackjackCards).map(card => (
          <button 
            key={card} 
            onClick={() => handleDrawCard(card)}
            disabled={loading}
            className="card-btn"
          >
            {card}
          </button>
        ))}
      </div>

      <div className="controls">
        <button onClick={handleReset} disabled={loading}>Reset Game</button>
        <button onClick={() => setGameType(null)}>Change Game</button>
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;