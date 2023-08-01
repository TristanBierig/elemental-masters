class ThrowableObject extends MovableObject {
    hit = false;
    category;
    index;
    choosenChar = world.character.choosenChar;


    constructor(x, y, status, category, index) {
        // Empty png on first load
        super().loadImage('img/Enemies/Slime/BlueSlime/death/death_8.png');
        this.loadImages(allImages.characters[`${this.choosenChar}`].normalForm.abilities.eAttackFlying);
        this.loadImages(allImages.characters[`${this.choosenChar}`].normalForm.abilities.eAttackHit);
        this.loadImages(allImages.characters[`${this.choosenChar}`].normalForm.abilities.wAttack);
        this.width = 96;
        this.height = 96;
        this.x = x;
        this.y = y - 20;
        this.index = index;
        this.category = category;
        this.animationStatus = 'FLY';

        if (category == 'E') {
            this.movementStatus = status;
            this.x -= 56;
            this.speed = 0; // 8 default
            this.speedY = 15; // 15 default
            this.accelertion = 1; // 1 default
            this.animateE();
            if (this.movementStatus = ('RIGHT' || undefined)) {
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
                    left: 12,
                    right: 68
                };
            }
        }

        if (category == 'W') {
            this.applyGravitiy(true);
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
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.abilities.eAttackHit);
                if (this.currentImage == 9) {
                    this.stopInterval(this.animationInterval);
                }
            } else {
                this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.abilities.eAttackFlying);
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
            this.playAnimation(allImages.characters[`${this.choosenChar}`].normalForm.abilities.wAttack);

            if (this.currentImage >= 20) {
                this.stopInterval(this.animationInterval);
                world.character.activeSpells.splice(this.index, 1);
            }
        }, 1000 / 25);
    }
}