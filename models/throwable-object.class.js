class ThrowableObject extends MovableObject {
    hit = false;
    category;
    index;

    IMAGES_START_E = [
        'img/Earthspell/first/start/tile000.png',
        'img/Earthspell/first/start/tile001.png',
        'img/Earthspell/first/start/tile002.png',
        'img/Earthspell/first/start/tile003.png',
        'img/Earthspell/first/start/tile004.png',
        'img/Earthspell/first/start/tile005.png',
        'img/Earthspell/first/start/tile006.png'
    ];

    IMAGES_FLYING_E = [
        'img/Earthspell/first/flying/tile013.png',
        'img/Earthspell/first/flying/tile014.png',
        'img/Earthspell/first/flying/tile015.png',
        'img/Earthspell/first/flying/tile016.png',
        'img/Earthspell/first/flying/tile017.png',
        'img/Earthspell/first/flying/tile018.png',
        'img/Earthspell/first/flying/tile019.png',
        'img/Earthspell/first/flying/tile020.png',
        'img/Earthspell/first/flying/tile021.png',
        'img/Earthspell/first/flying/tile022.png'
    ];

    IMAGES_HITTING_E = [
        'img/Earthspell/first/hitting/tile026.png',
        'img/Earthspell/first/hitting/tile027.png',
        'img/Earthspell/first/hitting/tile028.png',
        'img/Earthspell/first/hitting/tile029.png',
        'img/Earthspell/first/hitting/tile030.png',
        'img/Earthspell/first/hitting/tile031.png',
        'img/Earthspell/first/hitting/tile032.png',
        'img/Earthspell/first/hitting/tile033.png',
        'img/Earthspell/first/hitting/tile034.png'
    ];

    IMAGES_HITTING_W = [
        'img/Earthspell/W/tile000.png',
        'img/Earthspell/W/tile001.png',
        'img/Earthspell/W/tile002.png',
        'img/Earthspell/W/tile003.png',
        'img/Earthspell/W/tile004.png',
        'img/Earthspell/W/tile005.png',
        'img/Earthspell/W/tile006.png',
        'img/Earthspell/W/tile007.png',
        'img/Earthspell/W/tile008.png',
        'img/Earthspell/W/tile009.png',
        'img/Earthspell/W/tile010.png',
        'img/Earthspell/W/tile011.png',
        'img/Earthspell/W/tile012.png',
        'img/Earthspell/W/tile013.png',
        'img/Earthspell/W/tile014.png',
        'img/Earthspell/W/tile015.png',
        'img/Earthspell/W/tile016.png',
        'img/Earthspell/W/tile017.png',
        'img/Earthspell/W/tile018.png',
        'img/Earthspell/W/tile019.png',
    ];

    constructor(x, y, status, category, index) {
        // Empty png on first load
        super().loadImage('img/Enemies/Slime/BlueSlime/death/death_8.png');
        this.loadImages(this.IMAGES_START_E);
        this.loadImages(this.IMAGES_FLYING_E);
        this.loadImages(this.IMAGES_HITTING_E);
        this.loadImages(this.IMAGES_HITTING_W);
        this.width = 96;
        this.height = 96;
        this.x = x;
        this.y = y - 20;
        this.index = index;
        this.category = category;
        this.animationStatus = 'FLY';

        if (category == 'E') {
            this.movementStatus = status;
            this.x -= 56;
            this.animateE();
            this.speed = 8; // 4 default
            this.speedY = 15; // 15 default
            this.accelertion = 1; // 1 default
            this.applyGravitiy(true);
            if (!this.otherDirection) {
                this.offset = {
                    top: 30,
                    bottom: 62,
                    left: 12,
                    right: 68
                };
            } else {
                this.offset = {
                    top: 30,
                    bottom: 62,
                    left: 68,
                    right: 12
                };
            }
        }

        if (category == 'W') {
            this.y += 2;
            this.offset = {
                top: 30,
                bottom: 30,
                left: 12,
                right: 40
            };
            this.animateW();
            this.movementStatus = status;
            if (this.movementStatus == 'LEFT') {
                this.x -= 120;
            }
        }
    }


    animateE() {
        this.movementInterval = setInterval(() => {
            if (this.movementStatus == 'RIGHT' || this.movementStatus == undefined) {
                this.moveRight();
            }

            if (this.movementStatus == 'LEFT') {
                this.moveLeft();
            }
        }, 1000 / 25);

        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                // Death Animation and stops Intervals
                if (this.animationStatus != 'DEAD') {
                    this.currentImage = 0;
                    this.animationStatus = 'DEAD';
                    setTimeout(() => {
                        this.stopInterval(this.movementInterval);
                    }, 1200);
                }
                this.playAnimation(this.IMAGES_HITTING_E);
                if (this.currentImage == 9) {
                    this.stopInterval(this.animationInterval);
                }
            } else {
                this.playAnimation(this.IMAGES_FLYING_E);
            }
        }, 1000 / 25);
    }


    animateW() {
        this.movementInterval = setInterval(() => {
            if (this.movementStatus == 'LEFT') {
                this.otherDirection = true;
            }
        }, 1000 / 25);

        this.animationInterval = setInterval(() => {
            if (this.animationStatus != 'ONCE') {
                this.currentImage = 0;
                this.animationStatus = 'ONCE';
            }
            this.playAnimation(this.IMAGES_HITTING_W);

            if (this.currentImage >= 20) {
                this.stopInterval(this.animationInterval);
                world.character.activeSpells.splice(this.index, 1);
            }
        }, 1000 / 25);
    }
}