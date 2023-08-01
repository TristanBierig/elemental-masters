class CharacterWind extends Character {
    imageCollection = {
        IMAGES_IDLE: allImages.characters.Wind.normalForm.movements.idle,
        IMAGES_WALKING: allImages.characters.Wind.normalForm.movements.move,
        IMAGES_JUMPING_UP: allImages.characters.Wind.normalForm.movements.jumpUp,
        IMAGES_JUMPING_DOWN: allImages.characters.Wind.normalForm.movements.jumpDown,
        IMAGES_TAKING_HIT: allImages.characters.Wind.normalForm.movements.takingHit,
        IMAGES_DEAD: allImages.characters.Wind.normalForm.movements.death,
        IMAGES_ATTACK_Q: allImages.characters.Wind.normalForm.abilities.qAttack,
        IMAGES_ATTACK_Q_AIR: allImages.characters.Wind.normalForm.abilities.qAttackAir,
        IMAGES_TRANSFORM: allImages.characters.Wind.normalForm.transform,
        IMAGES_TRANSFORM_IDLE: allImages.characters.Wind.evolvedForm.movements.idle,
        IMAGES_TRANSFORM_MOVE: allImages.characters.Wind.evolvedForm.movements.move,
        IMAGES_TRANSFORM_JUMPING_UP: allImages.characters.Wind.evolvedForm.movements.jumpUp,
        IMAGES_TRANSFORM_JUMPING_DOWN: allImages.characters.Wind.evolvedForm.movements.jumpDown,
        IMAGES_TRANSFORM_TAKING_HIT: allImages.characters.Wind.evolvedForm.movements.takingHit,
        IMAGES_TRANSFORM_DEAD: allImages.characters.Wind.evolvedForm.movements.death,
        IMAGES_TRANSFORM_ATTACK_Q: allImages.characters.Wind.evolvedForm.abilities.qAttack,
        IMAGES_TRANSFORM_ATTACK_Q_AIR: allImages.characters.Wind.evolvedForm.abilities.qAttackAir,
    }

    hitboxes = {
        normalForm: {
            idle: {
                top: 180,
                bottom: 182,
                left: 270,
                right: 540
            },
            qRight: {
                top: 172,
                bottom: 172,
                left: 275,
                right: 490
            },
            qLeft: {
                top: 172,
                bottom: 172,
                left: 235,
                right: 540
            }
        },
        evolvedForm: {
            idle: {
                top: 145,
                bottom: 147,
                left: 265,
                right: 520
            },
            qRight: {
                top: 145,
                bottom: 147,
                left: 275,
                right: 320
            },
            qLeft: {
                top: 145,
                bottom: 147,
                left: 75,
                right: 320
            }
        }
    }


    constructor() {
        super();
        this.loadImage(this.imageCollection.IMAGES_IDLE[0]);
        for (let arr in this.imageCollection) {
            this.loadImages(this.imageCollection[arr]);
        }
        this.height = 256;
        this.width = 576;
        this.x = -200; // -200 default
        this.y = 150; // 192 Ground value
        this.speed = 2.5;
        this.offset = this.hitboxes.normalForm.idle;
        this.updateCharacter();
        this.applyGravitiy();
        this.animateCharacterNormal();
        this.gameOver();
    }


    updateCharacter() {
        this.movementInterval = setInterval(() => {
            this.characterMove();
            this.characterJump();
            this.characterAttackQ();
            this.characterAttackW('Wind');
            this.characterAttackE('Wind');
            this.characterTransform();
            this.moveCamera();
        }, 1000 / 60);
    }


    gameOver() {
        setInterval(() => {
            if (this.isGameOver) {
                this.stopInterval(this.movementInterval);
                this.stopInterval(this.animationIntervalNormal);
                this.stopInterval(this.animationIntervalTransform);
            }
        }, 1000);
    }


    animateCharacterNormal() {
        this.animationIntervalNormal = setInterval(() => {
            if (this.isDead()) {
                // Death Animation and stops Intervals
                if (this.animationStatus != 'DEAD') {
                    this.currentImage = 0;
                    this.animationStatus = 'DEAD';
                    this.walking_sound.stop();
                    playerSoundsGameOver.play();
                    playerBackgroundIdle.pause();
                    playerBackgroundBoss.pause();
                    setTimeout(() => {
                        playerSoundsGameOverLoop.play();
                        GameOver(false);
                    }, 2000);
                    this.stopInterval(this.movementInterval);
                }
                this.playAnimation(this.imageCollection.IMAGES_DEAD);
                if (this.currentImage == this.imageCollection.IMAGES_DEAD.length) {
                    this.stopInterval(this.animationIntervalNormal);
                }
            } else if (this.isTransforming) {
                // Transforming
                if (this.animationStatus != 'TRANSFORM') {
                    this.currentImage = 0;
                    this.animationStatus = 'TRANSFORM';
                    this.transform_sound.play();
                }
                this.playAnimation(this.imageCollection.IMAGES_TRANSFORM);
                if (this.currentImage == this.imageCollection.IMAGES_TRANSFORM.length) {
                    this.stopInterval(this.animationIntervalNormal);
                    this.animateCharacterTransform();
                    this.isTransforming = false;
                }
            } else if (this.isTakingHit) {
                // Taking Hit
                if (this.animationStatus != 'HIT') {
                    this.currentImage = 0;
                    this.animationStatus = 'HIT';
                    this.gettingHurt_sound.play();
                }
                this.playAnimation(this.imageCollection.IMAGES_TAKING_HIT);
            } else if (this.spellCooldownQ && this.isAirborne()) {
                // Q-Attack in Air
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(this.imageCollection.IMAGES_ATTACK_Q_AIR);
            } else if (!this.isTakingHit && this.isAirborne() && this.speedY > 0) {
                // Jumping up
                this.playAnimation(this.imageCollection.IMAGES_JUMPING_UP);
                this.animationStatus = 'AIRBORNE';
            } else if (!this.isTakingHit && this.isAirborne() && this.speedY <= 0) {
                // Falling Down
                this.playAnimation(this.imageCollection.IMAGES_JUMPING_DOWN);
                this.animationStatus = 'AIRBORNE';
            } else if (this.spellCooldownQ) {
                // Q-ATTACK
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(this.imageCollection.IMAGES_ATTACK_Q);
            } else if (!this.isTakingHit && world && world.keyboard.RIGHT || world.keyboard.LEFT) {
                // Run Animation
                this.playAnimation(this.imageCollection.IMAGES_WALKING);
                this.animationStatus = 'RUN';
            }
            else if (!this.isTakingHit) {
                // Doing nothing
                this.playAnimation(this.imageCollection.IMAGES_IDLE);
                this.animationStatus = 'IDLE';
            }
        }, 1000 / 10);
    }


    // Handles animations in evolved Transform
    animateCharacterTransform() {
        this.offset = this.hitboxes.evolvedForm.idle;
        this.animationIntervalTransform = setInterval(() => {
            if (this.isDead()) {
                // Death Animation and stops Intervals
                if (this.animationStatus != 'DEAD') {
                    this.currentImage = 0;
                    this.animationStatus = 'DEAD';
                    this.walking_sound.stop();
                    playerSoundsGameOver.play();
                    playerBackgroundIdle.pause();
                    playerBackgroundBoss.pause();
                    setTimeout(() => {
                        playerSoundsGameOverLoop.play();
                        GameOver(false);
                    }, 4000);
                    this.stopInterval(this.movementInterval);
                }
                this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_DEAD);
                if (this.currentImage == this.imageCollection.IMAGES_TRANSFORM_DEAD.length) {
                    this.stopInterval(this.animationIntervalTransform);
                }
            } else if (this.isTakingHit) {
                // Taking Hit
                if (this.animationStatus != 'HIT') {
                    this.currentImage = 0;
                    this.animationStatus = 'HIT';
                }
                this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_TAKING_HIT);
            } else if (this.spellCooldownQ && this.isAirborne()) {
                // Q-Attack in Air
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_ATTACK_Q_AIR);
            } else if (!this.isTakingHit && this.isAirborne() && this.speedY > 0) {
                // Jumping up
                this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_JUMPING_UP);
                this.animationStatus = 'AIRBORNE';
            } else if (!this.isTakingHit && this.isAirborne() && this.speedY <= 0) {
                // Falling Down
                this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_JUMPING_DOWN);
                this.animationStatus = 'AIRBORNE';
            } else if (this.spellCooldownQ) {
                // Q-ATTACK
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_ATTACK_Q);
            } else if (!this.isTakingHit && world && world.keyboard.RIGHT || world.keyboard.LEFT) {
                // Run Animation
                this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_MOVE);
                this.animationStatus = 'RUN';
            }
            else if (!this.isTakingHit) {
                // Doing nothing
                this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_IDLE);
                this.animationStatus = 'IDLE';
            }
        }, 100);
    }
}