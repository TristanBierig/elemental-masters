class Character extends MovableObject {
    takingHit;

    activeSpells = [];
    spellCooldown = false;

    walking_sound = playerSoundsRun;
    airborne_sound = playerSoundsFlying;
    playRun = false;
    playAir = false;

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
        this.height = 256;
        this.width = 576;
        this.x = -200;
        this.y = 150; // 205 Ground value
        this.speed = 2.5;
        // Defines the Hitbox
        this.offset = {
            top: 172,
            bottom: 185,
            left: 275,
            right: 550
        };
        this.applyGravitiy();
    }

    animate() {
        // Move Horizontal + plays running sound
        this.movementInterval = setInterval(() => {
            if (world && world.keyboard.RIGHT == true && this.x < world.level.level_end_x) {
                this.moveRight();
                if (!this.playRun) {
                    this.walking_sound.playpause();
                    this.playRun = true;
                }
                this.movementStatus = 'RIGHT';
            }

            if (world && world.keyboard.LEFT == true && this.x > -750) {
                this.moveLeft();
                if (!this.playRun) {
                    this.walking_sound.playpause();
                    this.playRun = true;
                }
                this.movementStatus = 'LEFT';
            }

            // Mutes running sound when standing or jumping
            if (world && (!world.keyboard.LEFT && !world.keyboard.RIGHT) || this.isAirborne()) {
                if (this.playRun) {
                    this.walking_sound.playpause();
                    this.playRun = false;
                }
            }

            // Plays flying sound
            if (world && world.keyboard.SPACE == true && !this.isAirborne()) {
                this.jump();
                if (!this.playAir) {
                    this.airborne_sound.playpause();
                    this.playAir = true;
                }
            }

            // Mutes fly sound on the the ground
            if (!this.isAirborne() && this.playAir && this.speedY < 0) {
                this.airborne_sound.playpause();
                this.playAir = false;
            }


            if (world && world.keyboard.E == true && !this.spellCooldown) {
                this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                    this.y + this.offset.top,
                    this.movementStatus));
                this.spellCooldown = true;
                setTimeout(() => {
                    this.spellCooldown = false;
                }, 1000);
            }

            world.camera_x = -this.x - 150;
            // console.log('this.speedY =', this.speedY);
            // console.log(this.y);
            // console.log(this.spellCooldown);
            // console.log(this.x);
        }, 1000 / 60);




        // Just looping through ANIMATION frames (no movement here)            
        this.animationInterval = setInterval(() => {
            // debugger
            if (this.isDead()) {
                // Death Animation and stops Intervals
                if (this.animationStatus != 'DEAD') {
                    this.currentImage = 0;
                    this.animationStatus = 'DEAD';
                    this.walking_sound.stop();
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
                this.animationStatus = 'AIRBORNE';
            } else if (!this.takingHit && this.isAirborne() && this.speedY <= 0) {
                // Falling Down
                this.playAnimation(this.IMAGES_JUMPING_DOWN);
                this.animationStatus = 'AIRBORNE';
            } else if (!this.takingHit && world && world.keyboard.RIGHT || world.keyboard.LEFT) {
                // Run Animation
                this.playAnimation(this.IMAGES_WALKING);
                this.animationStatus = 'RUN';
            }
            else if (!this.takingHit) {
                // Doing nothing
                this.playAnimation(this.IMAGES_IDLE);
                this.animationStatus = 'IDLE';
            }
            // console.log(this.animationStatus);
        }, 100);
    }
}