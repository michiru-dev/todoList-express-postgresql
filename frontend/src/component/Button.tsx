import React from "react";

type ButtonBase = { text: string; onClick: any };

function Button({ text, onClick }: ButtonBase) {
  return <button onClick={onClick}>{text}</button>;
}

export default Button;
