let currentPage = 1;
let currentSlide = 0;

const totalPages = 7;
const slides = document.querySelectorAll(".slide");
const emojiLayer = document.querySelector(".emoji-layer");
const fallLayer = document.querySelector(".fall-layer");
const noBtn = document.getElementById("noBtn");

/* let floatingInterval;
let fallingInterval; */
let heartInterval;

// ✅ ADDED (for slide-based continue logic)
const lyricsContinueBtn = document.getElementById("lyricsContinue");

/* PAGE NAVIGATION */

// function nextPage() {
//     document.getElementById("page" + currentPage).classList.remove("active");

//     // STOP hearts if leaving page 3
//     if (currentPage === 3) {
//         stopHearts();
//     }

//     currentPage++;

//     document.getElementById("page" + currentPage).classList.add("active");

//     changeBackground();

//     // START hearts only when entering page 3
//     if (currentPage === 3) {
//         startHearts();
//     }
// }

function nextPage() {
    document.getElementById("page" + currentPage).classList.remove("active");

    if (currentPage === 3) {
        stopHearts();
        // ❌ removed scroll detection
        lyricsContinueBtn.style.display = "none";
    }

    currentPage++;

    document.getElementById("page" + currentPage).classList.add("active");

    changeBackground();

    if (currentPage === 3) {
        startHearts();
        // ❌ no scroll listener anymore
    }
}



// function nextPage() {
//     document.getElementById("page" + currentPage).classList.remove("active");

//     currentPage++;

//     document.getElementById("page" + currentPage).classList.add("active");

//     changeBackground();
//     controlMusic();
// }

/* SOFT FLOATING HEARTS — ONLY FOR PAGE 3 */

// function createHeart() {
//     const heart = document.createElement("div");
//     heart.innerText = "💖";
//     heart.classList.add("lyrics-heart");

//     heart.style.left = Math.random() * 100 + "vw";
//     heart.style.fontSize = (18 + Math.random() * 20) + "px";
//     heart.style.animationDuration = (6 + Math.random() * 4) + "s";

//     fallLayer.appendChild(heart);

//     setTimeout(() => heart.remove(), 10000);
// }

function createHeart() {
    const symbols = ["💖", "✨"];
    const heart = document.createElement("div");

    heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    heart.classList.add("lyrics-heart");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (18 + Math.random() * 20) + "px";
    heart.style.animationDuration = (6 + Math.random() * 4) + "s";

    fallLayer.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}


function startHearts() {
    heartInterval = setInterval(createHeart, 400); // gentle density
}

function stopHearts() {
    clearInterval(heartInterval);
    fallLayer.innerHTML = "";
}



/* FLOATING EMOJIS PAGE 1 */

// function createFloating() {
//     const emojis = ["🤗", "🤭"];
//     const el = document.createElement("div");
//     el.innerText = emojis[Math.floor(Math.random()*2)];
//     el.style.position = "absolute";
//     el.style.left = Math.random()*100 + "vw";
//     el.style.top = Math.random()*100 + "vh";
//     el.style.fontSize = (30 + Math.random()*30) + "px";
//     emojiLayer.appendChild(el);
//     setTimeout(()=>el.remove(),4000);
// }

// function startFloating() {
//     floatingInterval = setInterval(createFloating, 100);
// }

// function stopFloating() {
//     clearInterval(floatingInterval);
//     emojiLayer.innerHTML = "";
// }

// startFloating();

// /* FALLING FULL WIDTH */

// function startFalling(symbol) {
//     clearInterval(fallingInterval);
//     fallingInterval = setInterval(() => {
//         const el = document.createElement("div");
//         el.innerText = symbol;
//         el.classList.add("falling");
//         el.style.left = Math.random()*100 + "vw";
//         el.style.fontSize = (25 + Math.random()*30) + "px";
//         el.style.animationDuration = (3 + Math.random()*2) + "s";
//         fallLayer.appendChild(el);
//         setTimeout(()=>el.remove(),5000);
//     }, 60);
// }

/* DOT SLIDER */

function showSlide(index) {
    slides[currentSlide].classList.remove("active-slide");
    document.querySelectorAll(".dot")[currentSlide].classList.remove("active-dot");

    currentSlide = index;

    slides[currentSlide].classList.add("active-slide");
    document.querySelectorAll(".dot")[currentSlide].classList.add("active-dot");

    // ✅ SHOW CONTINUE ONLY ON LAST SLIDE
    if (currentSlide === 2) {
        lyricsContinueBtn.style.display = "inline-block";
    } else {
        lyricsContinueBtn.style.display = "none";
    }
}

// function changeBackground() {

//     const backgrounds = {
//         1: "url('bg1.jpg')",
//         2: "url('bg2.jpg')",
//         3: "url('bg3.jpg')",
//         4: "url('roses-bg.jpg')",
//         5: "url('strawberry-bg.jpg')",
//         6: "url('soft-love-bg.jpg')",
//         7: "url('valentine-bg.jpg')"
//     };

//     if (backgrounds[currentPage]) {
//         document.body.style.backgroundImage = backgrounds[currentPage];
//     }
// }

function changeBackground() {

    const backgrounds = {
        1: "url('bg1.jpg')",
        2: "url('bg2.jpg')",
        3: "none",   // page 3 will be handled manually
        4: "url('roses-bg.png')",
        5: "url('strawberry-bg.jpg')",
        6: "url('soft-love-bg.jpg')",
        7: "url('valentine-bg.jpg')"
    };

    if (currentPage === 3) {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = ""; 
        document.body.style.background =
            "linear-gradient(135deg, #5a0016, #7a0022, #3d000f)";
    } else {
        document.body.style.background = ""; // reset gradient
        document.body.style.backgroundColor = "";
        document.body.style.backgroundImage = backgrounds[currentPage] || "";
    }

}



/* NO BUTTON JUMP */

noBtn.style.position = "absolute";

noBtn.addEventListener("mousemove", (e) => {
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - btnWidth;
    const maxY = window.innerHeight - btnHeight;

    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";
});


changeBackground(); // ← THIS LINE
