import { useState } from 'react';
import './MobileLayout.css';

function MobileLayout({ gameType, hand, bustProb, loading, onDrawCard, onReset, onChangeGame }) {
  const [showBottomSheet, setShowBottomSheet] = useState(true);

  const flip7Cards = ['0','1','2','3','4','5','6','7','8','9','10','11','12','f3','2c','+x','x2','fr'];
  const blackjackCards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  const cards = gameType === 'flip7' ? flip7Cards : blackjackCards;

  return (
    <div className="mobile-layout">
      <header className="mobile-header">
        <h1>{gameType === 'flip7' ? 'Flip7' : 'Blackjack'}</h1>
        <div className="header-buttons">
          <button onClick={onReset} className="reset-btn">Reset</button>
          <button onClick={onChangeGame} className="change-btn">Change Game</button>
        </div>
      </header>

      <div className="hand-section">
        <h2>Your Hand</h2>
        <div className="hand-scroll">
          {hand.length === 0 ? (
            <p className="empty-hand">Tap a card to start</p>
          ) : (
            hand.map((card, i) => (
              <div key={i} className="mobile-card">{card}</div>
            ))
          )}
        </div>
      </div>

      <div className={`bottom-sheet ${showBottomSheet ? 'open' : ''}`}>
        <div className="sheet-handle" onClick={() => setShowBottomSheet(!showBottomSheet)}>
          <div className="handle-bar"></div>
        </div>
        <div className="sheet-content">
          <div className="probability-mobile">
            <span className="prob-label">Bust Probability</span>
            <span className="prob-value-mobile">{(bustProb * 100).toFixed(1)}%</span>
          </div>
          {loading && <div className="loading-spinner">Loading...</div>}
        </div>
      </div>

      <div className="card-grid-mobile">
        {cards.map(card => (
          <button
            key={card}
            onClick={() => onDrawCard(card)}
            disabled={loading}
            className="mobile-card-btn"
          >
            {card}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MobileLayout;