import React from 'react'

function KeyBoard() {
  const KEYS = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

  return (
    <div>
      {KEYS.map(key => <button>{key}</button>)}
    </div>
  )
}

export default KeyBoard