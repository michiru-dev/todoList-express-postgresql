import axios from 'axios'

// デフォルトの設定を定義
const instance = axios.create({
  //ベースのURLを設定
  baseURL: 'http://localhost:8000', // ベースURL（APIのエンドポイントに応じて変更してください）
  timeout: 5000, // タイムアウト時間（ミリ秒）
  //headers:ここでheadersの設定も可能
})

// // インターセプターを設定
// instance.interceptors.request.use(
//   (config) => {
//     // リクエストが送信される前に実行する処理を記述
//     // 例えば、リクエストヘッダーへのトークンの追加など
//     return config
//   },
//   (error) => {
//     // リクエストがエラーとなった場合の処理を記述
//     return Promise.reject(error)
//   }
// )

// instance.interceptors.response.use(
//   (response) => {
//     // レスポンスが受信された後に実行する処理を記述
//     // 例えば、レスポンスデータの加工など
//     return response
//   },
//   (error) => {
//     // レスポンスがエラーとなった場合の処理を記述
//     return Promise.reject(error)
//   }
// )

export default instance
