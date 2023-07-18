class Character extends MovableObject {
    height = 256;
    width = 576;
    x = -200;
    y = 150; // 205 Ground value
    IMAGES_WALKING = [
        'img/Character/png/run/run_1.png',
        'img/Character/png/run/run_2.png',
        'img/Character/png/run/run_3.png',
        'img/Character/png/run/run_4.png',
        'img/Character/png/run/run_5.png',
        'img/Character/png/run/run_6.png',
        'img/Character/png/run/run_7.png',
        'img/Character/png/run/run_8.png'
    ];

    IMAGES_JUMPING_UP = [
        'img/Character/png/j_up/j_up_1.png',
        'img/Character/png/j_up/j_up_2.png',
        'img/Character/png/j_up/j_up_3.png'
    ];

    IMAGES_JUMPING_DOWN = [
        'img/Character/png/j_down/j_down_1.png',
        'img/Character/png/j_down/j_down_2.png',
        'img/Character/png/j_down/j_down_3.png',
    ];

    IMAGES_IDLE = [
        'img/Character/png/idle/idle_1.png',
        'img/Character/png/idle/idle_2.png',
        'img/Character/png/idle/idle_3.png',
        'img/Character/png/idle/idle_4.png',
        'img/Character/png/idle/idle_5.png',
        'img/Character/png/idle/idle_6.png',
    ];

    //world;
    speed = 2.5;
    walking_sound = new Audio('audio/sound_effects/foodsteps_grass.mp3');

    constructor() {
        super().loadImage('img/Character/png/run/run_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_UP);
        this.loadImages(this.IMAGES_JUMPING_DOWN);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
        this.applyGravitiy();
    }

    animate() {
        this.walking_sound.pause();
        // Move Horizontal
        setInterval(() => {
            if (world && world.keyboard.RIGHT == true && this.x < world.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
            }

            if (world && world.keyboard.LEFT == true && this.x > -750) {
                this.moveLeft();
                this.walking_sound.play();
            }
            
            // console.log('this.speedY =', this.speedY);
            if (world && world.keyboard.SPACE == true && !this.isAirborne()) {
                this.jump();
            }

            world.camera_x = -this.x - 150;
            // console.log(this.y);
        }, 1000 / 60);


        // Just looping through ANIMATION frames (no movement here)            
        setInterval(() => {
            // Jumping Up
            if (this.isAirborne() && this.speedY > 0) {
                this.playAnimation(this.IMAGES_JUMPING_UP);
                // Falling Down
            } else if (this.isAirborne() && this.speedY <= 0) {
                this.playAnimation(this.IMAGES_JUMPING_DOWN);
            } else {
                // Run Animation
                if (world && world.keyboard.RIGHT || world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING)
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 80);
    }
}