let canvas;
let world;
let keyboard = new Keyboard();
let charSelected = 'Earth';

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
        charSelected = 'Earth';
    }
    if (character == 2) {
        charSelected = 'Fire';
    }
    if (character == 3) {
        charSelected = 'Water';
    }
    if (character == 4) {
        charSelected = 'Wind';
    }
}


function startGame() {
    initLevel();
    startScreen.classList.add('d-none');
    sidebar.classList.remove('d-none');
    playerBackgroundIdle.playpause();
    world = new World(canvas, keyboard, charSelected);
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


function fullscreen(state) {
    let fullscreen = document.getElementById('canvasContainer');
    if (state == 'enter') {
        enterFullscreen(fullscreen);
    }
    if (state == 'exit') {
        exitFullscreen(fullscreen);
    }
}


function enterFullscreen(element) {
    let enterBtn = document.getElementById('enterFullscreen');
    let exitBtn = document.getElementById('exitFullscreen');

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
    enterBtn.classList.add('d-none');
    exitBtn.classList.remove('d-none');
}


function exitFullscreen() {
    let enterBtn = document.getElementById('enterFullscreen');
    let exitBtn = document.getElementById('exitFullscreen');

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    exitBtn.classList.add('d-none');
    enterBtn.classList.remove('d-none');
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
