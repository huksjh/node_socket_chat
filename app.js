const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");

// socket.io 에  server 정보를 담아 사용
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")));
const PORT = process.env.PORT || 5000;

// 서버로부터 넘어온 내용을 on 이란 함수로 사용
io.on("connection", (socket) => {
    // console.log("연결이 되었습니다.");
    // socket.on(a, b)
    // a 첫번째 채팅아이디, b 클라이언트 넘어온 값
    socket.on("chatting", (data) => {
        //const { } = data;
        const datas = { time: moment().format("A HH:mm"), ...data };

        io.emit("chatting", datas);
    });
});

server.listen(PORT, () => console.log(`server is running ${PORT}\nhttp://localhost:${PORT}`));
