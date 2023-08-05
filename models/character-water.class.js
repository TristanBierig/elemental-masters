class CharacterWater extends Character {
    imageCollection = {
        IMAGES_IDLE: allImages.characters.Water.normalForm.movements.idle,
        IMAGES_WALKING: allImages.characters.Water.normalForm.movements.move,
        IMAGES_JUMPING_UP: allImages.characters.Water.normalForm.movements.jumpUp,
        IMAGES_JUMPING_DOWN: allImages.characters.Water.normalForm.movements.jumpDown,
        IMAGES_TAKING_HIT: allImages.characters.Water.normalForm.movements.takingHit,
        IMAGES_DEAD: allImages.characters.Water.normalForm.movements.death,
        IMAGES_ATTACK_Q: allImages.characters.Water.normalForm.abilities.qAttack,
        IMAGES_ATTACK_Q_AIR: allImages.characters.Water.normalForm.abilities.qAttackAir,
        IMAGES_TRANSFORM: allImages.characters.Water.normalForm.transform,
        IMAGES_TRANSFORM_IDLE: allImages.characters.Water.evolvedForm.movements.idle,
        IMAGES_TRANSFORM_MOVE: allImages.characters.Water.evolvedForm.movements.move,
        IMAGES_TRANSFORM_JUMPING_UP: allImages.characters.Water.evolvedForm.movements.jumpUp,
        IMAGES_TRANSFORM_JUMPING_DOWN: allImages.characters.Water.evolvedForm.movements.jumpDown,
        IMAGES_TRANSFORM_TAKING_HIT: allImages.characters.Water.evolvedForm.movements.takingHit,
        IMAGES_TRANSFORM_DEAD: allImages.characters.Water.evolvedForm.movements.death,
        IMAGES_TRANSFORM_ATTACK_Q: allImages.characters.Water.evolvedForm.abilities.qAttack,
        IMAGES_TRANSFORM_ATTACK_Q_AIR: allImages.characters.Water.evolvedForm.abilities.qAttackAir,
    }

    hitboxes = {
        normalForm: {
            idle: {
                top: 180,
                bottom: 175,
                left: 275,
                right: 540
            },
            qRight: {
                top: 180,
                bottom: 182,
                left: 275,
                right: 450
            },
            qLeft: {
                top: 180,
                bottom: 182,
                left: 185,
                right: 540
            }
        },
        evolvedForm: {
            idle: {
                top: 130,
                bottom: 132,
                left: 265,
                right: 520
            },
            qRight: {
                top: 130,
                bottom: 132,
                left: 275,
                right: 320
            },
            qLeft: {
                top: 130,
                bottom: 132,
                left: 65,
                right: 450
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
        this.animateCharacter();
        this.gameOver();
    }


    /**
     * This function sets an Interval to check on numerous movement commands for the character and executes them accordingly
     * 
     */
    updateCharacter() {
        this.movementInterval = setInterval(() => {
            this.characterMove();
            this.characterJump();
            this.characterAttackQ();
            this.characterAttackW('Water');
            this.characterAttackE('Water');
            this.characterTransform();
            this.moveCamera();
            if (this.isTransformed) {
                this.offset = this.hitboxes.evolvedForm.idle;
            }
        }, 1000 / 60);
    }

    
    /**
     * This function sets an Interval to continuously checking if the game is over and stops
     * certain intervals preventing the player to further move or interact with the game when its over.
     * 
     */
    gameOver() {
        setInterval(() => {
            if (this.isGameOver) {
                this.stopInterval(this.movementInterval);
                this.stopInterval(this.animationIntervalNormal);
                this.stopInterval(this.animationIntervalTransform);
            }
        }, 1000);
    }
}