let canvas;
let ctx;
let character = new Image();


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    character.src = '../img/Elementals_ground_monk_FULL_v1.3/png/run/run_1.png';

    ctx.drawImage(character, 20, 20, 150, 150);
}