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

  console.log(board);

  return (
    <div>
      <KeyBoard handleAdd={handleAdd} handleDelete={handleDelete} />
    </div>
  )
}

export default GameBoard