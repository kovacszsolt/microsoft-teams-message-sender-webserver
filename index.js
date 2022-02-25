const http = require("http");
const hello = require("@kovacszsolt/microsoft-teams-message/function");
require('dotenv').config();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8080;
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    if (req.method === "POST") {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            data = JSON.parse(data);
            const url = process.env.WEBHOOK_URL;
            hello.sendMessage(url,
                data.color, data.title, data.subTitle).then(() => {
                res.writeHead(200);
                res.end(`{"status": "ok"}`);
            }, (error) => {
                res.writeHead(400);
                console.log('error', error);
                res.end(`{"status": "error"}`);
            })

        })
    } else {
        res.writeHead(400);
        res.end(`{"status": "error"}`);
    }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
