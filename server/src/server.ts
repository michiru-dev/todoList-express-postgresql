import express from 'express'
import cors from 'cors' //npm i --save-dev @types/cors

const app = express()
const port = 8000

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: '*',
  contentType: 'Content-Type',
}

//明日ここ調べる
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', corsOptions.origin)
  res.header('Access-Control-Allow-Methods', corsOptions.methods)
  res.header('Access-Control-Allow-Headers', corsOptions.contentType)
  next()
})

app.get('/', (req, res) => {
  res.status(200).send('get')
})

//フォームからデータを受け取って実行できる形式に変換
//渡ってくるデータが文字列、配列のときはurlencoded、json objectのときはjson
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.post('/todos', (req, res) => {
  const { todoInput } = req.body //bodyの中にデータが入ってる
  console.log(todoInput)
  res.status(201).send('post') //これはクライアント側への返事
})

app.listen(port, () => console.log('server running'))
