import React, { useState } from "react";
import "./App.css";
import Button from "./component/Button";
import ShowList from "./component/ShowList";

// const CustomButton = ({
//   text,
//   onClick,
// }: {
//   text: string;
//   onClick: (text: string) => void;
// }) => {
//   // const cons = (text: string) => console.log(text);

//   const onClick = (text: string) => console.log(text)

//   const handleClick = () => {
//     onClick("asdffasdf"); //(text: string) => console.log(text)
//     // cons("asd");
//   };

//   // const asdfa = (text: string) => {
//   //   console.log(text);
//   // };
//   // asdfa("adsa");
//   return <button onClick={handleClick}>{text}</button>;
// };

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState<string[]>([]);

  const handleOnChange = (e: any) => {
    setTodoInput(e.target.value);
  };

  const handleButtonClick = (todoInput: string) => {
    setTodoList((prevList) => [...prevList, todoInput]);
    setTodoInput("");
  };

  return (
    <div className="App">
      {/* <CustomButton text={"aa"} onClick={(text: string) => console.log(text)} /> */}
      <input
        value={todoInput}
        type="text"
        onChange={(e) => handleOnChange(e)}
      />
      {/* この場に引数がない時(ex;イベントとかコンポーネント側で渡したい時とか)は最初の引数も入れる */}
      <Button text={"追加"} onClick={() => handleButtonClick(todoInput)} />
      <ShowList list={todoList} />
    </div>
  );
}

export default App;
