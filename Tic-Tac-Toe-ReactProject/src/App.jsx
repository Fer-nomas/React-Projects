import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./index.css";

import { Square } from "./components/Square";
import { TURNS, WINNER_COMBOS } from "./constants";
import { checkEndGame, checkWinner } from "./logic";

const resetBtnStyle = "bg-slate-800 border-2 px-4 py-2 rounded-sm";
const winnerAlert = "text-5xl font-bold text-green-700";
const drawAlert = "text-5xl font-bold text-yellow-500";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const updateBoard = (i) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setTurn(TURNS.X);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  useEffect(updateBoard, []);

  return (
    <main className="h-screen w-screen bg-slate-800 flex flex-col justify-center items-center text-white">
      <div className="h-24">
        <section
          className={winner ? winnerAlert : winner == false ? drawAlert : ""}
        >
          {winner ? "Gano la " + winner : winner == false ? "Empate" : ""}
        </section>
      </div>

      <h1 className="text-3xl font-bold my-5">Tic Tac Toe Game</h1>

      <section className="grid grid-cols-3 gap-4 mb-20 ">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="flex gap-4 ">
        <Square isSelect={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelect={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <section className="h-20 mt-10">
        <button onClick={resetGame} className={resetBtnStyle}>
          {"Reset"}
        </button>
      </section>
    </main>
  );
}

export default App;
