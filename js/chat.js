
const chatArea = document.getElementById("chatArea");
const status = document.getElementById("status");
const nextBtn = document.getElementById("next");
const opening = document.getElementById("opening");
const windowChat = document.querySelector(".chat-window");

// =========================
// CHAT PERTAMA
// Tetap memakai pesan asli lu
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
    }
];

// =========================
// CONTOH CHAT UNTUK TIME-LAPSE
//
// Ganti teks contoh ini dengan cuplikan
// chat asli kalian kalau sudah siap.
// Baris-baris ini diulang untuk menciptakan
// efek banyaknya percakapan yang terlewati.
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
    "Hari-hari berikutnya",
    "Beberapa minggu kemudian",
    "Bulan-bulan berlalu",
    "Lebih banyak cerita terlewati",
    "Hari berganti, chat terus bertambah",
    "Dan waktu terus berjalan..."
];

// =========================
// FUNGSI BANTUAN
// =========================

function scrollBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
}

function createMessage(sender, text, time = "", timeLapse = false) {
    const bubble = document.createElement("div");

    bubble.className = "message " + sender;

    if (timeLapse) {
        bubble.classList.add("time-lapse-message");
    }

    // Gunakan textContent agar isi pesan aman
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

    if (!timeLapse) {
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

    if (typing) {
        typing.remove();
    }
}

// =========================
// CHAT PERTAMA MUNCUL
// =========================

let index = 0;
let timeLapseStarted = false;

function nextMessage() {
    if (index >= messages.length) {
        runTimeLapse();
        return;
    }

    const msg = messages[index];

    if (msg.sender === "me") {
        createMessage(msg.sender, msg.text, msg.time);

        index++;

        setTimeout(nextMessage, 900);
    } else {
        showTyping();

        setTimeout(function () {
            hideTyping();

            createMessage(msg.sender, msg.text, msg.time);

            index++;

            setTimeout(nextMessage, 900);
        }, 1800);
    }
}

// =========================
// TIME-LAPSE
// Ratusan chat melewati layar
// =========================

function runTimeLapse() {
    if (timeLapseStarted) return;

    timeLapseStarted = true;

    status.innerText = "Banyak cerita terlewati...";

    // Simpan posisi akhir chat pertama
    const startScroll = chatArea.scrollTop;

    // 6 putaran x 30 pesan = 180 bubble
    const repetitions = 6;

    let messageNumber = 0;

    for (let round = 0; round < repetitions; round++) {
        showTimeDivider(timePeriods[round]);

        for (const msg of timeLapseLines) {
            messageNumber++;

            // Waktu tampilan saja, bukan timestamp asli
            const minutes = (messageNumber * 3) % 60;
            const hours = Math.floor(messageNumber / 20) % 24;

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

    // Paksa scroll langsung dikendalikan animasi JS
    chatArea.style.scrollBehavior = "auto";

    const endScroll = chatArea.scrollHeight;
    const distance = endScroll - startScroll;
    const duration = 5500;
    const startTime = performance.now();

    function animateScroll(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Kecepatan meningkat, lalu melambat menjelang akhir
        const eased =
            progress < 0.15
                ? 0.15 * (progress / 0.15) ** 2
                : 0.15 + 0.85 *
                  (1 - (1 - (progress - 0.15) / 0.85) ** 2);

        chatArea.scrollTop = startScroll + distance * eased;

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            chatArea.scrollTop = chatArea.scrollHeight;

            status.innerText = "Online";

            // Tampilkan tombol setelah guliran selesai
            setTimeout(function () {
                nextBtn.classList.add("show");
            }, 700);
        }
    }

    requestAnimationFrame(animateScroll);
}

// =========================
// START
// Opening asli tetap dipakai
// =========================

window.onload = function () {
    windowChat.style.display = "none";

    setTimeout(function () {
        opening.style.opacity = "0";

        setTimeout(function () {
            opening.style.display = "none";
            windowChat.style.display = "flex";

            nextMessage();
        }, 500);
    }, 1500);
};

// =========================
// NEXT PAGE
// Tetap menuju photo.html
// =========================

nextBtn.addEventListener("click", function () {
    window.location.href = "photo.html";
});
