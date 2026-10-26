
const chatArea = document.getElementById("chatArea");
const status = document.getElementById("status");
const nextBtn = document.getElementById("next");
const opening = document.getElementById("opening");
const windowChat = document.querySelector(".chat-window");

// =========================
// CHAT PERTAMA
// =========================

const messages = [
    { sender: "tiara", text: "satria, ini tiara", time: "10:04" },
    { sender: "me", text: "ohh iyaa", time: "10:04" },
    {
        sender: "tiara",
        text: "hardisk gimana? mau beli offline aja?",
        time: "10:07"
    },
    {
        sender: "me",
        text: "beli offline aja deh, waktu nya udah mepet",
        time: "10:08"
    }
];

// =========================
// CHAT TIME-LAPSE
// Ganti dengan cuplikan chat asli
// jika ingin lebih personal.
// =========================

const timeLapseLines = [
    { sender: "tiara", text: "kamu lagi apa?" },
    { sender: "me", text: "lagi santai aja nih" },
    { sender: "tiara", text: "udah makan belum?" },
    { sender: "me", text: "udah, kamu sendiri?" },
    { sender: "tiara", text: "belum nih wkwk" },
    { sender: "me", text: "jangan lupa makan ya" },
    { sender: "tiara", text: "iyaa, kamu juga" },
    { sender: "me", text: "hari ini gimana?" },
    { sender: "tiara", text: "lumayan capek sih" },
    { sender: "me", text: "istirahat dulu sana" },
    { sender: "tiara", text: "nanti cerita lagi ya" },
    { sender: "me", text: "iyaa, gua dengerin" },
    { sender: "tiara", text: "makasih yaa" },
    { sender: "me", text: "hehe sama-sama" },
    { sender: "tiara", text: "eh ada cerita lucu" },
    { sender: "me", text: "apaan tuh?" },
    { sender: "tiara", text: "bentar gua ceritain wkwk" },
    { sender: "me", text: "wkwkwk anjir" },
    { sender: "tiara", text: "kamu tuh yaa 😭" },
    { sender: "me", text: "apaan sih wkwk" },
    { sender: "tiara", text: "besok sibuk ga?" },
    { sender: "me", text: "kayaknya engga, kenapa?" },
    { sender: "tiara", text: "engga, nanya aja hehe" },
    { sender: "me", text: "ohh kirain ada apa" },
    { sender: "tiara", text: "cerita sama kamu seru" },
    { sender: "me", text: "sama, ga kerasa waktunya" },
    { sender: "tiara", text: "udah malem ternyata" },
    { sender: "me", text: "iya, istirahat sana" },
    { sender: "tiara", text: "kamu juga jangan begadang" },
    { sender: "me", text: "iyaa, good night" }
];

const timePeriods = [
    "cerita terus berlanjut",
    "Beberapa minggu kemudian",
    "Bulan-bulan berlalu",
    "Lebih banyak cerita terlewati",
    "Hari berganti, chat terus bertambah",
    "Dan waktu terus berjalan..."
];

// =========================
// STATE
// =========================

let messageIndex = 0;
let timeLapseStarted = false;

// =========================
// FUNGSI BANTUAN
// =========================

function scrollBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

function createMessage(sender, text, time = "", isTimeLapse = false) {
    const bubble = document.createElement("div");
    bubble.className = `message ${sender}`;

    if (isTimeLapse) {
        bubble.classList.add("time-lapse-message");
    }

    const messageText = document.createElement("div");
    messageText.textContent = text;
    bubble.appendChild(messageText);

    if (time) {
        const timeElement = document.createElement("div");
        timeElement.className = "time";
        timeElement.textContent = time;
        bubble.appendChild(timeElement);
    }

    chatArea.appendChild(bubble);

    if (!isTimeLapse) {
        scrollBottom();
    }

    return bubble;
}

function showTimeDivider(text) {
    const divider = document.createElement("div");
    divider.className = "time-divider";
    divider.textContent = text;
    chatArea.appendChild(divider);
}

// =========================
// TYPING INDICATOR
// =========================

function showTyping() {
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

function hideTyping() {
    status.innerText = "Online";

    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

// =========================
// CHAT AWAL
// =========================

function nextMessage() {
    if (messageIndex >= messages.length) {
        runTimeLapse();
        return;
    }

    const msg = messages[messageIndex];

    if (msg.sender === "me") {
        createMessage(msg.sender, msg.text, msg.time);
        messageIndex++;
        setTimeout(nextMessage, 900);
        return;
    }

    showTyping();

    setTimeout(() => {
        hideTyping();
        createMessage(msg.sender, msg.text, msg.time);
        messageIndex++;
        setTimeout(nextMessage, 900);
    }, 1800);
}

// =========================
// TIME-LAPSE
// =========================

function runTimeLapse() {
    if (timeLapseStarted) return;
    timeLapseStarted = true;

    status.innerText = "Banyak cerita terlewati...";

    // Kunci scroll manual hanya saat time-lapse.
    chatArea.classList.add("time-lapse-active");
    chatArea.classList.add("time-lapse-locked");

    const startScroll = chatArea.scrollTop;
    const repetitions = 6;

    let messageNumber = 0;

    // Siapkan seluruh pesan sebelum animasi dimulai.
    for (let round = 0; round < repetitions; round++) {
        showTimeDivider(timePeriods[round]);

        for (const msg of timeLapseLines) {
            messageNumber++;

            const totalMinutes = messageNumber * 3;
            const hours = Math.floor(totalMinutes / 60) % 24;
            const minutes = totalMinutes % 60;

            const displayTime =
                String(hours).padStart(2, "0") + ":" +
                String(minutes).padStart(2, "0");

            createMessage(
                msg.sender,
                msg.text,
                displayTime,
                true
            );
        }
    }

    chatArea.style.scrollBehavior = "auto";

    const endScroll = chatArea.scrollHeight;
    const distance = Math.max(0, endScroll - startScroll);
    const duration = 8000;
    const startTime = performance.now();

    const timeLapseMessages = [
        ...chatArea.querySelectorAll(".message.time-lapse-message")
    ];

    function updateBlur() {
        const areaRect = chatArea.getBoundingClientRect();
        const focusY = areaRect.top + areaRect.height * 0.48;

        timeLapseMessages.forEach((msg) => {
            const rect = msg.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;

            msg.classList.remove("in-focus", "passed");

            if (centerY < focusY - 35) {
                msg.classList.add("passed");
            } else if (centerY <= focusY + 35) {
                msg.classList.add("in-focus");
            }
        });
    }

    
function animateScroll(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

        const eased =
    progress * progress * progress *
    (progress * (progress * 6 - 15) + 10);

    chatArea.scrollTop = startScroll + distance * eased;

    if (progress < 1) {
        requestAnimationFrame(animateScroll);
        return;
    }

    chatArea.scrollTop = chatArea.scrollHeight;

    // Semua chat time-lapse tetap blur.
    timeLapseMessages.forEach((msg) => {
        msg.classList.remove("in-focus", "last-message");
        msg.classList.add("passed");
    });

    status.innerText = "Online";

    setTimeout(() => {
        nextBtn.classList.add("show");
    }, 700);
}

requestAnimationFrame(animateScroll);

}

// =========================
// START
// =========================

window.onload = function () {
    windowChat.style.display = "none";

    setTimeout(() => {
        opening.style.opacity = "0";

        setTimeout(() => {
            opening.style.display = "none";
            windowChat.style.display = "flex";
            nextMessage();
        }, 500);
    }, 1500);
};

// =========================
// NEXT PAGE
// =========================

nextBtn.addEventListener("click", function () {
    window.location.href = "photo.html";
});
