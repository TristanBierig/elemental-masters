class Endboss extends MovableObject {
    isHitting = false;
    isTransform = false;

    IMAGES_WALKING = [
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


    constructor(start) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SMASH);
        // this.x = start + 1000; // 1000 default
        this.x = 0;
        this.y = 130;
        this.width = 576; // 576 default
        this.height = 320; // 320 default
        this.speed = 0; // 0.2 default

        // Defines the Hitbox in small Form
        this.offset = {
            top: 280,
            bottom: 280,
            left: 265,
            right: 540
        };
        this.animate();
    }

    animate() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (this.isDead() && !this.isTransform) {
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
                    this.isTransform = true;
                    this.movementStatus = 'FIRST';
                }
                // First time out of transform he performs a smash
            } else if (this.isTransform && this.movementStatus == 'FIRST') {
                if (this.animationStatus != 'SMASH') {
                    this.currentImage = 0;
                    this.animationStatus = 'SMASH';
                }
                this.playAnimation(this.IMAGES_SMASH);
                if (this.currentImage >= 12) {
                    this.setTransformHitbox();
                }

                if (this.currentImage == this.IMAGES_SMASH.length) {
                    this.animationStatus = 'IDLE';
                    this.movementStatus = 'IDLE';
                    this.setTransformHitbox();
                }
            } else if (this.isTransform && this.movementStatus == 'IDLE') {
                this.playAnimation(this.IMAGES_IDLE);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 1000 / 5);
    }


    setTransformHitbox() {
        if (this.animationStatus == 'SMASH') {
            this.offset = {
                top: 175,
                bottom: 175,
                left: 100,
                right: 200
            };
        } else {
            // Defines big hitbox
            this.offset = {
                top: 175,
                bottom: 175,
                left: 215,
                right: 430
            };
        }
    }
}