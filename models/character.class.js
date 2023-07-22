class Character extends MovableObject {
    height = 256;
    width = 576;
    x = -200;
    y = 150; // 205 Ground value
    speed = 2.5;
    hitbox_x_start;
    hitbox_y_start;
    hitbox_x_end;
    hitbox_y_end;

    takingHit;
    animationStatus;
    movementStatus;
    animationInterval;
    movementInterval;
    activeSpells = [];
    spellCooldown = false;

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

    IMAGES_ATTACK_E = [
        'img/Character/png/1_atk/1_atk_1.png',
        'img/Character/png/1_atk/1_atk_2.png',
        'img/Character/png/1_atk/1_atk_3.png',
        'img/Character/png/1_atk/1_atk_4.png',
        'img/Character/png/1_atk/1_atk_5.png',
        'img/Character/png/1_atk/1_atk_6.png'
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
        this.movementInterval = setInterval(() => {
            if (world && world.keyboard.RIGHT == true && this.x < world.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
                this.movementStatus = 'RIGHT';
            }

            if (world && world.keyboard.LEFT == true && this.x > -750) {
                this.moveLeft();
                this.walking_sound.play();
                this.movementStatus = 'LEFT';
            }

            // console.log('this.speedY =', this.speedY);

            if (world && world.keyboard.SPACE == true && !this.isAirborne()) {
                this.jump();
            }

            if (world && world.keyboard.E == true && !this.spellCooldown) {
                this.activeSpells.push(new ThrowableObject(this.hitbox_x_start + ((this.hitbox_x_end - this.hitbox_x_start) / 4), this.y + this.height / 2, this.movementStatus));
                this.spellCooldown = true;
                setTimeout(() => {
                    this.spellCooldown = false;
                }, 1000);
            }

            this.updateHitbox();

            world.camera_x = -this.x - 150;
            // console.log(this.y);
            // console.log(this.spellCooldown);
            console.log(this.x);
        }, 1000 / 60);


        // Just looping through ANIMATION frames (no movement here)            
        this.animationInterval = setInterval(() => {
            // debugger
            if (this.isDead()) {
                // Death Animation and stops Intervals
                if (this.animationStatus != 'DEAD') {
                    this.currentImage = 0;
                    this.animationStatus = 'DEAD';
                    this.stopInterval(this.movementInterval);
                }
                this.playAnimation(this.IMAGES_DEAD);
                if (this.currentImage == 18) {
                    this.stopInterval(this.animationInterval);
                }
            } else if (this.takingHit) {
                // Taking Hit
                if (this.animationStatus != 'HIT') {
                    this.currentImage = 0;
                    this.animationStatus = 'HIT';
                }
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
            // console.log(this.animationStatus);
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