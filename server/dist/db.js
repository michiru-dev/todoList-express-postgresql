"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const { Pool } = require('pg');
//envファイルの読み込み。これをすることで他のところでprocess.env.でアクセスできる npm i済
//nodejsの時はdotenvでenvファイル作る
dotenv_1.default.config();
exports.pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});
// console.log(pool)
