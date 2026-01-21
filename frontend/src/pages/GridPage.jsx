
import { useEffect, useState } from "react";
import "./GridPage.css";
import { useNavigate, useLocation } from "react-router-dom";


function GridPage() {
   const rounds = [101, 102, 103, 105, 106];
  const [activeCell, setActiveCell] = useState(null);
  const [highlightCells, setHighlightCells] = useState([]);

  const [puzzle, setPuzzle] = useState(null);
  const [grid, setGrid] = useState({});
  const [seconds, setSeconds] = useState(300); // 5 min timer
  const [pencil, setPencil] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const roundIndex = location.state?.roundIndex ?? 0;
  const puzzleId = rounds[roundIndex];




  useEffect(() => {
  fetch(`http://127.0.0.1:8000/api/crossword/puzzle/${puzzleId}`)
    .then(res => res.json())
    .then(data => setPuzzle(data));
}, [puzzleId]);


  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

const handleChange = (cell, value) => {
  if (!/^[A-Za-z]?$/.test(value)) return;

  setGrid(prev => ({
    ...prev,
    [cell]: {
      value: value.toUpperCase(),
      isPencil: pencil   // 👈 if pencil ON → true, else false
    }
  }));
};

  const getAcrossWordCells = (startCell, length) => {
  return Array.from({ length }, (_, i) => startCell + i);
};

const handleCellClick = (cell) => {
  setActiveCell(cell);

  // Find across clue that starts here OR contains this cell
  let found = null;

  for (const clue of puzzle.acrossHints) {
    const start = parseInt(clue.cellID);
    const len = parseInt(clue.answerlength);
    const cells = getAcrossWordCells(start, len);

    if (cells.includes(cell)) {
      found = cells;
      break;
    }
  }

  setHighlightCells(found || [cell]);
};


  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/crossword/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        puzzleID: puzzle.puzzleID,
        riderID: "team26",
        // submittedPuzzle: grid,
        submittedPuzzle: Object.fromEntries(
  Object.entries(grid)
    .filter(([_, cell]) => !cell.isPencil)   // remove pencil letters
    .map(([key, cell]) => [key, cell.value]) // keep only final values
),

        timeRemaining: seconds
      })
    });

      const data = await res.json();

      navigate("/score", {
        state: {
        score: data.score,
        correctWords: data.correctWords,
        roundIndex: roundIndex,
        filledCells: Object.keys(grid).map(Number),
         blackCells: puzzle.blackBoxArray

        }
      });



  };

  if (!puzzle) return <p>Loading...</p>;

  const blackCells = puzzle.blackBoxArray || [];

  const clueNumbers = new Set([
    ...puzzle.acrossHints.map(c => parseInt(c.cellID)),
    ...puzzle.downHints.map(c => parseInt(c.cellID)),
  ]);

  return (
    <div className="grid-page">
      <main className="grid-main">
        <h1>Cross-Word Puzzle Game!</h1>
        <p>Get Ready To Challenge Your Mind And Have Fun Solving Puzzles!!</p>
      </main>

      <div className="boxes-wrapper">
        {/* GRID SIDE */}
        <div className="grid-container large">
          <div className="grid-box">
            <div className="grid-header">
              <h5>Enjoy Solving, Best of Luck!</h5>
            </div>

            <div className="crossword-grid">
              {Array.from({ length: 81 }, (_, i) => {
                const cell = i + 1;
                const isBlack = blackCells.includes(cell);
                const showNumber = clueNumbers.has(cell);

                return (
                 <div
                key={cell}
              onClick={() => handleCellClick(cell)}
                 className={`cell-box 
                ${isBlack ? "black" : ""} 
                ${highlightCells.includes(cell) ? "highlight" : ""}
  `             }
             >

                    {!isBlack && (
                      <>
                        {showNumber && (
                          <span className="cell-number">{cell}</span>
                        )}
                        <input
                          maxLength={1}
                          value={grid[cell]?.value || ""}

                          onChange={(e) => handleChange(cell, e.target.value)}
                          className={grid[cell]?.isPencil ? "pencil" : ""}

                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CLUE SIDE */}
        <div className="grid-container small">
          <div className="clue-box">
            <h3>Clues Here!</h3>

            <div className="clue-controls">
              <div className="timer">
                ⏱ <span>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</span>
              </div>
              <button 
                onClick={() => setPencil(!pencil)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: pencil ? "#3377FF" : "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                ✏️ {pencil ? "ON" : "OFF"}
              </button>
            </div>

            <div className="clues">
              <div className="clues-section">
                <h4>Across</h4>
                {puzzle.acrossHints.map((c, i) => (
                  <div key={i} className="clue-item">{c.cellID}. {c.hint}</div>
                ))}
              </div>

              <div className="clues-section">
                <h4>Down</h4>
                {puzzle.downHints.map((c, i) => (
                  <div key={i} className="clue-item">{c.cellID}. {c.hint}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button-controls">
        <button onClick={handleSubmit}>
          <h5>Submit</h5>
        </button>
      </div>
    </div>
  );
}

export default GridPage;
