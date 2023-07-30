let canvas;
let world;
let keyboard = new Keyboard();
let choosenCharacter;


function init() {
    canvas = document.getElementById('canvas');
}


function chooseCharacter(character) {
    let characterPanel = document.getElementById(`character${character}`);
    for (let i = 1; i <= 4; i++) {
        const panel = document.getElementById(`character${i}`);
        panel.classList.remove(`highlight${i}`);
    }
    characterPanel.classList.add(`highlight${character}`);

    if (character == 1) {
        choosenCharacter = 'Earth';
    }
    if (character == 2) {
        choosenCharacter = 'Fire';
    }
    if (character == 3) {
        choosenCharacter = 'Water';
    }
    if (character == 4) {
        choosenCharacter = 'Wind';
    }
}


function startGame() {
    initLevel();
    startScreen.classList.add('d-none');
    sidebar.classList.remove('d-none');
    playerBackgroundIdle.playpause();
    world = new World(canvas, keyboard, choosenCharacter);
}


/**
 * 
 * @param {boolean} isVictory - Just given by the gameover function when its a win and then is always true 
 */
function GameOver(isVictory) {
    if (isVictory) {
        showVictoryScreen();
    } else {
        showLooseScreen();
    }
    endScreen.classList.remove('d-none');
}


function restartGame() {
    location.reload();
}


function showVictoryScreen() {
    endScreen.innerHTML = `
    <p>VICTORY</p>
        <span>You have defeated all enemy forces. Congratulations! </span>
        <span onclick="restartGame()">Play again</span>
    `;
}


function showLooseScreen() {
    endScreen.innerHTML = `
    <p>GAME OVER</p>
        <span>You have been defeated!</span>
        <span onclick="restartGame()">Try again</span>
    `;
}


window.addEventListener("keydown", function (e) {
    if (e.code == 'Escape') {
        keyboard.ESCAPE = true;
    }
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.code == 'KeyQ') {
        keyboard.Q = true;
    }
    if (e.code == 'KeyW') {
        keyboard.W = true;
    }
    if (e.code == 'KeyE') {
        keyboard.E = true;
    }
    if (e.code == 'KeyR') {
        keyboard.R = true;
    }
    if (!e.event && e.code == 'Space') {
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", function (e) {
    if (e.code == 'Escape') {
        keyboard.ESCAPE = false;
    }
    if (e.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.code == 'KeyQ') {
        keyboard.Q = false;
    }
    if (e.code == 'KeyW') {
        keyboard.W = false;
    }
    if (e.code == 'KeyE') {
        keyboard.E = false;
    }
    if (e.code == 'KeyR') {
        keyboard.R = false;
    }
    if (e.code == 'Space') {
        keyboard.SPACE = false;
    }
});
