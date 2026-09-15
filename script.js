const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const planButton = document.getElementById("planButton");
const lockButton = document.getElementById("lockButton");

const firstPage = document.querySelector(".container");
const secondPage = document.getElementById("secondPage");
const thirdPage = document.getElementById("thirdPage");
const finalPage = document.getElementById("finalPage");

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const vibeInput = document.getElementById("vibe");
const foodInput = document.getElementById("food");

const finalDate = document.getElementById("finalDate");
const finalTime = document.getElementById("finalTime");
const finalVibe = document.getElementById("finalVibe");
const finalFood = document.getElementById("finalFood");

lockButton.addEventListener("click", () => {

    const date = dateInput.value;
    const time = timeInput.value;
    const vibe = vibeInput.options[vibeInput.selectedIndex].text;
    const food = foodInput.options[foodInput.selectedIndex].text;

    fetch("http://localhost:3000/submit", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            date: date,
            time: time,
            vibe: vibe,
            food: food
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
        thirdPage.style.display = "none";
        finalPage.style.display = "block";
        finalDate.textContent = date;
        finalTime.textContent = time;
        finalVibe.textContent = vibe;
	finalFood.textContent = food;
    })
    .catch(error => {
        console.error("Error sending data:", error);
        alert("Something went wrong. Please try again ❤️");
    });
});

setTimeout(() => {
    planButton.style.display = "inline-block";
}, 5200);

planButton.addEventListener("click", () => {
    secondPage.style.display = "none";
    thirdPage.style.display = "block";
});

const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

noButton.addEventListener("mouseenter", () => {
    noButton.style.position = "fixed";

    const questionBox = document
        .getElementById("question")
        .getBoundingClientRect();

    const yesBox = yesButton.getBoundingClientRect();

    let x;
    let y;

    do {
        x = Math.random() * (window.innerWidth - noButton.offsetWidth);
        y = Math.random() * (window.innerHeight - noButton.offsetHeight);
    } while (
        // position overlaps question
        x < questionBox.right &&
        x + noButton.offsetWidth > questionBox.left &&
        y < questionBox.bottom &&
        y + noButton.offsetHeight > questionBox.top ||

        // position overlaps Yes button
        x < yesBox.right &&
        x + noButton.offsetWidth > yesBox.left &&
        y < yesBox.bottom &&
        y + noButton.offsetHeight > yesBox.top
    );

    noButton.style.left = x + "px";
    noButton.style.top = y + "px";
});

yesButton.addEventListener("click", () => {
    firstPage.style.display = "none";
    secondPage.style.display = "block";

    for (let i=0; i<100; i++) {
	createHeart();
    }

    setTimeout(() => {
        for (let burst = 0; burst < 5; burst++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            for (let i = 0; i < 25; i++) {
                createConfetti(x, y);
            }
        }
    }, 3000);
});

function checkChoices() {
    if (
        dateInput.value &&
        timeInput.value &&
        vibeInput.value &&
        foodInput.value
    ) {
        lockButton.style.display = "inline-block";
    } else {
        lockButton.style.display = "none";
    }
}

dateInput.addEventListener("change", checkChoices);
timeInput.addEventListener("change", checkChoices);
vibeInput.addEventListener("change", checkChoices);
foodInput.addEventListener("change", checkChoices);

function createHeart() {
    const heart = document.createElement("div");
    const emojis = ["😘", "🥰", "❤️", "💋", "💕", "😍"];
    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "%";
    heart.style.bottom = Math.random() * 100 + "%";
    heart.style.fontSize = Math.random() * 30 + 50 +"px"
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

function createConfetti(x, y) {
    const confetti = document.createElement("div");

    const shapes = ["square", "circle", "rectangle"];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    confetti.classList.add("confetti", shape);

    // Starting position of this burst
    confetti.style.left = x + "px";
    confetti.style.top = y + "px";

    const colors = [
        "#ff4081",
        "#ffeb3b",
        "#4caf50",
        "#2196f3",
        "#9c27b0",
        "#ff9800"
    ];

    confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

    // Random direction
    const angle = Math.random() * Math.PI * 2;

    // Random distance
    const distance = Math.random() * 150 + 80;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    const rotation = Math.random() * 720 - 360;

    confetti.animate(
        [
            {
                transform: "translate(-50%, -50%) rotate(0deg)",
                opacity: 1
            },
            {
                transform: `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`,
                opacity: 0
            }
        ],
        {
            duration: 1000,
            easing: "ease-out"
        }
    );

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 1000);
}
