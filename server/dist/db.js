"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
// const { Pool } = require('pg') //PostgreSQLをNode.jsで操作するためのパッケージ
//envファイルの読み込み。これをすることで他のところでprocess.env.でアクセスできる npm i済
//nodejsの時はdotenvでenvファイル作る
dotenv_1.default.config();
exports.pool = new pg_1.Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5432,
    //dotenvで持ってくるenvファイルの中身は全てstring型になってるので数値に変換
    //+undefinedの可能性があるとparseIntができないのでoptionalにしてる
});
// console.log(pool)
