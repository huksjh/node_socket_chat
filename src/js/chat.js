"use strict";
const socket = io();

// DOM
const nickName = document.querySelector("#nickname");
const chattingList = document.querySelector(".chatting-list");
const chattingInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

sendButton.addEventListener("click", (e) => {
    if (chattingInput.value == "") {
        alert("전송할 내용을 입력하세요");
        chattingInput.focus();
        return false;
    }

    const params = {
        name: nickName.value,
        message: chattingInput.value,
    };

    // 소켓으로 서버로 데이터 전송
    // 첫번째 인자 - 채팅아이디 (채널이름)
    // 두번째 인자 - 내용 보낼 데이터
    socket.emit("chatting", params);

    chattingInput.value = "";
});

// console.log(socket);

// 서버에서 -> 클라이언드 받아오기
socket.on("chatting", (data) => {
    // data 서버에서 받아온 내용
    // console.log(data);
    const { name, message } = data;
    const li = document.createElement("li");

    li.innerText = `${name}님의 내용 -> ${message}`;
    chattingList.appendChild(li);
});
