class Endboss extends MovableObject {
    isHitting = false;
    isTransformed = false;
    resetCurrentImage = true;
    isNextAttack = true;
    nextAttack;

    IMAGES_WALKING_BEFORE = [
        'img/Endboss/individual sprites/01_idle/idle_1.png',
        'img/Endboss/individual sprites/01_idle/idle_2.png',
        'img/Endboss/individual sprites/01_idle/idle_3.png',
        'img/Endboss/individual sprites/01_idle/idle_4.png',
        'img/Endboss/individual sprites/01_idle/idle_5.png',
        'img/Endboss/individual sprites/01_idle/idle_6.png'
    ];

    IMAGES_DEAD = [
        'img/Endboss/individual sprites/03_take_hit/take_hit_1.png',
        'img/Endboss/individual sprites/03_take_hit/take_hit_2.png',
        'img/Endboss/individual sprites/03_take_hit/take_hit_3.png',
        'img/Endboss/individual sprites/03_take_hit/take_hit_4.png',
        'img/Endboss/individual sprites/03_take_hit/take_hit_5.png',
        'img/Endboss/individual sprites/03_take_hit/take_hit_6.png',
        'img/Endboss/individual sprites/04_transform/transform_1.png',
        'img/Endboss/individual sprites/04_transform/transform_2.png',
        'img/Endboss/individual sprites/04_transform/transform_3.png',
        'img/Endboss/individual sprites/04_transform/transform_4.png',
        'img/Endboss/individual sprites/04_transform/transform_5.png',
        'img/Endboss/individual sprites/04_transform/transform_6.png',
        'img/Endboss/individual sprites/04_transform/transform_7.png',
        'img/Endboss/individual sprites/04_transform/transform_8.png',
        'img/Endboss/individual sprites/04_transform/transform_9.png',
        'img/Endboss/individual sprites/04_transform/transform_10.png',
        'img/Endboss/individual sprites/04_transform/transform_11.png',
        'img/Endboss/individual sprites/04_transform/transform_12.png',
        'img/Endboss/individual sprites/04_transform/transform_13.png',
        'img/Endboss/individual sprites/04_transform/transform_14.png',
        'img/Endboss/individual sprites/04_transform/transform_15.png',
        'img/Endboss/individual sprites/04_transform/transform_16.png',
        'img/Endboss/individual sprites/04_transform/transform_17.png',
        'img/Endboss/individual sprites/04_transform/transform_18.png',
        'img/Endboss/individual sprites/04_transform/transform_19.png',
        'img/Endboss/individual sprites/04_transform/transform_20.png',
        'img/Endboss/individual sprites/04_transform/transform_21.png',
        'img/Endboss/individual sprites/04_transform/transform_22.png',
        'img/Endboss/individual sprites/04_transform/transform_23.png',
        'img/Endboss/individual sprites/04_transform/transform_24.png',
        'img/Endboss/individual sprites/04_transform/transform_25.png',
        'img/Endboss/individual sprites/04_transform/transform_26.png',
        'img/Endboss/individual sprites/04_transform/transform_27.png',
        'img/Endboss/individual sprites/04_transform/transform_28.png',
        'img/Endboss/individual sprites/04_transform/transform_29.png',
        'img/Endboss/individual sprites/04_transform/transform_30.png',
        'img/Endboss/individual sprites/04_transform/transform_31.png',
        'img/Endboss/individual sprites/04_transform/transform_32.png'
    ];

    IMAGES_IDLE = [
        'img/Endboss/individual sprites/05_demon_idle/demon_idle_1.png',
        'img/Endboss/individual sprites/05_demon_idle/demon_idle_2.png',
        'img/Endboss/individual sprites/05_demon_idle/demon_idle_3.png',
        'img/Endboss/individual sprites/05_demon_idle/demon_idle_4.png',
        'img/Endboss/individual sprites/05_demon_idle/demon_idle_5.png',
        'img/Endboss/individual sprites/05_demon_idle/demon_idle_6.png',
    ];

    IMAGES_WALKING = [
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_1.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_2.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_3.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_4.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_5.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_6.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_7.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_8.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_9.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_10.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_11.png',
        'img/Endboss/individual sprites/06_demon_walk/demon_walk_12.png'
    ];

    IMAGES_SMASH = [
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_1.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_2.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_3.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_4.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_5.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_6.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_7.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_8.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_9.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_10.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_11.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_12.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_13.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_14.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_15.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_16.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_17.png',
        'img/Endboss/individual sprites/08_demon_smash/demon_smash_18.png',
    ];

    IMAGES_CLEAVE = [
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_1.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_2.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_3.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_4.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_5.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_6.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_7.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_8.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_9.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_10.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_11.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_12.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_13.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_14.png',
        'img/Endboss/individual sprites/07_demon_cleave/demon_cleave_15.png'
    ];


    IMAGES_BREATH = [
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_1.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_2.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_3.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_4.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_5.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_6.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_7.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_8.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_9.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_10.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_11.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_12.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_13.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_14.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_15.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_16.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_17.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_18.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_19.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_20.png',
        'img/Endboss/individual sprites/09_demon_fire_breath/demon_fire_breath_21.png'
    ];




    constructor(start) {
        super().loadImage(this.IMAGES_WALKING_BEFORE[0]);
        this.loadImages(this.IMAGES_WALKING_BEFORE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SMASH);
        this.loadImages(this.IMAGES_CLEAVE);
        this.loadImages(this.IMAGES_BREATH);
        // this.x = start + 1000; // 1000 default
        this.x = 0;
        this.y = 130;
        this.width = 576; // 576 default
        this.height = 320; // 320 default
        this.speed = 0.2; // 0.2 default

        // Defines the Hitbox in small Form
        this.offset = {
            top: 280,
            bottom: 280,
            left: 265,
            right: 540
        };
        this.movementStatus = 'MOVE';
        this.updateBoss();
    }


    updateBoss() {
        this.handleBossMovement();
        this.moveBoss();

        this.animationInterval = setInterval(() => {
            if (this.isDead() && !this.isTransformed) {
                // Triggers transform, stops movement and switches soundtracks
                if (world && this.animationStatus != 'DEAD') {
                    playerBackgroundIdle.playpause();
                    playerBackgroundBoss.playpause();
                    this.currentImage = 0;
                    this.animationStatus = 'DEAD';
                    this.offset.top = -200;
                    this.stopInterval(this.movementInterval);
                }
                this.playAnimation(this.IMAGES_DEAD);
                if (this.currentImage == this.IMAGES_DEAD.length) {
                    this.lifePoints = 100;
                    this.isTransformed = true;
                    this.animationStatus = 'SMASH';
                }
            } else if (!this.isTransformed) {
                this.playAnimation(this.IMAGES_WALKING_BEFORE);
            }


            // Handles animations after transformation
            if (this.isTransformed && this.animationStatus == 'SMASH') {
                if (this.resetCurrentImage) {
                    this.currentImage = 0;
                    this.resetCurrentImage = false;
                }
                this.playAnimation(this.IMAGES_SMASH);
                if (this.currentImage >= 12) {
                    this.setTransformHitbox();
                }

                // After spawn Boss does smash once and then starts running after Character
                if (this.currentImage == this.IMAGES_SMASH.length) {
                    this.animationStatus = 'MOVE';
                    this.setTransformHitbox();
                    this.moveBoss();
                    if (world) {
                        world.statusBar.push(new StatusBar(350, 380, true));
                    }
                }
                // Attacks with random spell when in reach of the character
            } else if (this.isTransformed && this.movementStatus == 'STAND') {
                if (this.isNextAttack) {
                    this.nextAttack = Math.random() * 100;
                    this.isNextAttack = false;
                }

                if (this.nextAttack >= 40) {
                    if (this.animationStatus != 'CLEAVE') {
                        this.currentImage = 0;
                        this.animationStatus = 'CLEAVE';
                    }

                    if (this.currentImage >= 10 && this.currentImage <= 13) {
                        this.setTransformHitbox();
                    }

                    this.playAnimation(this.IMAGES_CLEAVE);
                    if (this.currentImage >= 15) {
                        this.animationStatus = 'MOVE'
                        this.setTransformHitbox();
                        this.isNextAttack = true;
                    }
                }

                if (this.nextAttack < 40) {
                    if (this.animationStatus != 'BREATH') {
                        this.currentImage = 0;
                        this.animationStatus = 'BREATH';
                    }

                    this.playAnimation(this.IMAGES_BREATH);
                    if (this.currentImage >= 21) {
                        this.animationStatus = 'MOVE'
                        this.setTransformHitbox();
                        this.isNextAttack = true;
                    }
                }
                console.log(this.currentImage, this.animationStatus);
            } else if (this.isTransformed) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 5);
    }


    handleBossMovement() {
        setInterval(() => {
            if (world && world.character.x + world.character.offset.left + world.character.width - world.character.offset.right < this.x + this.offset.left - 50
                && this.animationStatus != 'CLEAVE' && this.animationStatus != 'BREATH') {
                this.movementStatus = 'MOVELEFT';
            }

            if (world && world.character.x + world.character.offset.left > this.x + this.offset.left + this.width - this.offset.right + 50
                && this.animationStatus != 'CLEAVE' && this.animationStatus != 'BREATH') {
                this.movementStatus = 'MOVERIGHT';
            }

            if (world && (world.character.x + world.character.offset.left + world.character.width - world.character.offset.right < this.x + this.offset.left
                && world.character.x + world.character.offset.left + world.character.width - world.character.offset.right > this.x + this.offset.left - 50)
                || (world.character.x + world.character.offset.left < this.x + this.offset.left + this.width - this.offset.right + 50
                    && world.character.x + world.character.offset.left > this.x + this.offset.left + this.width - this.offset.right)) {
                this.movementStatus = 'STAND'
            }
        }, 1000 / 25);
    }


    moveBoss() {
        this.movementInterval = setInterval(() => {
            if (this.movementStatus == 'MOVELEFT') {
                this.moveLeft();
                this.otherDirection = false;
            }
            if (this.movementStatus == 'MOVERIGHT') {
                this.moveRight();
                this.otherDirection = true;
            }
        }, 1000 / 25);
    }


    setTransformHitbox() {
        if (this.animationStatus == 'SMASH') {
            this.offset = {
                top: 175,
                bottom: 175,
                left: 100,
                right: 200
            };
        } else if (this.animationStatus == 'CLEAVE') {
            this.offset = {
                top: 175,
                bottom: 175,
                left: 80,
                right: 430
            };
        } else {
            // Defines big hitbox on walking/ idle
            this.offset = {
                top: 175,
                bottom: 175,
                left: 215,
                right: 430
            };
        }
    }
}