class Endboss extends MovableObject {
    isHitting = false;
    isTransformed = false;
    resetCurrentImage = true;
    isNextAttack = true;
    nextAttack;
    isImmune = false;

    IMAGES_WALKING_BEFORE = allImages.enemies.endboss.normalForm.move;
    IMAGES_DEAD = allImages.enemies.endboss.normalForm.death;
    IMAGES_IDLE = allImages.enemies.endboss.evolvedForm.movements.idle;
    IMAGES_WALKING = allImages.enemies.endboss.evolvedForm.movements.move;
    IMAGES_TAKE_HIT = allImages.enemies.endboss.evolvedForm.movements.takingHit;
    IMAGES_DEAD_FINAL = allImages.enemies.endboss.evolvedForm.movements.death;

    IMAGES_SMASH = allImages.enemies.endboss.evolvedForm.abilities.smash;
    IMAGES_CLEAVE = allImages.enemies.endboss.evolvedForm.abilities.cleave;
    IMAGES_BREATH = allImages.enemies.endboss.evolvedForm.abilities.breath;


    constructor(start) {
        super().loadImage(this.IMAGES_WALKING_BEFORE[0]);
        this.loadImages(this.IMAGES_WALKING_BEFORE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SMASH);
        this.loadImages(this.IMAGES_CLEAVE);
        this.loadImages(this.IMAGES_BREATH);
        this.loadImages(this.IMAGES_TAKE_HIT);
        this.loadImages(this.IMAGES_DEAD_FINAL);
        this.x = start + 1000; // 1000 default
        this.y = 130;
        this.width = 576; // 576 default
        this.height = 320; // 320 default
        this.speed = 0.5; // 0.5 default

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


    /**
     * This function starts all functions needed for the Endboss to behave properly
     * 
     */
    updateBoss() {
        this.handleBossMovement();
        this.moveBoss();
        this.animateBoss();
    }


    /**
     *  This function sets an animationInterval for both, the animations in the preEvolve form and postEvolve form 
     * 
     */
    animateBoss() {
        this.animationInterval = setInterval(() => {
            this.animateBossPreTransform();
            this.animateBossPostTransform();
        }, 1000 / 5);
    }


    /**
     * This function handles postEvolve animation from the Boss. It will always perform a "SMASH" after evolving and then attacks with random attacks when in reach
     * 
     */
    animateBossPostTransform() {
        if (this.isTransformed && this.animationStatus == 'SMASH') {
            this.animateSmashAttack();
        } else if (this.lifePoints <= 0 && this.isTransformed) {
            this.animateDeath();
        } else if (this.isTransformed && this.movementStatus == 'STAND') {
            this.setNextAttack();
            this.animateCleaveAttack();
            this.animateBreathAttack();
        } else if (this.isTakingHit) {
            this.animateTakingHit();
        } else if (this.isTransformed) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     *  This function only animates the first "Smash"-Attack and starts the automated movement scheme afterwards
     * 
     */
    animateSmashAttack() {
        if (this.resetCurrentImage) {
            this.currentImage = 0;
            this.resetCurrentImage = false;
        }
        this.playAnimation(this.IMAGES_SMASH);
        if (this.currentImage >= 12) {
            this.setTransformHitbox();
        }
        this.startBossAI();
    }


    /**
     * This function is triggered when the introduction animation from the Boss is played. He now starts walking after the character and attacks with random attacks whenever he is in reach
     * 
     */
    startBossAI() {
        if (this.currentImage == this.IMAGES_SMASH.length) {
            this.animationStatus = 'MOVE';
            this.setTransformHitbox();
            this.moveBoss();
            if (world) {
                world.statusBar.push(new StatusBar(350, 380, true));
            }
        }
    }


    /**
     * This function animates the Death scene on the evolved Form
     * 
     */
    animateDeath() {
        if (this.animationStatus != 'DEAD') {
            this.currentImage = 0;
            this.animationStatus = 'DEAD';
            playerBackgroundBoss.pause();
        }
        this.playAnimation(this.IMAGES_DEAD_FINAL);
    }


    /**
     * This function sets a new number everytime the boss is about to perform his next attack. This number is used to set a certain Attack
     * 
     */
    setNextAttack() {
        if (this.isNextAttack) {
            this.nextAttack = Math.random() * 100;
            this.isNextAttack = false;
        }
    }


    /**
     * This function handles the "Cleave"-Attack. Animates it and adjusts the hitbox. Its only trigggerd 60% of the time
     * 
     */
    animateCleaveAttack() {
        if (this.nextAttack >= 40) {
            if (this.animationStatus != 'CLEAVE') {
                this.currentImage = 0;
                this.animationStatus = 'CLEAVE';
            }
            this.handleCleaveHitbox();
            this.playAnimation(this.IMAGES_CLEAVE);
            if (this.currentImage >= this.IMAGES_CLEAVE.length) {
                this.animationStatus = 'MOVE'
                this.setTransformHitbox();
                this.isNextAttack = true;
            }
        }
    }


    /**
     * This function sets the bigger Hitbox only on the frames where the boss graphics would actualy hit the character
     * 
     */
    handleCleaveHitbox() {
        if (this.currentImage >= 9 && this.currentImage <= 11) {
            this.setTransformHitbox(true);
            this.isImmune = true;
        } else {
            this.setTransformHitbox();
            this.isImmune = false;
        }
    }


    /**
     * This function handles the "Breath"-Attack. Animtes it and adjusts the hitbox. Its only triggered 40% of the time
     * 
     */
    animateBreathAttack() {
        if (this.nextAttack < 40) {
            if (this.animationStatus != 'BREATH') {
                this.currentImage = 0;
                this.animationStatus = 'BREATH';
            }
            this.handleBreathHitbox();
            this.playAnimation(this.IMAGES_BREATH);
            if (this.currentImage >= this.IMAGES_BREATH.length) {
                this.animationStatus = 'MOVE'
                this.setTransformHitbox();
                this.isNextAttack = true;
            }
        }
    }


    /**
     * This function sets the bigger Hitbox only on the frames where the boss graphics would actualy hit the character
     * 
     */
    handleBreathHitbox() {
        if (this.currentImage >= 13 && this.currentImage <= 18) {
            this.setTransformHitbox(true);
            this.isImmune = true;
        } else {
            this.setTransformHitbox();
            this.isImmune = false;
        }
    }


    /**
     * This function animates the taking hit animation of the boss
     * 
     */
    animateTakingHit() {
        if (this.animationStatus != 'HIT') {
            this.currentImage = 0;
            this.animationStatus = 'HIT';
        }
        this.playAnimation(this.IMAGES_TAKE_HIT);
        if (this.currentImage >= this.IMAGES_TAKE_HIT.length) {
            this.isTakingHit = false;
        }
    }


    /**
     * This function triggers transform, stops movement and switches soundtracks
     * 
     */
    animateBossPreTransform() {
        if (this.isDead() && !this.isTransformed) {    
            this.handlesPreTransformDeath();
            if (this.currentImage == this.IMAGES_DEAD.length) {
                this.lifePoints = 2000;
                this.isTransformed = true;
                this.animationStatus = 'SMASH';
            }
        } else if (!this.isTransformed) {
            this.playAnimation(this.IMAGES_WALKING_BEFORE);
        }
    }


    /**
     * This function handles the first death of the boss before he transforms
     * 
     */
    handlesPreTransformDeath() {
        if (world && this.animationStatus != 'DEAD') {
            playerBackgroundIdle.playpause();
            playerBackgroundBoss.playpause();
            this.currentImage = 0;
            this.animationStatus = 'DEAD';
            // Prevents Interaction with Character till Animation is finished
            this.offset.top = -200;
            this.stopInterval(this.movementInterval);
        }
        this.playAnimation(this.IMAGES_DEAD);
    }


    /**
     * This function sets an Interval to check for certain states and moves/animates the boss accordingly
     * 
     */
    handleBossMovement() {
        setInterval(() => {
            this.setLeftMovement();
            this.setRightMovement();
            this.setIdleAlive();
            this.setIdleDead();
        }, 1000 / 25);
    }


    /**
     * This function sets the movement state into stand
     * 
     */
    setIdleDead() {
        if (this.isTransformed && this.lifePoints <= 0) {
            this.movementStatus = 'STAND';
        }
    }


    /**
     * This function sets the movement state into idle and is just executed right before the boss attacks to prevent glitchy animations
     * 
     */
    setIdleAlive() {
        if (world && (world.character.x + world.character.offset.left + world.character.width - world.character.offset.right < this.x + this.offset.left
            && world.character.x + world.character.offset.left + world.character.width - world.character.offset.right > this.x + this.offset.left - 50)
            || (world.character.x + world.character.offset.left < this.x + this.offset.left + this.width - this.offset.right + 50
                && world.character.x + world.character.offset.left > this.x + this.offset.left + this.width - this.offset.right)) {
            this.movementStatus = 'STAND';
        }
    }



    /**
     * This function sets the movement state into moving right and is only set when the character is on the right side of the boss
     *  
     */
    setRightMovement() {
        if (world && world.character.x + world.character.offset.left > this.x + this.offset.left + this.width - this.offset.right + 50
            && this.animationStatus != 'CLEAVE' && this.animationStatus != 'BREATH') {
            this.movementStatus = 'MOVERIGHT';
        }
    }


    /**
     * This function sets the movement state into moving left and is only set when the character is on the right side of the boss
     * 
     */
    setLeftMovement() {
        if (world && world.character.x + world.character.offset.left + world.character.width - world.character.offset.right < this.x + this.offset.left - 50
            && this.animationStatus != 'CLEAVE' && this.animationStatus != 'BREATH') {
            this.movementStatus = 'MOVELEFT';
        }
    }


    /**
     * This function sets an movementInterval to move the boss around the map depending on the current movement state
     * 
     */
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


    /**
     * This function sets the hitbox to a given size depending on the performing attack
     * 
     * @param {Boolean} hitFrame - Is always true but only passed in on the frames where it visualy makes sense
     * that the boss is actuly hitting something, rather than having a big hitbox even when he is currently just started swinging e.g.
     */
    setTransformHitbox(hitFrame) {
        if (this.animationStatus == 'SMASH') {
            this.setSmashHitbox();
        } else if (this.animationStatus == 'CLEAVE' && hitFrame) {
            this.setCleaveHitbox();
        } else if (this.animationStatus == 'BREATH' && hitFrame) {
            this.setBreathHitbox();
        } else {
            this.setDefaultHitbox();
        }
    }


    /**
     * Sets the default hitbox while moving and idle
     * 
     */
    setDefaultHitbox() {
        this.offset = {
            top: 175,
            bottom: 175,
            left: 215,
            right: 430
        };
    }


    /**
     * Sets the hitbox for the smash attack
     * 
     */
    setSmashHitbox() {
        this.offset = {
            top: 175,
            bottom: 175,
            left: 100,
            right: 200
        };
    }


    /**
     * Sets the hitbox of the breath attack in the proper direction
     * 
     */
    setBreathHitbox() {
        if (!this.otherDirection) {
            this.offset = {
                top: 185,
                bottom: 175,
                left: 50,
                right: 430
            };
        } else {
            this.offset = {
                top: 185,
                bottom: 175,
                left: 215,
                right: 290
            };
        }
    }

    
    /**
     * Sets the hitbox of cleave attack in the proper direction
     * 
     */
    setCleaveHitbox() {
        if (!this.otherDirection) {
            this.offset = {
                top: 175,
                bottom: 175,
                left: 70,
                right: 430
            };
        } else {
            this.offset = {
                top: 175,
                bottom: 175,
                left: 215,
                right: 270
            };
        }
    }

}