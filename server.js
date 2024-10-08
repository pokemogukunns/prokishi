const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // 静的ファイル（HTMLなど）の提供用

// プロキシ用ルート
app.get('/proxy', async (req, res) => {
    const url = req.query.url; // クライアントから渡されたURL
    if (!url) {
        return res.status(400).send('URLが指定されていません。');
    }

    try {
        // 外部サイトにリクエスト
        const response = await axios.get(url);
        res.send(response.data); // HTMLなどのレスポンスをそのまま返す
    } catch (error) {
        console.error('外部サイトの取得に失敗しました:', error);
        res.status(500).send('外部サイトの取得に失敗しました。');
    }
});

// サーバーの起動
app.listen(PORT, () => {
    console.log(`サーバーが起動しました。http://localhost:${PORT}`);
});
