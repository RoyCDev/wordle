import React from 'react'

function KeyBoard({ handleAdd, handleDelete, handleSubmit, keyColors }) {
  const KEYS = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

  return (
    <section className='flex flex-wrap max-w-108 justify-center gap-2 mt-10'>
      {KEYS.map(key =>
        <button
          key={key}
          className={`rounded min-w-8 h-10 px-2 pb-0.5 font-bold ${keyColors[key] ? keyColors[key] + " text-white" : "bg-gray-300  hover:bg-gray-700 hover:text-white hover:cursor-pointer"}`
          }
          onClick={
            key === "DELETE" ? handleDelete :
              key === "ENTER" ? handleSubmit :
                () => handleAdd(key)}
        >
          {key}
        </button>)
      }
    </section>
  )
}

export default KeyBoard