import dotenv from 'dotenv'
import { Pool } from 'pg'
// const { Pool } = require('pg') //PostgreSQLをNode.jsで操作するためのパッケージ

//envファイルの読み込み。これをすることで他のところでprocess.env.でアクセスできる npm i済
//nodejsの時はdotenvでenvファイル作る
dotenv.config()

export const pool: Pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5432,
  //dotenvで持ってくるenvファイルの中身は全てstring型になってるので数値に変換
  //+undefinedの可能性があるとparseIntができないのでoptionalにしてる
})

// console.log(pool)
