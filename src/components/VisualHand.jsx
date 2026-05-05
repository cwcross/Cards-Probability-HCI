function VisualHand({ hand }) {
  // Fan out the cards like a real hand
  const getCardStyle = (index, total) => {
    // Creates a fan effect
    const fanAngle = 15; // degrees
    const offset = (index - (total - 1) / 2) * fanAngle;
    const translateX = (index - (total - 1) / 2) * 3;
    const translateY = Math.abs(index - (total - 1) / 2) * -2;
    
    return {
      transform: `rotate(${offset}deg) translateX(${translateX}px) translateY(${translateY}px)`,
      zIndex: index,
      left: `${50 + (index - (total - 1) / 2) * 8}%`,
      position: 'relative'
    };
  };

  const getDisplayValue = (card) => {
    const mapping = {
      'f3': 'F3', '2c': '2C', '+x': '+X', 'x2': '×2', 'fr': 'FR',
      '10': '10', 'J': 'J', 'Q': 'Q', 'K': 'K', 'A': 'A'
    };
    return mapping[card] || card;
  };

  if (hand.length === 0) {
    return (
      <div className="empty-hand-visual">
        <div className="card-placeholder">🎴</div>
        <p>Your hand is empty. Select cards from below!</p>
      </div>
    );
  }

  return (
    <div className="visual-hand-container">
      <div className="hand-fan">
        {hand.map((card, index) => (
          <div 
            key={index} 
            className="hand-card"
            style={getCardStyle(index, hand.length)}
          >
            <div className="hand-card-inner">
              <div className="hand-card-value">{getDisplayValue(card)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisualHand;