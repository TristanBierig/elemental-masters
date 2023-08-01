class ThrowableObject extends MovableObject {
    hit = false;
    category;
    index;
    choosenChar = world.character.choosenChar;

    IMAGES_W;
    IMAGES_E_FLY;
    IMAGES_E_HIT;


    constructor(x, y, status, category, index, element) {
        // Empty png on first load
        super().loadImage('img/Enemies/Slime/BlueSlime/death/death_8.png');
        switch (element) {
            case 'Earth':
                this.IMAGES_W = allImages.characters.Earth.normalForm.abilities.wAttack;
                this.IMAGES_E_FLY = allImages.characters.Earth.normalForm.abilities.eAttackFlying;
                this.IMAGES_E_HIT = allImages.characters.Earth.normalForm.abilities.eAttackHit;
                this.loadImages(this.IMAGES_W);
                this.loadImages(this.IMAGES_E_FLY);
                this.loadImages(this.IMAGES_E_HIT);
                break;

            case 'Fire':
                this.IMAGES_W = allImages.characters.Fire.normalForm.abilities.wAttack;
                this.IMAGES_E_FLY = allImages.characters.Fire.normalForm.abilities.eAttackFlying;
                this.IMAGES_E_HIT = allImages.characters.Fire.normalForm.abilities.eAttackHit;
                this.loadImages(this.IMAGES_W);
                this.loadImages(this.IMAGES_E_FLY);
                this.loadImages(this.IMAGES_E_HIT);
                break;

            case 'Water':
                this.IMAGES_W = allImages.characters.Water.normalForm.abilities.wAttack;
                this.IMAGES_E_FLY = allImages.characters.Water.normalForm.abilities.eAttackFlying;
                this.IMAGES_E_HIT = allImages.characters.Water.normalForm.abilities.eAttackHit;
                this.loadImages(this.IMAGES_W);
                this.loadImages(this.IMAGES_E_FLY);
                this.loadImages(this.IMAGES_E_HIT);
                break;

            case 'Wind':
                this.IMAGES_W = allImages.characters.Wind.normalForm.abilities.wAttack;
                this.IMAGES_E_FLY = allImages.characters.Wind.normalForm.abilities.eAttackFlying;
                this.IMAGES_E_HIT = allImages.characters.Wind.normalForm.abilities.eAttackHit;
                this.loadImages(this.IMAGES_W);
                this.loadImages(this.IMAGES_E_FLY);
                this.loadImages(this.IMAGES_E_HIT);
                break;
        }

        this.width = 96;
        this.height = 96;
        this.x = x;
        this.y = y - 20;
        this.index = index;
        this.category = category;
        this.animationStatus = 'FLY';

        if (category == 'E' && element == 'Earth') {
            this.movementStatus = status;
            this.x -= 56;
            this.speed = 8; // 8 default
            this.speedY = 15; // 15 default
            this.accelertion = 1; // 1 default
            this.applyGravitiy(true);
            this.animateE();
            if (this.movementStatus == 'RIGHT' || undefined) {
                this.offset = {
                    top: 30,
                    bottom: 62,
                    left: 12,
                    right: 68
                };
            } else {
                this.offset = {
                    top: 30,
                    bottom: 62,
                    left: 55,
                    right: 68
                };
            }
        }

        if (category == 'W') {
            this.y += 2;
            this.offset = {
                top: 30,
                bottom: 30,
                left: 12,
                right: 40
            };
            this.animateW();
            this.movementStatus = status;
            if (this.movementStatus == 'LEFT') {
                this.x -= 120;
            }
        }
    }


    animateE() {
        this.movementInterval = setInterval(() => {
            if (this.movementStatus == 'RIGHT' || this.movementStatus == undefined) {
                this.moveRight();
            }

            if (this.movementStatus == 'LEFT') {
                this.moveLeft();
            }
        }, 1000 / 25);

        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                // Death Animation and stops Intervals
                if (this.animationStatus != 'DEAD') {
                    this.currentImage = 0;
                    this.animationStatus = 'DEAD';
                    setTimeout(() => {
                        this.stopInterval(this.movementInterval);
                    }, 1200);
                }
                this.playAnimation(this.IMAGES_E_HIT);
                if (this.currentImage == 9) {
                    this.stopInterval(this.animationInterval);
                }
            } else {
                this.playAnimation(this.IMAGES_E_FLY);
            }
        }, 1000 / 25);
    }


    animateW() {
        this.movementInterval = setInterval(() => {
            if (this.movementStatus == 'LEFT') {
                this.otherDirection = true;
            }
        }, 1000 / 25);

        this.animationInterval = setInterval(() => {
            if (this.animationStatus != 'ONCE') {
                this.currentImage = 0;
                this.animationStatus = 'ONCE';
            }
            this.playAnimation(this.IMAGES_W);

            if (this.currentImage >= 20) {
                this.stopInterval(this.animationInterval);
                world.character.activeSpells.splice(this.index, 1);
            }
        }, 1000 / 25);
    }
}