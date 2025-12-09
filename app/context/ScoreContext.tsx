import { createContext, useContext, useState } from "react";

const ScoreContext = createContext(null);

export function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);

  const addScore = (points: number) => {
    setScore(prev => prev + points);
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <ScoreContext.Provider value={{ score, addScore, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  return useContext(ScoreContext);
}
