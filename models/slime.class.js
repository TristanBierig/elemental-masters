class Slime extends MovableObject {
    isHitting = false;
    category;
    movingInterval;

    IMAGES_WALKING = allImages.enemies.slimes.normalSlime.move;
    IMAGES_DEAD = allImages.enemies.slimes.normalSlime.death;

    IMAGES_WALKING_TINY = allImages.enemies.slimes.tinySlime.move;
    IMAGES_DEAD_TINY = allImages.enemies.slimes.tinySlime.death;

    IMAGES_WALKING_FLY = allImages.enemies.slimes.flyingSlime.move;
    IMAGES_DEAD_FLY = allImages.enemies.slimes.flyingSlime.death;


    constructor(start, category) {
        super().loadImage('img/Enemies/Slime/BlueSlime/move/move_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING_TINY);
        this.loadImages(this.IMAGES_DEAD_TINY);
        this.loadImages(this.IMAGES_WALKING_FLY);
        this.loadImages(this.IMAGES_DEAD_FLY);
        this.category = category;
        this.y = 385;
        this.width = 96;
        this.height = 96;
        this.speed = 0.10;
        this.speed = this.speed + Math.random() * 0.15; // 0.35
        // Defines the Hitbox
        this.offset = {
            top: 40,
            bottom: 72,
            left: 32,
            right: 66
        };
        // If first wave of enemy is killed new one spawns just out sight to the right
        this.setDataForDifferentType(start);
        this.updateSlime();
    }


    setDataForDifferentType(start) {
        if (start != undefined) {
            this.x = start + 720 + Math.random() * 300;
        } else {
            // Just for first spawn
            this.x = 200 + Math.floor(Math.random() * 800); // 200 + 800 default
        }
        if (this.category == 'fly') {
            this.y = 383; // 383 Ground level
            this.y = 180 + Math.floor(Math.random() * 100);
            this.speed = 1;
        }
        if (this.category == 'tiny') {
            this.speed = 0.25
            this.y = 388;
        }
    }


    updateSlime() {
        this.moveSlimes();
        this.animateSlime();
    }


    moveSlimes() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


    animateSlime() {
        if (this.category == 'normal') {
            this.animateNormalSlime();
        } else if (this.category == 'tiny') {
            this.animateTinySlime();
        } else {
            this.animateFlyingSlime();
        }
    }


    animateNormalSlime() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.animateNormalSlimeDeath();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 5);
    }


    animateNormalSlimeDeath() {
        // Death Animation and stops Intervals
        if (this.animationStatus != 'DEAD') {
            this.currentImage = 0;
            this.animationStatus = 'DEAD';
            this.stopInterval(this.movementInterval);
        }
        this.playAnimation(this.IMAGES_DEAD);
        if (this.currentImage == this.IMAGES_DEAD.length) {
            this.stopInterval(this.animationInterval);
        }
    }


    animateTinySlime() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.animateTinySlimeDeath();
            } else {
                this.playAnimation(this.IMAGES_WALKING_TINY);
            }
        }, 1000 / 5);
    }


    animateTinySlimeDeath() {
        // Death Animation and stops Intervals
        if (this.animationStatus != 'DEAD') {
            this.currentImage = 0;
            this.animationStatus = 'DEAD';
            this.stopInterval(this.movementInterval);
        }
        this.playAnimation(this.IMAGES_DEAD_TINY);
        if (this.currentImage == this.IMAGES_DEAD_TINY.length) {
            this.stopInterval(this.animationInterval);
        }
    }


    animateFlyingSlime() {
        // Handling flying slimes
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.animateFlyingSlimeDeath();
            } else {
                this.playAnimation(this.IMAGES_WALKING_FLY);
            }
        }, 1000 / 5);
    }


    animateFlyingSlimeDeath() {
        // Death Animation and stops Intervals
        if (this.animationStatus != 'DEAD') {
            this.currentImage = 0;
            this.animationStatus = 'DEAD';
            this.stopInterval(this.movementInterval);
        }
        this.playAnimation(this.IMAGES_DEAD_FLY);
        if (this.currentImage == this.IMAGES_DEAD_FLY.length) {
            this.stopInterval(this.animationInterval);
        }
    }
}