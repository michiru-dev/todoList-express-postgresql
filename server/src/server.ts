import express from 'express'
import cors from 'cors' //npm i --save-dev @types/cors

const app = express()
const port = 8000

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: '*',
  contentType: 'Content-Type',
}

//req:リクエストがきた！相手から来たもの
//res:レスポンスを返す！こっちから返すもの

//ミドルウェア
//レスポンスヘッダーの中でクライアント側の要求を許可する
app.use(function (req, res, next) {
  //リクエスト元のオリジンを許可
  res.header('Access-Control-Allow-Origin', corsOptions.origin)
  //メソッドを許可。postとかdeleteとか
  res.header('Access-Control-Allow-Methods', corsOptions.methods)
  //リクエストヘッダーを許可。ここではcontent-type
  res.header('Access-Control-Allow-Headers', corsOptions.contentType)
  next()
})

app.get('/', (req, res) => {
  res.status(200).send(todoList)
})

//フォームからデータを受け取って実行できる形式に変換
//渡ってくるデータが文字列、配列のときはurlencoded、json objectのときはjson
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

type todoListBase = { item: string; id: string; createdAt: Date }

let todoList: todoListBase[] = []

//追加
app.post('/todos', (req, res) => {
  const { todoInput } = req.body //bodyの中にデータが入ってる
  todoList.push(todoInput)
  res.status(201).send(todoList) //これはクライアント側への返事
})

//削除
app.delete('/todos/delete', (req, res) => {
  const { id } = req.body
  // todoListから該当のアイテムを削除する処理
  const updatedList = todoList.filter((item: todoListBase) => item.id !== id)
  todoList = updatedList
  res.status(202).send(todoList)
})

//編集
app.put('/todos/edit', (req, res) => {
  const { id, newItem } = req.body
  todoList.forEach((item: todoListBase) => {
    if (id === item.id) {
      item.item = newItem
    }
  })
  res.status(200).send(todoList) //foreachの中にres.sendを入れると複数回行われる可能性があるためエラーになる
})

app.listen(port, () => console.log('server running'))
