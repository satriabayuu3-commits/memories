const buttons = document.querySelectorAll(".btn");
const dots = document.querySelectorAll(".pin span");
const hapus = document.querySelector(".delete");
const card = document.querySelector(".card");


const password = "221124";

let pin = "";
let current = 0;
let locked = false;
let wrongCount = 0;

// =============================
// Isi Dot
// =============================

function fillDot(){

    const dot = dots[current];

    dot.style.background = "#8B5E83";
    dot.style.transform = "scale(1.3)";

    setTimeout(function(){

        dot.style.transform = "scale(1)";

    },150);

}

// =============================
// Reset PIN
// =============================

function resetPin(){

    pin = "";
    current = 0;

    dots.forEach(function(dot){

        dot.style.background = "transparent";

    });

}

// =============================
// PIN SALAH
// =============================

function wrongPin(){

    const hint = document.getElementById("hint");

    wrongCount++;

    if(wrongCount == 1){

        hint.innerText = "tetot... salah... 🤏";

    }

    else if(wrongCount == 2){

        hint.innerText = "Petunjuk dikit deh... tanggal penting kita. ";

    }

    else if(wrongCount == 3){

        hint.innerText = "Formatnya DDMMYY yaa... ";

    }

    else if(wrongCount == 4){

        hint.innerText = "tanggal jadi kita sayanggg ❤️";

    }

    else{

        hint.innerText = "Masih salah juga... ayo inget lagi. 😑";

    }

    card.classList.add("shake");

    setTimeout(function(){

        card.classList.remove("shake");

    },400);

    resetPin();

}

// =============================
// PIN BENAR
// =============================

function correctPin(){

    locked = true;

    card.style.boxShadow = "0 0 50px rgba(255,120,180,.8)";
    card.style.transform = "scale(.95)";

    setTimeout(function(){

        document.body.classList.add("fade-out");

        setTimeout(function(){

            window.location.href = "chat.html";

        },600);

    },300);

}

// =============================
// CEK PIN
// =============================

function checkPin(){

    if(pin.length !== password.length) return;

    if(pin === password){

        correctPin();

    }else{

        wrongPin();

    }

}

// =============================
// INPUT ANGKA
// =============================

function inputNumber(number){

    if(locked) return;

    if(current >= dots.length) return;

    fillDot();

    pin += number;

    current++;

    checkPin();

}

// =============================
// DELETE
// =============================

function deleteNumber(){

    if(locked) return;

    if(current <= 0) return;

    current--;

    dots[current].style.background = "transparent";

    pin = pin.slice(0,-1);

}

// =============================
// Klik Mouse
// =============================

buttons.forEach(function(button){

    button.onclick = function(){

        if(button.innerText.trim() === "") return;

        button.style.transform = "scale(.9)";

        setTimeout(function(){

            button.style.transform = "scale(1)";

        },100);

        inputNumber(button.innerText);

    };

});

// =============================
// Tombol Delete
// =============================

hapus.onclick = function(){

    deleteNumber();

};

// =============================
// Keyboard
// =============================

document.addEventListener("keydown",function(e){

    if(locked) return;

    if(e.key >= "0" && e.key <= "9"){

        inputNumber(e.key);

    }

    if(e.key === "Backspace"){

        deleteNumber();

    }

    if(e.key === "Escape"){

        resetPin();

    }

});