import React from "react";
import { Play } from "lucide-react";

const CrosswordMenu = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            Crossword
          </h1>
          <p className="text-gray-600">Classic puzzle game</p>
        </div>

        {/* Instructions */}
        <div className="space-y-4 mb-8">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-900 mb-2">
              How to Play
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Fill the 9×9 grid using clues</li>
              <li>• Words intersect and share letters</li>
              <li>• Click a cell and type to fill</li>
              <li>• Click again to change direction</li>
              <li>• Use pencil mode for rough work</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">
              Scoring
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• +1 point per correct word</li>
              <li>• Bonus for remaining time</li>
              <li>• No negative marking</li>
            </ul>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          <Play size={20} />
          Start Game
        </button>
      </div>
    </div>
  );
};

export default CrosswordMenu;
