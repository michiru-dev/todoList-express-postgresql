"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = 8000;
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: '*',
    contentType: 'Content-Type',
};
//req:リクエストがきた！相手から来たもの
//res:レスポンスを返す！こっちから返すもの
//ミドルウェア
//レスポンスヘッダーの中でクライアント側の要求を許可する
app.use(function (req, res, next) {
    //リクエスト元のオリジンを許可
    res.header('Access-Control-Allow-Origin', corsOptions.origin);
    //メソッドを許可。postとかdeleteとか
    res.header('Access-Control-Allow-Methods', corsOptions.methods);
    //リクエストヘッダーを許可。ここではcontent-type
    res.header('Access-Control-Allow-Headers', corsOptions.contentType);
    next();
});
//フォームからデータを受け取って実行できる形式に変換
//渡ってくるデータが文字列、配列のときはurlencoded、json objectのときはjson
app.use(express_1.default.json());
// app.use(express.urlencoded({ extended: true }))
// postgreSQLからデータの取得
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield db_1.pool.connect(); // データベース接続
            //クエリとはデータベースに対して特定の操作を行うための命令や要求を送信すること
            const query = 'SELECT * FROM todo ORDER BY created_at'; //クエリ（命令）を指定
            const result = yield client.query(query); //これで上のクエリ（命令）を実行
            const data = result.rows; // 取得したデータを処理 データは result.rows に格納されてる
            client.release(); // データベース接続を解放
            return { data, isSuccess: true }; //下でエラーハンドリングするためにisSuccessを追加
        }
        catch (error) {
            console.error('データ取得エラー:', error);
            return { data: undefined, isSuccess: false };
        }
    });
}
//クライアントにデータを返す
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield getData();
    if (result.isSuccess) {
        res.status(200).send(result.data);
        return; //これは値をreturnしているんじゃなくて早期returnでこれ以上処理をしないようにしてる
    }
    res.status(500).send('error');
}));
//追加
app.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoInput } = req.body; //bodyの中にデータが入ってる
        const { item, id, created_at } = todoInput;
        //~~~postgreSQL~~~
        yield db_1.pool.query('INSERT INTO todo(id,item,created_at) VALUES($1,$2,$3)', [
            id,
            item,
            created_at,
        ]); //変動する値を入れる場合はプレースホルダーを使いインジェクション対策をする
        const todoList = yield getData();
        if (!todoList.isSuccess) {
            throw new Error('データ取得エラー'); //これをするとcatchにはいる
        }
        res.status(201).send(todoList); //これはクライアント側への返事
    }
    catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
}));
// PostgreSQLから項目を削除
function deleteItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield db_1.pool.connect(); // データベース接続
            const query = 'DELETE FROM todo WHERE id = $1'; // 削除クエリを指定
            const result = yield client.query(query, [id]); // クエリの実行とパラメータのバインド
            client.release(); // データベース接続を解放
            return result.rowCount > 0; // 削除が成功したかどうかを真偽値で返す(削除された行が1以上ならtrue)
        }
        catch (error) {
            console.error('削除エラー:', error);
            return false;
        }
    });
}
//削除
app.delete('/todos/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield deleteItem(id);
        const todoList = yield getData();
        if (!todoList.isSuccess) {
            throw new Error('データ取得エラー');
        }
        res.status(202).send(todoList);
    }
    catch (error) {
        res.status(500).send('削除エラー');
    }
}));
//編集
app.put('/todos/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, newItem } = req.body;
        yield db_1.pool.query('UPDATE todo SET item=$1 WHERE id=$2', [newItem, id]);
        const todoList = yield getData();
        if (!todoList.isSuccess) {
            throw new Error('データ取得エラー');
        }
        res.status(200).send(todoList);
    }
    catch (error) {
        res.status(500).send('編集エラー');
    }
}));
app.listen(port, () => console.log('server running'));
