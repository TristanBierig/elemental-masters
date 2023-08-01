class CharacterFire extends MovableObject {
    spawnInterval;
    doubleJumpAvailable = true;
    isTransformed = false;
    isTransforming = false;
    isGameOver = false;
    isHitting = false;
    choosenChar;

    activeSpells = [];
    spellCooldownQ = false;
    spellCooldownW = false;
    spellCooldownE = false;

    walking_sound = playerSoundsRun;
    airborne_sound = playerSoundsFlying;
    punch_sound = playerSoundsPunch;
    gettingHurtAudio = playerSoundsHurt;
    transformAudio = playerSoundsTransform;
    GameOverAudio = playerSoundsGameOver;

    playRun = false;
    playAir = false;

    constructor(choosenChar) {
        super();
        this.choosenChar = choosenChar;
        this.loadImage(allImages.characters[`${choosenChar}`].normalForm.movements.idle[0]);
        this.loadImages(allImages.characters[`${choosenChar}`].normalForm.movements.move);
        this.loadImages(allImages.characters[`${choosenChar}`].normalForm.movements.jumpUp);
        this.loadImages(allImages.characters[`${choosenChar}`].normalForm.movements.jumpDown);
        this.loadImages(allImages.characters[`${choosenChar}`].normalForm.movements.idle);
        this.loadImages(allImages.characters[`${choosenChar}`].normalForm.movements.takingHit);
        this.loadImages(allImages.characters[`${choosenChar}`].normalForm.movements.death);
        this.loadImages(allImages.characters[`${choosenChar}`].normalForm.abilities.qAttack);
        this.loadImages(allImages.characters[`${choosenChar}`].normalForm.abilities.qAttackAir);
        this.loadImages(allImages.characters[`${choosenChar}`].normalForm.transform);
        this.loadImages(allImages.characters[`${choosenChar}`].evolvedForm.movements.idle);
        this.loadImages(allImages.characters[`${choosenChar}`].evolvedForm.movements.move);
        this.loadImages(allImages.characters[`${choosenChar}`].evolvedForm.movements.jumpUp);
        this.loadImages(allImages.characters[`${choosenChar}`].evolvedForm.movements.jumpDown);
        this.loadImages(allImages.characters[`${choosenChar}`].evolvedForm.movements.takingHit);
        this.loadImages(allImages.characters[`${choosenChar}`].evolvedForm.movements.death);
        this.loadImages(allImages.characters[`${choosenChar}`].evolvedForm.abilities.qAttack);
        this.loadImages(allImages.characters[`${choosenChar}`].evolvedForm.abilities.qAttackAir);
        this.updateCharacter();
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
        this.applyGravitiy();
    }


    updateCharacter() {
        // Move Horizontal + plays running sound
        this.movementInterval = setInterval(() => {
            if (world && world.keyboard.RIGHT == true && !this.isTransforming) {
                this.moveRight();
                if (!this.playRun) {
                    this.walking_sound.playpause();
                    this.playRun = true;
                }
                this.movementStatus = 'RIGHT';
            }

            if (world && world.keyboard.LEFT == true && this.x > -550 && !this.isTransforming) {
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

            // Jumps or doubleJump and plays flying sound
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

            // Mutes fly sound on the the ground
            if (!this.isAirborne() && this.playAir && this.speedY < 0) {
                this.airborne_sound.playpause();
                this.playAir = false;
                this.doubleJumpAvailable = true;
            }

            // Cast Q-Attack
            if (world && world.keyboard.Q == true && !this.spellCooldownQ && !this.isTransforming) {
                this.spellCooldownQ = true;

                // Expands hitbox to right synched with animation
                if (this.movementStatus == 'RIGHT' || this.movementStatus == undefined) {
                    if (!this.isTransformed) {
                        setTimeout(() => {
                            this.offset = {
                                top: 172,
                                bottom: 185,
                                left: 275,
                                right: 510
                            }
                            this.punch_sound.playpause();
                        }, 200);
                    } else {
                        // Handles Transformed punch hitbox
                        setTimeout(() => {
                            this.offset = {
                                top: 120,
                                bottom: 132,
                                left: 275,
                                right: 400
                            }
                            this.punch_sound.playpause();
                        }, 200);
                    }
                }

                // Expands hitbox to left synched with animation
                if (this.movementStatus == 'LEFT') {

                    if (!this.isTransformed) {
                        setTimeout(() => {
                            this.offset = {
                                top: 172,
                                bottom: 185,
                                left: 235,
                                right: 550
                            }
                            this.punch_sound.playpause();
                        }, 200);
                    } else {
                        // Handles Transformed punch hitbox
                        setTimeout(() => {
                            this.offset = {
                                top: 120,
                                bottom: 132,
                                left: 150,
                                right: 550
                            }
                            this.punch_sound.playpause();
                        }, 200);
                    }
                }

                // Shrinks hitbox sychned with animation
                if (!this.isTransformed) {
                    setTimeout(() => {
                        this.spellCooldownQ = false;
                        this.offset = {
                            top: 172,
                            bottom: 185,
                            left: 275,
                            right: 550
                        };
                        this.isHitting = false;
                    }, 500);
                } else {
                    // Handles Transformed punch hitbox reset
                    setTimeout(() => {
                        this.spellCooldownQ = false;
                        this.offset = {
                            top: 120,
                            bottom: 132,
                            left: 250,
                            right: 500
                        };
                        this.isHitting = false;
                    }, 500);
                }
            }

            // Cast W-Spell only when having mana and the cooldown is up
            if (world && world.keyboard.W == true && !this.spellCooldownW && !this.isAirborne() && world.statusBar[1].percentage >= 10 && !this.isTransforming) {
                world.rockShatterAudio.play();
                if (!this.isTransformed) {
                    this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                        this.y + this.offset.top,
                        this.movementStatus,
                        'W',
                        this.activeSpells.length));
                } else {
                    this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                        this.y + this.offset.top + 52,
                        this.movementStatus,
                        'W',
                        this.activeSpells.length));
                }

                this.spellCooldownW = true;
                world.statusBar[1].percentage -= 10;
                setTimeout(() => {
                    this.spellCooldownW = false;
                }, 1000);
            }

            // Casts E-Spell only when having mana and the cooldown is up
            if (world && world.keyboard.E == true && !this.spellCooldownE && world.statusBar[1].percentage >= 10 && !this.isTransforming) {
                this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                    this.y + this.offset.top,
                    this.movementStatus, 'E', this.activeSpells.length));
                this.spellCooldownE = true;
                world.statusBar[1].percentage -= 10;
                setTimeout(() => {
                    this.spellCooldownE = false;
                }, 1000);
            }

            // Evolves into Golem
            if (world && world.keyboard.R == true && world.statusBar[2].percentage >= 100 && !this.isTransformed) {
                this.isTransforming = true;

                this.isTransformed = true;
            }
            world.camera_x = -this.x + 60; // 60 default
        }, 1000 / 60);

        // Just looping through ANIMATION frames (no movement here)            
        this.animateCharacterNormal();
        this.gameOver();
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
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.movements.death);
                if (this.currentImage == allImages.characters[`${this.choosenChar}`].normalForm.movements.death.length) {
                    this.stopInterval(this.animationIntervalNormal);
                }
            } else if (this.isTransforming) {
                // Transforming
                if (this.animationStatus != 'TRANSFORM') {
                    this.currentImage = 0;
                    this.animationStatus = 'TRANSFORM';
                    this.transformAudio.play();
                }
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.transform);
                if (this.currentImage == allImages.characters[`${this.choosenChar}`].normalForm.transform.length) {
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
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.movements.takingHit);
            } else if (this.spellCooldownQ && this.isAirborne()) {
                // Q-Attack in Air
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.abilities.qAttackAir);
            } else if (!this.isTakingHit && this.isAirborne() && this.speedY > 0) {
                // Jumping up
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.movements.jumpUp);
                this.animationStatus = 'AIRBORNE';
            } else if (!this.isTakingHit && this.isAirborne() && this.speedY <= 0) {
                // Falling Down
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.movements.jumpDown);
                this.animationStatus = 'AIRBORNE';
            } else if (this.spellCooldownQ) {
                // Q-ATTACK
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.abilities.qAttack);
            } else if (!this.isTakingHit && world && world.keyboard.RIGHT || world.keyboard.LEFT) {
                // Run Animation
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.movements.move);
                this.animationStatus = 'RUN';
            }
            else if (!this.isTakingHit) {
                // Doing nothing
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.movements.idle);
                this.animationStatus = 'IDLE';
            }
        }, 100);
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