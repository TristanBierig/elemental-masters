class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelertion = 1;
    lifePoints = 100;


    applyGravitiy(spellCasted) {
        // Prevents chracter from falling through ground
        if (!spellCasted) {
            setInterval(() => {
                // debugger
                if (this.isAirborne() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.accelertion;
                }
            }, 1000 / 25);
        }

        // Lets Spell Animation fall through ground and out of view
        if (spellCasted) {
            setInterval(() => {
                // debugger
                    this.y -= this.speedY;
                    this.speedY -= this.accelertion; 
            }, 1000 / 25);
        }
    }


    isAirborne() {
        return this.y < 205;
    }


    isColliding(mo) {
        return this.hitbox_x_end > mo.hitbox_x_start &&
            this.hitbox_y_end > mo.hitbox_y_start &&
            this.hitbox_x_start < mo.hitbox_x_end &&
            this.hitbox_y_start < mo.hitbox_y_end;
    }


    gettingHit() {
        this.lifePoints -= 10; // Default 1
        if (this.lifePoints <= 0) {
            this.lifePoints = 0
        }
    }


    isDead() {
        return this.lifePoints == 0;
    }


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    shoot() {

    }

    jump() {
        this.speedY = 17;
    }


    /**
     * This function stops any given Interfal
     * 
     * @param {interval} Interval - Expects an Interval ID to be stopped
     */
    stopInterval(Interval) {
        clearInterval(Interval);
    }


    /**
     * This function iterates over a passed-in Array 
     * 
     * @param {Array} images - Expects an array with all the paths to a particual animation 
     */
    playAnimation(images) {
        // debugger
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}