class Character extends MovableObject {
    spawnInterval;
    doubleJumpAvailable = true;
    isTransformed = false;
    isTransforming = false;

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
    GameOverLoopAudio = playerSoundsGameOverLoop;
    victoryAudio = playerSoundsVictory;

    playRun = false;
    playAir = false;

    IMAGES_IDLE = allImages.characters.characterEarth.normalForm.movements.idle;
    IMAGES_WALKING = allImages.characters.characterEarth.normalForm.movements.move;
    IMAGES_JUMPING_UP = allImages.characters.characterEarth.normalForm.movements.jumpUp;
    IMAGES_JUMPING_DOWN = allImages.characters.characterEarth.normalForm.movements.jumpDown;
    IMAGES_TAKING_HIT = allImages.characters.characterEarth.normalForm.movements.takingHit;
    IMAGES_DEAD = allImages.characters.characterEarth.normalForm.movements.death;

    IMAGES_ATTACK_Q = allImages.characters.characterEarth.normalForm.abilities.qAttack;
    IMAGES_ATTACK_Q_AIR = allImages.characters.characterEarth.normalForm.abilities.qAttackAir;

    IMAGES_TRANSFORM = allImages.characters.characterEarth.normalForm.transform;
    IMAGES_TRANSFORM_IDLE = allImages.characters.characterEarth.evolvedForm.movements.idle;
    IMAGES_TRANSFORM_MOVE = allImages.characters.characterEarth.evolvedForm.movements.move;
    IMAGES_TRANSFORM_JUMPING_UP = allImages.characters.characterEarth.evolvedForm.movements.jumpUp;
    IMAGES_TRANSFORM_JUMPING_DOWN = allImages.characters.characterEarth.evolvedForm.movements.jumpDown;
    IMAGES_TRANSFORM_TAKING_HIT = allImages.characters.characterEarth.evolvedForm.movements.takingHit;
    IMAGES_TRANSFORM_DEAD = allImages.characters.characterEarth.evolvedForm.movements.death;

    IMAGES_TRANSFORM_ATTACK_Q = allImages.characters.characterEarth.evolvedForm.abilities.qAttack;
    IMAGES_TRANSFORM_ATTACK_Q_AIR = allImages.characters.characterEarth.evolvedForm.abilities.qAttackAir;

    constructor() {
        super().loadImage('img/Character/Earth/png/run/run_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_UP);
        this.loadImages(this.IMAGES_JUMPING_DOWN);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_TAKING_HIT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK_Q);
        this.loadImages(this.IMAGES_ATTACK_Q_AIR);
        this.loadImages(this.IMAGES_TRANSFORM);
        this.loadImages(this.IMAGES_TRANSFORM_IDLE);
        this.loadImages(this.IMAGES_TRANSFORM_MOVE);
        this.loadImages(this.IMAGES_TRANSFORM_JUMPING_UP);
        this.loadImages(this.IMAGES_TRANSFORM_JUMPING_DOWN);
        this.loadImages(this.IMAGES_TRANSFORM_TAKING_HIT);
        this.loadImages(this.IMAGES_TRANSFORM_DEAD);
        this.loadImages(this.IMAGES_TRANSFORM_ATTACK_Q);
        this.loadImages(this.IMAGES_TRANSFORM_ATTACK_Q_AIR);
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
                        setTimeout(() => {
                            this.offset = {
                                top: 172,
                                bottom: 185,
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
                        setTimeout(() => {
                            this.offset = {
                                top: 172,
                                bottom: 185,
                                left: 150,
                                right: 550
                            }
                            this.punch_sound.playpause();
                        }, 200);
                    }
                }

                // Shrinks hitbox sychned with animation
                setTimeout(() => {
                    this.spellCooldownQ = false;
                    this.offset = {
                        top: 120,
                        bottom: 132,
                        left: 250,
                        right: 500
                    };
                }, 500);
            }

            // Cast W-Spell only when having mana and the cooldown is up
            if (world && world.keyboard.W == true && !this.spellCooldownW && !this.isAirborne() && world.statusBar[1].percentage >= 10 && !this.isTransforming) {
                world.rockShatterAudio.play();
                this.activeSpells.push(new ThrowableObject(this.x + this.offset.left + this.width - this.offset.right,
                    this.y + this.offset.top,
                    this.movementStatus,
                    'W',
                    this.activeSpells.length));

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
    }


    animateCharacterNormal() {
        this.animationIntervalNormal = setInterval(() => {
            // debugger
            if (this.isDead()) {
                // Death Animation and stops Intervals
                if (this.animationStatus != 'DEAD') {
                    this.currentImage = 0;
                    this.animationStatus = 'DEAD';
                    this.walking_sound.stop();
                    this.GameOverAudio.play();
                    this.GameOverAudioLoop.play();
                    this.stopInterval(this.movementInterval);
                }
                this.playAnimation(this.IMAGES_DEAD);
                if (this.currentImage == 18) {
                    this.stopInterval(this.animationIntervalNormal);
                }
            } else if (this.isTransforming) {
                // Transforming
                if (this.animationStatus != 'TRANSFORM') {
                    this.currentImage = 0;
                    this.animationStatus = 'TRANSFORM';
                    this.transformAudio.play();
                }
                this.playAnimation(this.IMAGES_TRANSFORM);
                if (this.currentImage == 29) {
                    this.stopInterval(this.animationIntervalNormal);
                    this.animateCharacterTransform();
                    this.isTransforming = false;
                }
            } else if (this.takingHit) {
                // Taking Hit
                if (this.animationStatus != 'HIT') {
                    this.currentImage = 0;
                    this.animationStatus = 'HIT';
                    this.gettingHurtAudio.play();
                }
                this.playAnimation(this.IMAGES_TAKING_HIT);
            } else if (this.spellCooldownQ && this.isAirborne()) {
                // Q-Attack in Air
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(this.IMAGES_ATTACK_Q_AIR);
            } else if (!this.takingHit && this.isAirborne() && this.speedY > 0) {
                // Jumping up
                this.playAnimation(this.IMAGES_JUMPING_UP);
                this.animationStatus = 'AIRBORNE';
            } else if (!this.takingHit && this.isAirborne() && this.speedY <= 0) {
                // Falling Down
                this.playAnimation(this.IMAGES_JUMPING_DOWN);
                this.animationStatus = 'AIRBORNE';
            } else if (this.spellCooldownQ) {
                // Q-ATTACK
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(this.IMAGES_ATTACK_Q);
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
        }, 100);
    }


    // Handles animations in evolved Transform
    animateCharacterTransform() {
        // Transform hitbox
        this.offset = {
            top: 120,
            bottom: 132,
            left: 250,
            right: 500
        };
        this.animationIntervalTransform = setInterval(() => {
            if (this.isDead()) {
                // Death Animation and stops Intervals
                if (this.animationStatus != 'DEAD') {
                    this.currentImage = 0;
                    this.animationStatus = 'DEAD';
                    this.walking_sound.stop();
                    this.GameOverAudio.play();
                    this.stopInterval(this.movementInterval);
                }
                this.playAnimation(this.IMAGES_TRANSFORM_DEAD);
                if (this.currentImage == 29) {
                    this.stopInterval(this.animationIntervalTransform);
                }
            } else if (this.takingHit) {
                // Taking Hit
                if (this.animationStatus != 'HIT') {
                    this.currentImage = 0;
                    this.animationStatus = 'HIT';
                }
                this.playAnimation(this.IMAGES_TRANSFORM_TAKING_HIT);
            } else if (this.spellCooldownQ && this.isAirborne()) {
                // Q-Attack in Air
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(this.IMAGES_TRANSFORM_ATTACK_Q_AIR);
            } else if (!this.takingHit && this.isAirborne() && this.speedY > 0) {
                // Jumping up
                this.playAnimation(this.IMAGES_TRANSFORM_JUMPING_UP);
                this.animationStatus = 'AIRBORNE';
            } else if (!this.takingHit && this.isAirborne() && this.speedY <= 0) {
                // Falling Down
                this.playAnimation(this.IMAGES_TRANSFORM_JUMPING_DOWN);
                this.animationStatus = 'AIRBORNE';
            } else if (this.spellCooldownQ) {
                // Q-ATTACK
                if (this.animationStatus != 'Q-ATTACK') {
                    this.currentImage = 0;
                    this.animationStatus = 'Q-ATTACK';
                }
                this.playAnimation(this.IMAGES_TRANSFORM_ATTACK_Q);
            } else if (!this.takingHit && world && world.keyboard.RIGHT || world.keyboard.LEFT) {
                // Run Animation
                this.playAnimation(this.IMAGES_TRANSFORM_MOVE);
                this.animationStatus = 'RUN';
            }
            else if (!this.takingHit) {
                // Doing nothing
                this.playAnimation(this.IMAGES_TRANSFORM_IDLE);
                this.animationStatus = 'IDLE';
            }
        }, 100);
    }
}