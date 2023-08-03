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


    updateBoss() {
        this.handleBossMovement();
        this.moveBoss();
        this.animateBoss();
    }


    animateBoss() {
        this.animationInterval = setInterval(() => {
            this.animateBossPreTransform();
            this.animateBossPostTransform();
        }, 1000 / 5);
    }


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


    animateDeath() {
        if (this.animationStatus != 'DEAD') {
            this.currentImage = 0;
            this.animationStatus = 'DEAD';
            playerBackgroundBoss.pause();
        }
        this.playAnimation(this.IMAGES_DEAD_FINAL);
    }


    setNextAttack() {
        if (this.isNextAttack) {
            this.nextAttack = Math.random() * 100;
            this.isNextAttack = false;
        }
    }


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


    handleCleaveHitbox() {
        if (this.currentImage >= 9 && this.currentImage <= 11) {
            this.setTransformHitbox(true);
            this.isImmune = true;
        } else {
            this.setTransformHitbox();
            this.isImmune = false;
        }
    }


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


    handleBreathHitbox() {
        if (this.currentImage >= 13 && this.currentImage <= 18) {
            this.setTransformHitbox(true);
            this.isImmune = true;
        } else {
            this.setTransformHitbox();
            this.isImmune = false;
        }
    }


    animateTakingHit() {
        if (this.animationStatus != 'HIT') {
            this.currentImage = 0;
            this.animationStatus = 'HIT';
        }
        this.playAnimation(this.IMAGES_TAKE_HIT);
        if (this.currentImage >= 5) {
            this.isTakingHit = false;
        }
    }


    animateBossPreTransform() {
        if (this.isDead() && !this.isTransformed) {
            // Triggers transform, stops movement and switches soundtracks
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


    handleBossMovement() {
        setInterval(() => {
            this.setLeftMovement();
            this.setRightMovement();
            this.setIdleAlive();
            this.setIdleDead();
        }, 1000 / 25);
    }


    setIdleDead() {
        if (this.isTransformed && this.lifePoints <= 0) {
            this.movementStatus = 'STAND';
        }
    }


    setIdleAlive() {
        if (world && (world.character.x + world.character.offset.left + world.character.width - world.character.offset.right < this.x + this.offset.left
            && world.character.x + world.character.offset.left + world.character.width - world.character.offset.right > this.x + this.offset.left - 50)
            || (world.character.x + world.character.offset.left < this.x + this.offset.left + this.width - this.offset.right + 50
                && world.character.x + world.character.offset.left > this.x + this.offset.left + this.width - this.offset.right)) {
            this.movementStatus = 'STAND';
        }
    }


    setRightMovement() {
        if (world && world.character.x + world.character.offset.left > this.x + this.offset.left + this.width - this.offset.right + 50
            && this.animationStatus != 'CLEAVE' && this.animationStatus != 'BREATH') {
            this.movementStatus = 'MOVERIGHT';
        }
    }


    setLeftMovement() {
        if (world && world.character.x + world.character.offset.left + world.character.width - world.character.offset.right < this.x + this.offset.left - 50
            && this.animationStatus != 'CLEAVE' && this.animationStatus != 'BREATH') {
            this.movementStatus = 'MOVELEFT';
        }
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


    setDefaultHitbox() {
        this.offset = {
            top: 175,
            bottom: 175,
            left: 215,
            right: 430
        };
    }


    setSmashHitbox() {
        this.offset = {
            top: 175,
            bottom: 175,
            left: 100,
            right: 200
        };
    }


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