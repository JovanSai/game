import { useNavigate } from 'react-router-dom';
import './CrosswordLanding.css';

function CrosswordLanding() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/grid');
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Crossword</h1>
        <p className="subtitle">Classic puzzle game</p>

        <div className="section">
          <h4>How to Play:</h4>
          <ul>
            <li>Fill the 9×9 grid using clues</li>
            <li>Words intersect and share letters</li>
            <li>Click cells to select, type to fill</li>
            <li>Use pencil mode for notes</li>
          </ul>
        </div>

        <div className="section">
          <h4>Scoring:</h4>
          <ul>
            <li>+1 point per correct word</li>
            <li>+0.1 points per second remaining</li>
            <li>No negative marking</li>
          </ul>
        </div>

        <button className="start-btn" onClick={handleStartGame}>
          ▶ Start Game
        </button>
      </div>
    </div>
  );
}

export default CrosswordLanding;
