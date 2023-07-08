const colors = [
    { name: "Rosa", color: "pink" },
    { name: "Rojo", color: "red" },
    { name: "Azul", color: "blue" },
    { name: "Verde", color: "green" },
    { name: "Naranja", color: "orange" },
    { name: "Amarillo", color: "yellow" },
    { name: "Marron", color: "brown" },
    { name: "Turquesa", color: "turquoise" },
    { name: "Violeta", color: "purple" },
    { name: "Gris", color: "gray" },
    { name: "Verde claro", color: "lime" },
];

let score = 0;

function startGame() {
    generateColor();
    updateScore();
}

function generateColor() {
    const colorName = document.getElementById("colorName");
    const colorOptions = document.querySelectorAll(".colorOption");

    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomColorIndex];
    const randomColor2 = colors[Math.floor(Math.random() * colors.length)]

    colorName.textContent = randomColor.name;
    colorName.style.color = randomColor2.color;

    const optionIndexes = getRandomOptionIndexes(randomColorIndex);

    colorOptions.forEach((option, index) => {
        const optionColor = colors[optionIndexes[index]].color;
        option.style.backgroundColor = optionColor;

        option.removeEventListener("click", handleCorrectOption);
        option.removeEventListener("click", handleIncorrectOption);

        if (optionColor === randomColor.color) {
            option.addEventListener("click", handleCorrectOption);
        } else {
            option.addEventListener("click", handleIncorrectOption);
        }
    });
}

function getRandomOptionIndexes(correctIndex) {
    const indexes = [];
    while (indexes.length < 3) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        if (randomIndex !== correctIndex && !indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    indexes.push(correctIndex);
    return shuffleArray(indexes);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleCorrectOption() {
    increaseScore();
    generateColor();
}

function handleIncorrectOption() {
    gameOver();
}

function increaseScore() {
    score++;
    updateScore();
}

function gameOver() {
    resetScore();
    generateColor();
}

function resetScore() {
    score = 0;
    updateScore();
}

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = "Puntuación: " + score;
}

startGame();
