import { useLocation, useNavigate } from "react-router-dom";
import "./scoredetails.css";

export default function ScoreDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const correctWords = location.state?.correctWords || 0;
  const timeBonus = location.state?.timeBonus || 0;
  const accuracyScore = location.state?.accuracyScore || 0;
  const overallScore = location.state?.overallScore || 0;

  return (
    <div className="scoredetails-page">
      <div className="scoredetails">
        <h1 className="heading">Score Details</h1>

        <div className="details-scores">
          <div className="detail-item">
            <span className="label">Correct Answers</span>
            <span className="value">{correctWords}</span>
          </div>

          <div className="detail-item">
            <span className="label">Time Efficiency Bonus</span>
            <span className="value">{timeBonus}</span>
          </div>

          <div className="detail-item">
            <span className="label">Accuracy Rating</span>
            <span className="value">{accuracyScore}</span>
          </div>

          <div className="detail-item overall">
            <span className="label">Overall Achievement Score</span>
            <span className="value">{overallScore}</span>
          </div>
        </div>

        <div className="buttons">
          <button className="primary" onClick={() => navigate(-1)}>
            Back to Score Card
          </button>
        </div>
      </div>
    </div>
  );
}
