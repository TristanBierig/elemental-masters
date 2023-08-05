class CharacterFire extends Character {
    imageCollection = {
        IMAGES_IDLE: allImages.characters.Fire.normalForm.movements.idle,
        IMAGES_WALKING: allImages.characters.Fire.normalForm.movements.move,
        IMAGES_JUMPING_UP: allImages.characters.Fire.normalForm.movements.jumpUp,
        IMAGES_JUMPING_DOWN: allImages.characters.Fire.normalForm.movements.jumpDown,
        IMAGES_TAKING_HIT: allImages.characters.Fire.normalForm.movements.takingHit,
        IMAGES_DEAD: allImages.characters.Fire.normalForm.movements.death,
        IMAGES_ATTACK_Q: allImages.characters.Fire.normalForm.abilities.qAttack,
        IMAGES_ATTACK_Q_AIR: allImages.characters.Fire.normalForm.abilities.qAttackAir,
        IMAGES_TRANSFORM: allImages.characters.Fire.normalForm.transform,
        IMAGES_TRANSFORM_IDLE: allImages.characters.Fire.evolvedForm.movements.idle,
        IMAGES_TRANSFORM_MOVE: allImages.characters.Fire.evolvedForm.movements.move,
        IMAGES_TRANSFORM_JUMPING_UP: allImages.characters.Fire.evolvedForm.movements.jumpUp,
        IMAGES_TRANSFORM_JUMPING_DOWN: allImages.characters.Fire.evolvedForm.movements.jumpDown,
        IMAGES_TRANSFORM_TAKING_HIT: allImages.characters.Fire.evolvedForm.movements.takingHit,
        IMAGES_TRANSFORM_DEAD: allImages.characters.Fire.evolvedForm.movements.death,
        IMAGES_TRANSFORM_ATTACK_Q: allImages.characters.Fire.evolvedForm.abilities.qAttack,
        IMAGES_TRANSFORM_ATTACK_Q_AIR: allImages.characters.Fire.evolvedForm.abilities.qAttackAir,
    }

    hitboxes = {
        normalForm: {
            idle: {
                top: 170,
                bottom: 165,
                left: 275,
                right: 540
            },
            qRight: {
                top: 170,
                bottom: 172,
                left: 275,
                right: 450
            },
            qLeft: {
                top: 170,
                bottom: 172,
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
                right: 400
            },
            qLeft: {
                top: 130,
                bottom: 132,
                left: 100,
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
            this.characterAttackW('Fire');
            this.characterAttackE('Fire');
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