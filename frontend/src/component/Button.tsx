import React from 'react'

type ButtonBase = {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

function Button({ text, onClick }: ButtonBase) {
  return <button onClick={onClick}>{text}</button>
}

export default Button
