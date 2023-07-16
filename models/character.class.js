class Character extends MovableObject {
    height = 256;
    width = 576;
    IMAGES_RUN = [
        'img/Character/png/run/run_1.png',
        'img/Character/png/run/run_2.png',
        'img/Character/png/run/run_3.png',
        'img/Character/png/run/run_4.png',
        'img/Character/png/run/run_5.png',
        'img/Character/png/run/run_6.png',
        'img/Character/png/run/run_7.png',
        'img/Character/png/run/run_8.png'
    ];
    world;
    speed = 2.5;

    constructor() {
        super().loadImage('img/Character/png/run/run_1.png');
        this.loadImages(this.IMAGES_RUN);
        this.animate();
    }

    animate() {
        // Move Horizontal
        setInterval(() => {
            if (this.world.keyboard.RIGHT == true){
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT == true){
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;
            console.log(this.x);
        }, 1000 / 60);

        // Run Animation
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                
                let i = this.currentImage % this.IMAGES_RUN.length;
                let path = this.IMAGES_RUN[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 80);
    }


    jump() {

    }
}