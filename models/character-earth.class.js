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

    hitboxes = {
        normalForm: {
            idle: {
                top: 172,
                bottom: 170,
                left: 275,
                right: 550
            },
            qRight: {
                top: 172,
                bottom: 185,
                left: 275,
                right: 510
            },
            qLeft: {
                top: 172,
                bottom: 185,
                left: 235,
                right: 550
            }
        },
        evolvedForm: {
            idle: {
                top: 120,
                bottom: 128,
                left: 265,
                right: 520
            },
            qRight: {
                top: 120,
                bottom: 132,
                left: 265,
                right: 400
            },
            qLeft: {
                top: 120,
                bottom: 132,
                left: 150,
                right: 520
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
        this.y = 150; // 205 Ground value
        this.speed = 2.5;
        this.offset = this.hitboxes.normalForm.idle;
        this.applyGravitiy(undefined, 'Earth');
        this.updateCharacter();
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
            this.characterAttackW('Earth');
            this.characterAttackE('Earth');
            this.characterTransform();
            this.moveCamera();
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