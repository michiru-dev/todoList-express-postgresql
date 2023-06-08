import React, { useEffect, useState } from 'react'
import './App.css'
import Button from './component/Button'
import ShowList from './component/ShowList'
import axios from './axios'
import { v4 as uuidv4 } from 'uuid'

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

export type todoListBase = { item: string; id: string; createdAt: Date }

function App() {
  const [todoInput, setTodoInput] = useState('')
  const [todoList, setTodoList] = useState<todoListBase[]>([])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value)
  }

  useEffect(() => {
    const fetchList = async () => {
      await axios
        .get('/')
        .then((res) => setTodoList(res.data))
        .catch((err) => {
          console.log(err)
        })
    }
    fetchList()
  }, [])

  const handleButtonClick = async (todoInput: string) => {
    //asyncで非同期処理を宣言
    //このheadersはリクエストボディの言語、長さ、コンテンツ形式等を指定するもの
    //axios.tsのconfigファイルに記載することも可能
    //postの第三引数にいれる
    //↓リクエストヘッダー
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }
    //objectならaxiosが勝手にcontent-typeをapplication/jsonにしてくれるから上のconfigは今回はいらない
    const obj = { item: todoInput, id: uuidv4(), createdAt: new Date() }
    const res = await axios.post('/todos', { todoInput: obj })
    console.log(res.data)
    setTodoList(res.data)
    setTodoInput('')
  }

  const handleDeleteButtonClick = async (id: string) => {
    const res = await axios.delete('/todos/delete', { data: { id: id } }) //この時の第二引数のプロパティ名は必ずdata
    //プロパティ名の後はオブジェクトで渡す。これの場合{id}だけでもうまくいく。多分勝手にidをプロパティ名にして処理してくれてる
    setTodoList(res.data)
  }

  return (
    <div className="App">
      <input
        value={todoInput}
        type="text"
        onChange={(e) => handleOnChange(e)}
      />
      {/* この場に引数がない時(ex;イベントとかコンポーネント側で渡したい時とか)は最初の引数も入れる */}
      <Button text={'追加'} onClick={() => handleButtonClick(todoInput)} />
      <ShowList
        list={todoList}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    </div>
  )
}

export default App
