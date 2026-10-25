const chatArea = document.getElementById("chatArea");
const status = document.getElementById("status");
const nextBtn = document.getElementById("next");
const opening = document.getElementById("opening");
const windowChat = document.querySelector(".chat-window");

// =========================
// ISI CHAT
// =========================

const messages = [

    {
        sender: "tiara",
        text: "satria, ini tiara",
        time: "10:04"
    },

    {
        sender: "me",
        text: "ohh iyaa",
        time: "10:04"
    },

    {
        sender: "tiara",
        text: "hardisk gimana? mau beli offline aja?",
        time: "10:07"
    },

    {
        sender: "me",
        text: "beli offline aja deh, waktu nya udah mepet",
        time: "10:08"
    },



];

// =========================
// AUTO SCROLL
// =========================

function scrollBottom(){

    chatArea.scrollTop = chatArea.scrollHeight;

}

// =========================
// BUAT CHAT
// =========================

function createMessage(sender,text,time){

    const bubble = document.createElement("div");

    bubble.className = "message " + sender;

    bubble.innerHTML = `
        ${text}
        <div class="time">${time}</div>
    `;

    chatArea.appendChild(bubble);

    scrollBottom();

}

// =========================
// TYPING
// =========================

function showTyping(){

    status.innerText = "Sedang mengetik...";

    const typing = document.createElement("div");

    typing.className = "typing";

    typing.id = "typing";

    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    chatArea.appendChild(typing);

    scrollBottom();

}

function hideTyping(){

    status.innerText = "Online";

    const typing = document.getElementById("typing");

    if(typing){

        typing.remove();

    }

}

// =========================
// CHAT
// =========================

let index = 0;

function nextMessage(){

    if(index >= messages.length){

        nextBtn.classList.add("show");

        return;

    }

    const msg = messages[index];

    if(msg.sender == "me"){

        createMessage(msg.sender,msg.text,msg.time);

        index++;

        setTimeout(nextMessage,900);

    }

    else{

        showTyping();

        setTimeout(function(){

            hideTyping();

            createMessage(msg.sender,msg.text,msg.time);

            index++;

            setTimeout(nextMessage,900);

        },1800);

    }

}

// =========================
// START
// =========================

window.onload = function(){

    windowChat.style.display = "none";

    setTimeout(function(){

        opening.style.opacity = "0";

        setTimeout(function(){

            opening.style.display = "none";
            windowChat.style.display = "flex";

            nextMessage();

        },500);

    },1500);

}

// =========================
// NEXT PAGE
// =========================

nextBtn.addEventListener("click", function(){

    window.location.href = "photo.html";

});