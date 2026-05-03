import React from 'react'
import { useState } from 'react';
import KeyBoard from './KeyBoard';

function GameBoard() {
  const MAX_GUESSES = 6;
  const WORD_LENGTH = 5;

  const defaultBoard = []
  for (let i = 0; i < MAX_GUESSES; i++) {
    defaultBoard.push(new Array(WORD_LENGTH).fill(null))
  }

  const [board, setBoard] = useState(defaultBoard);
  const [guessesCount, setGuessesCount] = useState(0);
  const [message, setMessage] = useState("");

  const handleAdd = (letter) => {
    setBoard(prev => prev.map((row, rowIndex) => {
      return rowIndex === guessesCount ? addLetter(row, letter) : row
    }))
  }

  const addLetter = (array, letter) => {
    const result = [...array];
    const emptyIndex = result.findIndex(slot => slot === null);
    if (emptyIndex !== -1) { // the array is not full yet
      result[emptyIndex] = { letter, color: null };
    }
    return result;
  }

  const handleDelete = () => {
    setBoard(prev => prev.map((row, rowIndex) => {
      return rowIndex === guessesCount ? deleteLastLetter(row) : row
    }))
  }

  const deleteLastLetter = (array) => {
    const result = [...array];
    const emptyIndex = result.findIndex(slot => slot === null);
    if (emptyIndex !== 0) { // there're still letters in the array to delete
      const letterIndex = emptyIndex === -1 ? array.length - 1 : emptyIndex - 1;
      result[letterIndex] = null;
    }
    return result;
  }

  const handleSubmit = () => {
    let guess = "";
    for (const slot of board[guessesCount]) {
      guess += slot?.letter || "";
    }

    if (guess.length === WORD_LENGTH) {
      checkGuess(guess);
    }
    else {
      setMessage("Not enough letters");
    }
  }

  const checkGuess = async (guess) => {
    try {
      const response = await fetch("http://localhost:3000/words/check", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ guess }),
        credentials: "include"
      })

      if (!response.ok) {
        setMessage(response.status + response.statusText);
        return;
      }
      const result = await response.json();
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-fit mx-auto mt-10'>
      <div className='space-y-2'>
        {board.map((row, rowIndex) => {
          return <div key={rowIndex} className='flex justify-center space-x-2'>
            {row.map((col, colIndex) =>
              <div
                key={colIndex}
                className='size-15 text-4xl font-semibold text-center pt-1.5 border-1'
              >
                {col?.letter || ""}
              </div>)
            }
          </div>
        })}
      </div>

      <KeyBoard handleAdd={handleAdd} handleDelete={handleDelete} handleSubmit={handleSubmit} />
    </div>
  )
}

export default GameBoard