import { useState, useEffect } from 'react'
import GameBoard from "./GameBoard.jsx"

function App() {
  useEffect(() => {
    const init = async () => {
      try {
        await fetch("http://localhost:3000/words/random", {
          credentials: "include"
        });
      }
      catch (error) {
        console.log(error);
      }
    }
    init();
  }, [])

  return (
    <GameBoard />
  )
}

export default App
