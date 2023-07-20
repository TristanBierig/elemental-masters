class Character extends MovableObject {
    height = 256;
    width = 576;
    x = -200;
    y = 150; // 205 Ground value
    takingHit;
    hitbox_x_start;
    hitbox_y_start;
    hitbox_x_end;
    hitbox_y_end;
    speed = 2.5;
    walking_sound = new Audio('audio/sound_effects/foodsteps_grass.mp3');

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

    IMAGES_TAKING_HIT = [
        'img/Character/png/take_hit/take_hit_1.png',
        'img/Character/png/take_hit/take_hit_2.png',
        'img/Character/png/take_hit/take_hit_3.png',
        'img/Character/png/take_hit/take_hit_4.png',
        'img/Character/png/take_hit/take_hit_5.png',
        'img/Character/png/take_hit/take_hit_6.png'
    ];

    IMAGES_DEAD = [
        'img/Character/png/death/death_1.png',
        'img/Character/png/death/death_2.png',
        'img/Character/png/death/death_3.png',
        'img/Character/png/death/death_4.png',
        'img/Character/png/death/death_5.png',
        'img/Character/png/death/death_6.png',
        'img/Character/png/death/death_7.png',
        'img/Character/png/death/death_8.png',
        'img/Character/png/death/death_9.png',
        'img/Character/png/death/death_10.png',
        'img/Character/png/death/death_11.png',
        'img/Character/png/death/death_12.png',
        'img/Character/png/death/death_13.png',
        'img/Character/png/death/death_14.png',
        'img/Character/png/death/death_15.png',
        'img/Character/png/death/death_16.png',
        'img/Character/png/death/death_17.png',
        'img/Character/png/death/death_18.png',
    ];


    constructor() {
        super().loadImage('img/Character/png/run/run_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_UP);
        this.loadImages(this.IMAGES_JUMPING_DOWN);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_TAKING_HIT);
        this.loadImages(this.IMAGES_DEAD);
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

            this.updateHitbox();

            world.camera_x = -this.x - 150;
            // console.log(this.y);
        }, 1000 / 60);


        // Just looping through ANIMATION frames (no movement here)            
        setInterval(() => {
            // debugger
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.takingHit) {
                // Taking Hit
                this.playAnimation(this.IMAGES_TAKING_HIT);
            } else if (!this.takingHit && this.isAirborne() && this.speedY > 0) {
                // Jumping up
                this.playAnimation(this.IMAGES_JUMPING_UP);
            } else if (!this.takingHit && this.isAirborne() && this.speedY <= 0) {
                // Falling Down
                this.playAnimation(this.IMAGES_JUMPING_DOWN);
            } else if (!this.takingHit && world && world.keyboard.RIGHT || world.keyboard.LEFT) {
                // Run Animation
                this.playAnimation(this.IMAGES_WALKING)
            }
            else if (!this.takingHit) {
                // Doing nothing
                this.playAnimation(this.IMAGES_IDLE);
            }

        }, 100);
    }


    /**
     * This functions updates the Hitbox on moving the character and the integers are setting the hitbox to the direct outline of the character in basic form
     * 
     */
    updateHitbox() {
        this.hitbox_x_start = this.x + 260;
        this.hitbox_y_start = this.y + 170;
        this.hitbox_x_end = this.hitbox_x_start + (this.width - 520);
        this.hitbox_y_end = this.hitbox_y_start + (this.height - 180);
    }
}