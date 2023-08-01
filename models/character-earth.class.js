class CharacterEarth extends Character {
    imageCollection = {
        IMAGES_IDLE: allImages.characters.Earth.normalForm.movements.idle,
        IMAGES_WALKING: allImages.characters.Earth.normalForm.movements.move,
        IMAGES_JUMPING_UP: allImages.characters.Earth.normalForm.movements.jumpUp,
        IMAGES_JUMPING_DOWN: allImages.characters.Earth.normalForm.movements.jumpDown,
        IMAGES_TAKING_HIT: allImages.characters.Earth.normalForm.movements.takingHit,
        IMAGES_DEAD: allImages.characters.Earth.normalForm.movements.death,

        IMAGES_ATTACK_Q: allImages.characters.Earth.normalForm.abilities.qAttack,
        IMAGES_ATTACK_Q_AIR: allImages.characters.Earth.normalForm.abilities.qAttackAir,

        IMAGES_TRANSFORM: allImages.characters.Earth.normalForm.transform,
        IMAGES_TRANSFORM_IDLE: allImages.characters.Earth.evolvedForm.movements.idle,
        IMAGES_TRANSFORM_MOVE: allImages.characters.Earth.evolvedForm.movements.move,
        IMAGES_TRANSFORM_JUMPING_UP: allImages.characters.Earth.evolvedForm.movements.jumpUp,
        IMAGES_TRANSFORM_JUMPING_DOWN: allImages.characters.Earth.evolvedForm.movements.jumpDown,
        IMAGES_TRANSFORM_TAKING_HIT: allImages.characters.Earth.evolvedForm.movements.takingHit,
        IMAGES_TRANSFORM_DEAD: allImages.characters.Earth.evolvedForm.movements.death,

        IMAGES_TRANSFORM_ATTACK_Q: allImages.characters.Earth.evolvedForm.abilities.qAttack,
        IMAGES_TRANSFORM_ATTACK_Q_AIR: allImages.characters.Earth.evolvedForm.abilities.qAttackAir,
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
        this.y = 150; // 205 Ground value
        this.speed = 2.5;
        // Normal hitbox
        this.offset = {
            top: 172,
            bottom: 185,
            left: 275,
            right: 550
        };
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
            this.characterAttackW();
            this.characterAttackE();
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
                    this.transformAudio.play();
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
                    this.gettingHurtAudio.play();
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
        this.animationIntervalTransform = setInterval(() => {
            // Transform hitbox
            this.offset = {
                top: 120,
                bottom: 132,
                left: 250,
                right: 500
            };
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
                this.playAnimation(allImages.characters[`${this.choosenChar}`].evolvedForm.movements.death);
                if (this.currentImage == allImages.characters[`${this.choosenChar}`].evolvedForm.movements.death.length) {
                    this.stopInterval(this.animationIntervalTransform);
                }
            } else if (this.isTakingHit) {
                // Taking Hit
                if (this.animationStatus != 'HIT') {
                    this.currentImage = 0;
                    this.animationStatus = 'HIT';
                }
                this.playAnimation(allImages.characters[`${this.choosenChar}`].evolvedForm.movements.takingHit);
            } else if (this.spellCooldownQ && this.isAirborne()) {
                // Q-Attack in Air
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(allImages.characters[`${this.choosenChar}`].evolvedForm.abilities.qAttackAir);
            } else if (!this.isTakingHit && this.isAirborne() && this.speedY > 0) {
                // Jumping up
                this.playAnimation(allImages.characters[`${this.choosenChar}`].evolvedForm.movements.jumpUp);
                this.animationStatus = 'AIRBORNE';
            } else if (!this.isTakingHit && this.isAirborne() && this.speedY <= 0) {
                // Falling Down
                this.playAnimation(allImages.characters[`${this.choosenChar}`].evolvedForm.movements.jumpDown);
                this.animationStatus = 'AIRBORNE';
            } else if (this.spellCooldownQ) {
                // Q-ATTACK
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(allImages.characters[`${this.choosenChar}`].evolvedForm.abilities.qAttack);
            } else if (!this.isTakingHit && world && world.keyboard.RIGHT || world.keyboard.LEFT) {
                // Run Animation
                this.playAnimation(allImages.characters[`${this.choosenChar}`].evolvedForm.movements.move);
                this.animationStatus = 'RUN';
            }
            else if (!this.isTakingHit) {
                // Doing nothing
                this.playAnimation(allImages.characters[`${this.choosenChar}`].evolvedForm.movements.idle);
                this.animationStatus = 'IDLE';
            }
        }, 100);
    }
}