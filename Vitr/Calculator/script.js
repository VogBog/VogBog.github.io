const inputPointsCount = document.getElementById("input-points-count");
const firstStep = document.getElementById("first-step");
const secondStep = document.getElementById("second-step");
const pointsElement = document.getElementById("points");
const successPoints = document.getElementById("success-points");
const almostSuccessPoints = document.getElementById("almost-success-points");

let statsElements = document.getElementsByClassName("stat-row");

const statsDescriptions = [
    {   "img" : "https://optim.tildacdn.com/tild6661-3830-4539-b538-326333393863/-/resize/90x/-/format/webp/photo.png.webp",
        "name" : "Самочувствие",
        "value" : 1
    },
    {
        "img" : "https://optim.tildacdn.com/tild3333-3231-4563-a433-373934373437/-/resize/90x/-/format/webp/photo.png.webp",
        "name" : "Внимание",
        "value" : 1
    },
    {
        "img" : "https://optim.tildacdn.com/tild6439-3338-4266-b133-323961393531/-/resize/90x/-/format/webp/photo.png.webp",
        "name" : "Движение",
        "value" : 1
    },
    {
        "img" : "https://optim.tildacdn.com/tild6236-3064-4439-b037-666133626562/-/resize/90x/-/format/webp/photo.png.webp",
        "name" : "Сражение",
        "value" : 1
    },
    {
        "img" : "https://optim.tildacdn.com/tild3539-6231-4065-b432-363330383865/-/resize/90x/-/format/webp/photo.png.webp",
        "name" : "Мышление",
        "value" : 1
    },
    {
        "img" : "https://optim.tildacdn.com/tild3037-3539-4635-a263-393663646432/-/resize/90x/-/format/webp/photo.png.webp",
        "name" : "Общение",
        "value" : 1
    }
];

const statsCosts = {
    1 : 0,
    2 : 3,
    3 : 6,
    4 : 9,
    5 : 12,
    6 : 15,
    7 : 999
}

let maxPoints = 60;
let points = 60;

function tryStartCalculator() {
    if(inputPointsCount.value > 0) {
        maxPoints = inputPointsCount.value * 6;
        points = maxPoints;

        firstStep.style.display = "none";
        secondStep.style.display = "flex";

        const statElementOriginal = statsElements[0];

        for(let i = 0; i < statsDescriptions.length; i++) {
            let statElementCopy = statElementOriginal.cloneNode(true);
            statsElements[statsElements.length - 1].insertAdjacentElement('afterend', statElementCopy);

            statElementCopy.getElementsByClassName("stat-icon")[0].src = statsDescriptions[i].img;
            statElementCopy.getElementsByClassName("stat-row__text")[0].innerText = statsDescriptions[i].name;

            const index = i;

            statElementCopy.getElementsByClassName("stat-row__button")[0].onclick = function() {
                addPoint(index);
            }
            statElementCopy.getElementsByClassName("stat-row__button")[1].onclick = function() {
                removePoint(index);
            }
        }

        statsElements[0].parentNode.removeChild(statsElements[0]);

        updatePointsElement();
    }
}

function updatePointsElement() {
    pointsElement.innerText = "Количество очков: " + points + "/" + maxPoints;

    for(let i = 0; i < statsDescriptions.length; i++) {
        const btns = statsElements[i].getElementsByClassName("stat-row__button");
        const addColor = canAdd(i) ? "#efefef" : "#efefef50";
        const removeColor = canRemove(i) ? "#efefef" : "#efefef50";

        btns[0].style.borderColor = addColor;
        btns[0].style.color = addColor;

        btns[1].style.borderColor = removeColor;
        btns[1].style.color = removeColor;
    }
}

function canAdd(index) {
    return statsCosts[statsDescriptions[index].value + 1] <= points && statsDescriptions[index].value < 6;
}

function canRemove(index) {
    return statsDescriptions[index].value > 1;
}

function addPoint(index) {
    let curPoints = statsCosts[statsDescriptions[index].value + 1];
    if(points < curPoints || statsDescriptions[index].value == 6)
        return; 

    points -= curPoints;
    statsDescriptions[index].value++;
    updateStatRowElement(index);

    if(points == 0) {
        successPoints.style.display = "inline";
        if(screen.width <= 510) {
            successPoints.style.display = "block";
        }
    }
    else {
        almostSuccessPoints.style.display = "none";
        checkForAddPointsAbility();
    }
}

function removePoint(index) {
    let curPoints = statsCosts[statsDescriptions[index].value];
    if(statsDescriptions[index].value <= 1)
        return;

    points += curPoints;
    statsDescriptions[index].value--;
    updateStatRowElement(index);

    successPoints.style.display = "none";
    almostSuccessPoints.style.display = "none";
}

function updateStatRowElement(index) {
    statsElements[index].getElementsByClassName("stat-row__value")[0].innerText = statsDescriptions[index].value;
    updatePointsElement();
}

function checkForAddPointsAbility() {
    for(let i = 0; i < statsDescriptions.length; i++) {
        let curPoints = statsCosts[statsDescriptions[i].value + 1];
        if(points >= curPoints)
            return;
    }
    almostSuccessPoints.style.display = "inline";
    if(screen.width <= 510) {
        almostSuccessPoints.style.display = "block";
    }
}