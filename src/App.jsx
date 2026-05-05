import { useState } from 'react';
import { startNewGame, drawCard, resetGame } from './services/api';
import MobileLayout from './components/MobileLayout';
import VisualInterface from './components/VisualInterface';
import './App.css';

function App() {
  const [interfaceType, setInterfaceType] = useState('desktop'); // 'desktop', 'mobile', or 'visual'
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
    try {
      const result = await drawCard(card);
      setHand(result.hand || []);
      setBustProb(result.bust_probability || 0);
    } catch (error) {
      console.error('Error drawing card:', error);
      alert('Failed to draw card. Make sure Flask backend is running on port 5000');
    }
    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    await resetGame();
    setHand([]);
    setBustProb(0);
    setLoading(false);
  };

  const handleChangeGame = () => {
    setGameType(null);
    setHand([]);
    setBustProb(0);
  };

  const flip7Cards = ['0','1','2','3','4','5','6','7','8','9','10','11','12','f3','2c','+x','x2','fr'];
  const blackjackCards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

  // ========== GAME SELECTOR SCREEN (shown before game is chosen) ==========
  if (!gameType) {
    return (
      <div className="game-selector">
        <h1>🎴 Card Game Probability Calculator</h1>
        
        {/* Interface Switcher - Choose which UI to use */}
        <div className="interface-switcher">
          <button 
            className={interfaceType === 'desktop' ? 'active' : ''} 
            onClick={() => setInterfaceType('desktop')}
          >
            🖥️ Desktop View
          </button>
          <button 
            className={interfaceType === 'mobile' ? 'active' : ''} 
            onClick={() => setInterfaceType('mobile')}
          >
            📱 Mobile View
          </button>
          <button 
            className={interfaceType === 'visual' ? 'active' : ''} 
            onClick={() => setInterfaceType('visual')}
          >
            🃏 Visual Cards View
          </button>
        </div>
        
        <div className="game-buttons">
          <button onClick={() => startGame('flip7')}>🃟 Play Flip7</button>
          <button onClick={() => startGame('blackjack')}>♠️ Play Blackjack</button>
        </div>
      </div>
    );
  }

  // ========== DESKTOP INTERFACE ==========
  if (interfaceType === 'desktop') {
    const cards = gameType === 'flip7' ? flip7Cards : blackjackCards;
    return (
      <div className="game-container">
        <div className="interface-indicator">
          <span>🖥️ Desktop Interface</span>
          <button onClick={() => setInterfaceType('mobile')}>Switch to Mobile</button>
          <button onClick={() => setInterfaceType('visual')}>Switch to Visual Cards</button>
        </div>
        
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
          {cards.map(card => (
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
          <button onClick={handleChangeGame}>Change Game</button>
        </div>

        {loading && <p>Loading...</p>}
      </div>
    );
  }

  // ========== MOBILE INTERFACE (Bottom Sheet) ==========
  if (interfaceType === 'mobile') {
    return (
      <MobileLayout
        gameType={gameType}
        hand={hand}
        bustProb={bustProb}
        loading={loading}
        onDrawCard={handleDrawCard}
        onReset={handleReset}
        onChangeGame={handleChangeGame}
      />
    );
  }

  // ========== VISUAL CARDS INTERFACE (Fan Spread + Real Cards) ==========
  return (
    <VisualInterface
      gameType={gameType}
      hand={hand}
      bustProb={bustProb}
      loading={loading}
      onDrawCard={handleDrawCard}
      onReset={handleReset}
      onChangeGame={handleChangeGame}
    />
  );
}

export default App;