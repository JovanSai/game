// import { useEffect, useState } from 'react';
// import './roundscorecard.css';



// import { useNavigate, useLocation } from "react-router-dom";


// export default function RoundScoreCard() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const currentRound = location.state?.roundIndex ?? 0;


//   const finalScore = location.state?.score || 0;  // ✅ CHANGE THIS

//   const [score, setScore] = useState(0);
//   const [ringFill, setRingFill] = useState(0);

//   const circumference = 2 * Math.PI * 140; // radius 140px

//   useEffect(() => {
//     // Animate ring fill
//     const ringInterval = setInterval(() => {
//       setRingFill(prev => {
//         if (prev >= 100) {
//           clearInterval(ringInterval);
//           return 100;
//         }
//         return prev + 2;
//       });
//     }, 30);

//     return () => clearInterval(ringInterval);
//   }, []);

//   const handleNextRound = () => {
//   navigate("/grid", {
//     state: {
//       roundIndex: currentRound + 1
//     }
//   });
// };
// const handleExit = () => {
//   navigate("/landing");
// };

// const handleShare = () => {
//   const filledCells = location.state?.filledCells || [];
//   const blackCells = location.state?.blackCells || [];

//   let output = "🧩 My Crossword Result:\n\n";

//   for (let i = 1; i <= 81; i++) {
//     if (blackCells.includes(i)) {
//       output += "⬛";
//     } else if (filledCells.includes(i)) {
//       output += "🟦";
//     } else {
//       output += "⬜";
//     }

//     if (i % 9 === 0) output += "\n";
//   }

//   navigator.clipboard.writeText(output)
//     .then(() => alert("Copied to clipboard! You can paste it anywhere to share."))
//     .catch(() => alert("Copy failed. Please try again."));
// };



//   useEffect(() => {
//     // Animate score count
//     const scoreInterval = setInterval(() => {
//       setScore(prev => {
//         if (prev >= finalScore) {
//           clearInterval(scoreInterval);
//           return finalScore;
//         }
//         return prev + finalScore / 50;
//       });
//     }, 30);

//     return () => clearInterval(scoreInterval);
//   }, []);

//   const strokeDashOffset = circumference - (ringFill / 100) * circumference;

//   return (
//     <div className="round-score-card">
//       <h1 className="score-heading">FINAL SCORE</h1>

//       <div className="score-container">
//         <svg className="score-ring" width="300" height="300" viewBox="0 0 300 300">
//           {/* Background circle */}
//           <circle
//             cx="150"
//             cy="150"
//             r="140"
//             fill="none"
//             stroke="#E6ECF5"
//             strokeWidth="18"
//           />
//           {/* Animated ring */}
//           <circle
//             cx="150"
//             cy="150"
//             r="140"
//             fill="none"
//             stroke="url(#ringGradient)"
//             strokeWidth="18"
//             strokeDasharray={circumference}
//             strokeDashoffset={strokeDashOffset}
//             strokeLinecap="round"
//             className="score-ring-fill"
//           />
//           {/* Gradient definition */}
//           <defs>
//             <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#3377FF" />
//               <stop offset="100%" stopColor="#99BBFF" />
//             </linearGradient>
//           </defs>
//         </svg>

//         <div className="score-center">
//   <p className="score-label">OVERALL ACHIEVEMENT SCORE</p>
//   <p className="score-number">{Math.round(score)}</p>

//   <p
//     style={{
//       marginTop: "10px",
//       color: "#3377FF",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: "500"
//     }}
//     onClick={() =>
//       navigate("/score-details", {
//         state: {
//           score: finalScore,
//           correctWords: location.state?.correctWords,
//           timeRemaining: location.state?.timeRemaining
//         }
//       })
//     }
//   >
//     View Details
//   </p>
// </div>


//       </div>

//       <div className="button-group">
//        <button className="btn-primary" onClick={handleNextRound}>
//               Next Round
//             </button>

//         <button className="btn-secondary" onClick={handleExit}>
//                     Exit
//                   </button>
//         <button className="btn-secondary" onClick={handleShare}>
//              Share
//         </button>

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./scorecard.css";

export default function RoundScoreCard() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentRound = location.state?.roundIndex ?? 0;
  const finalScore = location.state?.score || 0;
  const correctWords = location.state?.correctWords || 0;
  const timeRemaining = location.state?.timeRemaining || 0;

  // You can tune these later
  const timeBonus = timeRemaining;
  const accuracyScore = correctWords * 10;
  const overallScore = finalScore;

  const [displayedTime, setDisplayedTime] = useState(0);
  const [displayedAccuracy, setDisplayedAccuracy] = useState(0);
  const [displayedOverall, setDisplayedOverall] = useState(0);

  useEffect(() => {
    const animate = (end, setter) => {
      let current = 0;
      const increment = end / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 20);
    };

    animate(timeBonus, setDisplayedTime);
    animate(accuracyScore, setDisplayedAccuracy);
    animate(overallScore, setDisplayedOverall);
  }, [timeBonus, accuracyScore, overallScore]);

  const handleNextRound = () => {
    navigate("/grid", { state: { roundIndex: currentRound + 1 } });
  };

  const handleExit = () => {
    navigate("/landing");
  };

  const handleShare = () => {
    const filledCells = location.state?.filledCells || [];
    const blackCells = location.state?.blackCells || [];

    let output = "🧩 My Crossword Result:\n\n";

    for (let i = 1; i <= 81; i++) {
      if (blackCells.includes(i)) output += "⬛";
      else if (filledCells.includes(i)) output += "🟦";
      else output += "⬜";
      if (i % 9 === 0) output += "\n";
    }

    navigator.clipboard.writeText(output)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => alert("Copy failed"));
  };

  // Pie chart math (same as design file)
  const total = timeBonus + accuracyScore || 1;
  const timeAngle = (timeBonus / total) * 360;

  const createSlice = (startAngle, endAngle, color) => {
    const radius = 80;
    const cx = 100;
    const cy = 100;
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(start);
    const y1 = cy + radius * Math.sin(start);
    const x2 = cx + radius * Math.cos(end);
    const y2 = cy + radius * Math.sin(end);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return <path d={d} fill={color} />;
  };

  return (
    <div className="scorecard-page">
      <div className="scorecard">
        <h1 className="heading">Score Card</h1>

        <div className="scores">
          <div className="score-item">
            <span className="label">Time Efficiency Bonus</span>
            <span className="value">{displayedTime}</span>
          </div>
          <div className="score-item">
            <span className="label">Accuracy Rating</span>
            <span className="value">{displayedAccuracy}</span>
          </div>
          <div className="score-item overall">
            <span className="label">Overall Achievement Score</span>
            <span className="value">{displayedOverall}</span>
          </div>
        </div>

        <div className="chart">
       <svg width="200" height="200" viewBox="0 0 200 200">
    {/* Background ring */}
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="#E6ECF5"
      strokeWidth="18"
    />

    {/* Time Bonus */}
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="#3377FF"
      strokeWidth="18"
      strokeDasharray={`${(timeBonus / total) * 2 * Math.PI * 80} ${2 * Math.PI * 80}`}
      strokeLinecap="round"
      transform="rotate(-90 100 100)"
    />

    {/* Accuracy */}
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="#06C270"
      strokeWidth="18"
      strokeDasharray={`${(accuracyScore / total) * 2 * Math.PI * 80} ${2 * Math.PI * 80}`}
      strokeDashoffset={`-${(timeBonus / total) * 2 * Math.PI * 80}`}
      strokeLinecap="round"
      transform="rotate(-90 100 100)"
    />

    {/* Center score */}
    <text x="100" y="108" textAnchor="middle" className="chart-score">
      {displayedOverall}
    </text>
  </svg>

  <div className="legend">
    <div className="legend-item">
      <span className="legend-color" style={{ background: "#3377FF" }}></span>
      <span>Time Bonus</span>
    </div>
    <div className="legend-item">
      <span className="legend-color" style={{ background: "#06C270" }}></span>
      <span>Accuracy</span>
    </div>
  </div>
</div>


        <div className="buttons">
          <button className="primary" onClick={handleNextRound}>Next Round</button>
          <button className="secondary" onClick={handleExit}>Exit</button>
          <button className="secondary" onClick={handleShare}>Share</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <span
            style={{ cursor: "pointer", color: "#3377FF", fontWeight: 600 }}
            onClick={() =>
              navigate("/score-details", {
                state: { correctWords, timeBonus, accuracyScore, overallScore }
              })
            }
          >
            View Details
          </span>
        </div>
      </div>
    </div>
  );
}
