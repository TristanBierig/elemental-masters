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
    if (screen.height < 480) {
        movementPanel.classList.remove('d-none');
        abilityPanel.classList.remove('d-none');
    }
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


function nextSlide() {
    howTo.classList.add('fadeOut');
    setTimeout(() => {
        nextBtnMobile.classList.add('d-none');
        charSelection.classList.remove('fadeOut');
        prevBtnMobile.classList.remove('fadeOut');
        charSelection.style = 'display: flex';
        prevBtnMobile.style = 'display: flex';
        charSelection.classList.add('fadeIn');
        prevBtnMobile.classList.add('fadeIn');
    }, 750);
}


function prevSlide() {
    charSelection.classList.add('fadeOut');
    prevBtnMobile.classList.add('fadeOut');
    setTimeout(() => {
        prevBtnMobile.style = 'display: none';
        nextBtnMobile.classList.remove('d-none');
        howTo.classList.remove('fadeOut');
        howTo.classList.add('fadeIn');
    }, 750);
}


/* ========== EventListener ========== */
window.addEventListener("keydown", (e) => {
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

window.addEventListener("keyup", (e) => {
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


document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
})
document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
})
document.getElementById('btnQ').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.Q = true;
})
document.getElementById('btnW').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.W = true;
})
document.getElementById('btnE').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.E = true;
})
document.getElementById('btnR').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.R = true;
})
document.getElementById('btnSpace').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
})


document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
})
document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
})
document.getElementById('btnQ').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.Q = false;
})
document.getElementById('btnW').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.W = false;
})
document.getElementById('btnE').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.E = false;
})
document.getElementById('btnR').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.R = false;
})
document.getElementById('btnSpace').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
})