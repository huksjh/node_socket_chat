"use strict";
const socket = io();

// DOM
const nickName = document.querySelector("#nickname");
const chattingList = document.querySelector(".chatting-list");
const chattingInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

sendButton.addEventListener("click", (e) => {
    if (nickname.value == "") {
        alert("닉네임을 입력하세요");
        nickname.focus();
        return false;
    }

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
    const { name, message, time } = data;

    const item = new LiMake(name, message, time);
    item.makeLi();

    // 스크롤 하단으로 이동
    displayContainer.scrollTop = displayContainer.scrollHeight;
});

// li 생성
function LiMake(name, message, time) {
    this.name = name;
    this.msg = message;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickName.value == this.name ? "sent" : "recived");

        const dom = `
        <div class="thumb"><img src="https://placeimg.com/50/50/any" alt="any" srcset="" /></div>
        <div class="messageWrap">
            <span class="profile">${this.name}</span>
            <span>
                <span class="message">${this.msg.replaceAll("\n", "<br/>")}</span>
                <span class="time">${this.time}</span>
            </span>
        </div>
        `;
        li.innerHTML = dom;
        chattingList.appendChild(li);
    };
}
