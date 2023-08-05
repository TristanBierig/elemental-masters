class Character extends MovableObject {
    spawnInterval;
    doubleJumpAvailable = true;
    isTransformed = false;
    isTransforming = false;
    isGameOver = false;
    isHitting = false;

    activeSpells = [];
    spellCooldownQ = false;
    spellCooldown = false;
    spellCooldown = false;

    walking_sound = playerSoundsRun;
    airborne_sound = playerSoundsFlying;
    punch_sound = playerSoundsPunch;
    gettingHurt_sound = playerSoundsHurt;
    transform_sound = playerSoundsTransform;
    gameOver_sound = playerSoundsGameOver;

    playRun = false;
    playAir = false;


    /**
     * This function sets an animationInterval to check continuously the state of the character and plays the proper animation
     * 
     */
    animateCharacter() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.animateDeath();
            } else if (this.isTransforming) {
                this.animateTransform();
            } else if (this.isTakingHit) {
                this.animateTakingHit();
            } else if (this.spellCooldownQ && this.isAirborne()) {
                this.animateQAttackAir();
            } else if (!this.isTakingHit && this.isAirborne() && this.speedY > 0) {
                this.animateJumpingUp();
            } else if (!this.isTakingHit && this.isAirborne() && this.speedY <= 0) {
                this.animateFallingDown();
            } else if (this.spellCooldownQ) {
                this.animateQAttack();
            } else if (!this.isTakingHit && world && world.keyboard.RIGHT || world.keyboard.LEFT) {
                this.animateMove();
            } else if (!this.isTakingHit) {
                this.animateIdle();
            }
        }, 1000 / 10);
    }


    /**
     * This function moves the character to left or right depending on key events and plays the walking sound while doing so and mutes it when character starts being airborne
     * 
     */
    characterMove() {
        this.moveToRight();
        this.moveToLeft();
        if (world && (!world.keyboard.LEFT && !world.keyboard.RIGHT) || this.isAirborne()) {
            if (this.playRun) {
                this.walking_sound.playpause();
                this.playRun = false;
            }
        }
    }


    /**
     * This function lets the character jump on certain key event and plays a sound while in the air. Allows for a single second jump while in the air.
     * Needs to be on ground first before having again access to the double jump
     * 
     */
    characterJump() {
        if (world && world.keyboard.SPACE == true && (!this.isAirborne() || (this.y < 120 && this.doubleJumpAvailable)) && !this.isTransforming) {
            this.jump();
            // Disables double jump when already jumped a second time while in air
            if (this.isAirborne() && this.y < 200 && this.doubleJumpAvailable) {
                this.doubleJumpAvailable = false;
            }
            if (!this.playAir) {
                this.airborne_sound.playpause();
                this.playAir = true;
            }
        }
        this.muteFlySound();
    }


    muteFlySound() {
        if (!this.isAirborne() && this.playAir && this.speedY < 0) {
            this.airborne_sound.playpause();
            this.playAir = false;
            this.doubleJumpAvailable = true;
        }
    }


    /**
     * This function handles the Q-Attack
     * 
     */
    characterAttackQ() {
        if (world && world.keyboard.Q == true && !this.spellCooldownQ && !this.isTransforming) {
            this.spellCooldownQ = true;
            // Expands hitbox to right synched with animation
            this.expandHitboxRight();
            // Expands hitbox to left synched with animation
            this.expandHitboxLeft();
            // Shrinks hitbox sychned with animation
            this.hitboxBackToDefault();
        }
    }


    expandHitboxRight() {
        if (this.movementStatus == 'RIGHT' || this.movementStatus == undefined) {
            if (!this.isTransformed) {
                setTimeout(() => {
                    this.offset = this.hitboxes.normalForm.qRight;
                }, 200);
            } else {
                setTimeout(() => {
                    this.offset = this.hitboxes.evolvedForm.qRight;
                }, 200);
            }
        }
    }


    expandHitboxLeft() {
        if (this.movementStatus == 'LEFT') {
            if (!this.isTransformed) {
                setTimeout(() => {
                    this.offset = this.hitboxes.normalForm.qLeft;
                }, 200);
            } else {
                setTimeout(() => {
                    this.offset = this.hitboxes.evolvedForm.qLeft;
                }, 200);
            }
        }
    }


    hitboxBackToDefault() {
        if (!this.isTransformed) {
            setTimeout(() => {
                this.spellCooldownQ = false;
                this.offset = this.hitboxes.normalForm.idle;
                this.isHitting = false;
            }, 500);
        } else {
            setTimeout(() => {
                this.spellCooldownQ = false;
                this.offset = this.hitboxes.evolvedForm.idle;
                this.isHitting = false;
            }, 500);
        }
    }


    /**
     * This function casts W-Spell only when having mana and the cooldown is up
     * 
     * @param {string} element - Defines the element of the character that is playing
     */
    characterAttackW(element) {
        if (world && world.keyboard.W == true && !this.spellCooldown && !this.isAirborne() && world.statusBar[1].percentage >= 10 && !this.isTransforming) {
            world.rockShatterAudio.play();
            this.setSpawnPointForWSpell(element);
            this.spellCooldown = true;
            world.statusBar[1].percentage -= 10;
            setTimeout(() => {
                this.spellCooldown = false;
            }, 1000);
        }
    }


    /**
     * This function sets the spawning point to left or right depending on character orientation
     * 
     * @param {string} element - Defines the element of the character that is playing
     */
    setSpawnPointForWSpell(element) {
        if (!this.isTransformed) {
            this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                this.y + this.offset.top,
                this.movementStatus,
                'W',
                this.activeSpells.length, element));
        } else {
            this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                this.y + this.offset.top + 52,
                this.movementStatus,
                'W',
                this.activeSpells.length, element));
        }
    }




    /**
     * Casts E-Spell only when having mana and the cooldown is up
     * 
     * @param {string} element - Defines the element of the character that is playing
     */
    characterAttackE(element) {
        if (world && world.keyboard.E == true && !this.spellCooldown && world.statusBar[1].percentage >= 10 && !this.isTransforming) {
            this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                this.y + this.offset.top,
                this.movementStatus,
                'E',
                this.activeSpells.length, element));
            this.spellCooldown = true;
            world.statusBar[1].percentage -= 10;
            setTimeout(() => {
                this.spellCooldown = false;
            }, 1000);
        }
    }


    characterTransform() {
        if (world && world.keyboard.R == true && world.statusBar[2].percentage >= 100 && !this.isTransformed) {
            this.isTransforming = true;
            this.isTransformed = true;
            if (this.isTransformed) {
                this.offset = this.hitboxes.evolvedForm.idle;
            }
        }
    }


    moveCamera() {
        world.camera_x = -this.x + 60; // 60 default
    }


    moveToRight() {
        if (world && world.keyboard.RIGHT == true && !this.isTransforming) {
            this.moveRight();
            if (!this.playRun) {
                this.walking_sound.playpause();
                this.playRun = true;
            }
            this.movementStatus = 'RIGHT';
        }
    }


    moveToLeft() {
        if (world && world.keyboard.LEFT == true && this.x > -550 && !this.isTransforming) {
            this.moveLeft();
            if (!this.playRun) {
                this.walking_sound.playpause();
                this.playRun = true;
            }
            this.movementStatus = 'LEFT';
        }
    }


    animateIdle() {
        if (!this.isTransformed) {
            this.playAnimation(this.imageCollection.IMAGES_IDLE);
        } else {
            this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_IDLE);
        }
        this.animationStatus = 'IDLE';
    }


    animateMove() {
        if (!this.isTransformed) {
            this.playAnimation(this.imageCollection.IMAGES_WALKING);
        } else {
            this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_MOVE);
        }
        this.animationStatus = 'RUN';
    }


    animateQAttack() {
        if (this.animationStatus != 'Q-ATTACK') {
            this.currentImage = 0;
            this.animationStatus = 'Q-ATTACK';
        }

        if (!this.isTransformed) {
            this.playAnimation(this.imageCollection.IMAGES_ATTACK_Q);
        } else {
            this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_ATTACK_Q);
        }
    }


    animateFallingDown() {
        if (!this.isTransformed) {
            this.playAnimation(this.imageCollection.IMAGES_JUMPING_DOWN);
        } else {
            this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_JUMPING_DOWN);
        }
        this.animationStatus = 'AIRBORNE';
    }


    animateJumpingUp() {
        if (!this.isTransformed) {
            this.playAnimation(this.imageCollection.IMAGES_JUMPING_UP);
        } else {
            this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_JUMPING_UP);
        }
        this.animationStatus = 'AIRBORNE';
    }


    animateQAttackAir() {
        if (this.animationStatus != 'Q-ATTACK') {
            this.currentImage = 0;
            this.animationStatus = 'Q-ATTACK';
        }
        if (!this.isTransformed) {
            this.playAnimation(this.imageCollection.IMAGES_ATTACK_Q_AIR);
        } else {
            this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_ATTACK_Q_AIR);
        }
    }


    animateDeath() {
        this.handleDeathFunctions();
        if (!this.isTransformed) {
            this.playAnimation(this.imageCollection.IMAGES_DEAD);
            if (this.currentImage == this.imageCollection.IMAGES_DEAD.length) {
                this.stopInterval(this.animationInterval);
            }
        } else {
            this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_DEAD);
            if (this.currentImage == this.imageCollection.IMAGES_TRANSFORM_DEAD.length) {
                this.stopInterval(this.animationInterval);
            }
        }
    }


    handleDeathFunctions() {
        if (this.animationStatus != 'DEAD') {
            this.currentImage = 0;
            this.animationStatus = 'DEAD';
            this.handleGameoverSounds();
            this.stopInterval(this.movementInterval);
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
    }


    /**
     * This function starts playing the game over music after a certain timeout depending on the character death animation time needed
     * 
     */
    handleGameoverSounds() {
        this.walking_sound.stop();
        playerSoundsGameOver.play();
        playerBackgroundIdle.pause();
        playerBackgroundBoss.pause();
        if (!this.isTransformed) {
            setTimeout(() => {
                playerSoundsGameOverLoop.play();
                GameOver(false);
            }, 2000);
        } else {
            setTimeout(() => {
                playerSoundsGameOverLoop.play();
                GameOver(false);
            }, 4000);
        }
    }


    animateTransform() {
        if (this.animationStatus != 'TRANSFORM') {
            this.currentImage = 0;
            this.animationStatus = 'TRANSFORM';
            this.transform_sound.play();
        }
        this.playAnimation(this.imageCollection.IMAGES_TRANSFORM);
        if (this.currentImage == this.imageCollection.IMAGES_TRANSFORM.length) {
            this.isTransforming = false;
        }
    }


    animateTakingHit() {
        if (this.animationStatus != 'HIT') {
            this.currentImage = 0;
            this.animationStatus = 'HIT';
            this.gettingHurt_sound.play();
        }
        if (!this.isTransformed) {
            this.playAnimation(this.imageCollection.IMAGES_TAKING_HIT);
        } else {
            this.playAnimation(this.imageCollection.IMAGES_TRANSFORM_TAKING_HIT);
        }
    }
}