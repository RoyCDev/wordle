import React from 'react'
import { useState } from 'react';
import KeyBoard from './KeyBoard';

function GameBoard() {
  const MAX_GUESSES = 6;
  const [board, setBoard] = useState([]);

  return (
    <div>
      <KeyBoard />
    </div>
  )
}

export default GameBoard