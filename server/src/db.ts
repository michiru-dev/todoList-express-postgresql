import dotenv from 'dotenv'
const { Pool } = require('pg')

//envファイルの読み込み。これをすることで他のところでprocess.env.でアクセスできる npm i済
//nodejsの時はdotenvでenvファイル作る
dotenv.config()

export const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
})

// console.log(pool)
