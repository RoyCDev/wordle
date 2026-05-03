import React, { useEffect } from 'react'
import { useState } from 'react';
import KeyBoard from './KeyBoard';
import Cookies from "js-cookie"
import { toast } from 'react-toastify';

function GameBoard() {
  const MAX_GUESSES = 6;
  const WORD_LENGTH = 5;

  const defaultBoard = []
  for (let i = 0; i < MAX_GUESSES; i++) {
    defaultBoard.push(new Array(WORD_LENGTH).fill(null))
  }

  const [board, setBoard] = useState(defaultBoard);
  const [guessesCount, setGuessesCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (guessesCount !== 0) { // check only if we've made a guess
      const isLastGuessCorrect = board[guessesCount - 1].every(slot => slot?.color === "bg-green-600");
      if (guessesCount === MAX_GUESSES || isLastGuessCorrect) {
        setIsGameOver(true);
        toast.info(isLastGuessCorrect ? "You guessed it!" : "The word is " + Cookies.get("word"));
      }
    }
  }, [guessesCount])

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

  const handleSubmit = async () => {
    let guess = "";
    for (const slot of board[guessesCount]) {
      guess += slot?.letter || "";
    }

    if (guess.length === WORD_LENGTH) {
      const result = await checkGuess(guess);
      if (result) {
        setBoard(prev => prev.map((row, rowIndex) => {
          return rowIndex === guessesCount ? updateRowTilesColor(row, result.colors) : row
        }))
        setGuessesCount(prev => prev + 1);
      }
    }
    else {
      toast.error("Not enough letters");
    }
  }

  const checkGuess = async (guess) => {
    try {
      const response = await fetch("http://localhost:3000/words/check", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ guess: guess.toLowerCase() }),
        credentials: "include"
      })

      if (!response.ok) {
        toast.error(response.status + response.statusText);
        return;
      }
      return await response.json();
    }
    catch (error) {
      console.log(error)
    }
  }

  const updateRowTilesColor = (array, result) => {
    const updatedArray = [...array];
    for (let i = 0; i < array.length; i++) {
      updatedArray[i].color =
        result[i] === "green" ? "bg-green-600" :
          result[i] === "yellow" ? "bg-yellow-500" :
            "bg-gray-500"
    }
    return updatedArray;
  }

  const handleKeyPress = ({ key }) => {
    if (key.length === 1 && key.match(/[a-z]/i)) handleAdd(key.toUpperCase())
    else if (event.key === "Enter") handleSubmit();
    else if (event.key === "Backspace") handleDelete();
  }

  return (
    <main tabIndex={0} onKeyDown={(event => handleKeyPress(event))}>
      <div className='w-fit mx-auto mt-10'>
        <div className='space-y-2'>
          {board.map((row, rowIndex) => {
            return <div key={rowIndex} className='flex justify-center space-x-2'>
              {row.map((col, colIndex) =>
                <div
                  key={colIndex}
                  className={`size-15 text-4xl font-semibold text-center pt-2 ${col?.color ? col.color + " text-white" : "border border-gray-300"}`}>
                  {col?.letter || ""}
                </div>)
              }
            </div>
          })}
        </div>

        {!isGameOver &&
          <KeyBoard handleAdd={handleAdd} handleDelete={handleDelete} handleSubmit={handleSubmit} />
        }
      </div>
    </main>
  )
}

export default GameBoard