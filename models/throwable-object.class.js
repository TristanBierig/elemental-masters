class ThrowableObject extends MovableObject {
    status;

    IMAGES_START = [
        'img/Earthspell/first/start/tile000.png',
        'img/Earthspell/first/start/tile001.png',
        'img/Earthspell/first/start/tile002.png',
        'img/Earthspell/first/start/tile003.png',
        'img/Earthspell/first/start/tile004.png',
        'img/Earthspell/first/start/tile005.png',
        'img/Earthspell/first/start/tile006.png'
    ];

    IMAGES_FLYING = [
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

    IMAGES_HITTING = [
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

    constructor(x, y, status) {
        super().loadImage(this.IMAGES_START[0]);
        this.loadImages(this.IMAGES_START);
        this.loadImages(this.IMAGES_FLYING);
        this.loadImages(this.IMAGES_HITTING);
        this.width = 96;
        this.height = 96;
        this.x = x;
        this.y = y;
        this.animate();
        this.status = status;
        this.speed = 4;
        this.speedY = 15;
        this.accelertion = 1;
        this.applyGravitiy(true);
    }


    animate() {
        setInterval(() => {
            if (this.status == 'RIGHT' || this.status == undefined) {
                this.moveRight();
            } 
            
            if (this.status == 'LEFT') {
                this.moveLeft();
            }

            this.updateHitbox();
            console.log('Rock-X:' + this.x);
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_FLYING);
        }, 1000 / 25);

    }


    updateHitbox() {
        this.hitbox_x_start = this.x + 24;
        this.hitbox_y_start = this.y + 16;
        this.hitbox_x_end = this.hitbox_x_start + (this.width - 56);
        this.hitbox_y_end = this.hitbox_y_start + (this.height - 48);
    }
}