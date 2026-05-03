import React from 'react'

function KeyBoard({ handleAdd, handleDelete, handleSubmit }) {
  const KEYS = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

  return (
    <div className='flex flex-wrap max-w-90 justify-center gap-1 mt-5'>
      {KEYS.map(key =>
        <button
          key={key}
          className='border-1 w-8 h-10'
          onClick={
            key === "DELETE" ? handleDelete :
              key === "ENTER" ? handleSubmit :
                () => handleAdd(key)}
        >
          {key}
        </button>)
      }
    </div>
  )
}

export default KeyBoard