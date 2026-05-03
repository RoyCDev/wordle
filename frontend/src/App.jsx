import { useState, useEffect } from 'react'
import { ToastContainer } from "react-toastify"
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
    <>
      <ToastContainer />
      <GameBoard />
    </>
  )
}

export default App
