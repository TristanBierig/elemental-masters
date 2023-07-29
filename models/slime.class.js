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
        this.animate();
    }


    animate() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        if (this.category == 'normal') {
            // Handling normal slimes
            this.animationInterval = setInterval(() => {
                if (this.isDead()) {
                    // Death Animation and stops Intervals
                    if (this.animationStatus != 'DEAD') {
                        this.currentImage = 0;
                        this.animationStatus = 'DEAD';
                        this.stopInterval(this.movementInterval);
                    }
                    this.playAnimation(this.IMAGES_DEAD);
                    if (this.currentImage == 8) {
                        this.stopInterval(this.animationInterval);
                    }
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }, 1000 / 5);
        } else if (this.category == 'tiny') {
            // Handling tiny slimes
            this.animationInterval = setInterval(() => {
                if (this.isDead()) {
                    // Death Animation and stops Intervals
                    if (this.animationStatus != 'DEAD') {
                        this.currentImage = 0;
                        this.animationStatus = 'DEAD';
                        this.stopInterval(this.movementInterval);
                    }
                    this.playAnimation(this.IMAGES_DEAD_TINY);
                    if (this.currentImage == 8) {
                        this.stopInterval(this.animationInterval);
                    }
                } else {
                    this.playAnimation(this.IMAGES_WALKING_TINY);
                }
            }, 1000 / 5);
        } else {
            // Handling flying slimes
            this.animationInterval = setInterval(() => {
                if (this.isDead()) {
                    // Death Animation and stops Intervals
                    if (this.animationStatus != 'DEAD') {
                        this.currentImage = 0;
                        this.animationStatus = 'DEAD';
                        this.stopInterval(this.movementInterval);
                    }
                    this.playAnimation(this.IMAGES_DEAD_FLY);
                    if (this.currentImage == 6) {
                        this.stopInterval(this.animationInterval);
                    }
                } else {
                    this.playAnimation(this.IMAGES_WALKING_FLY);
                }
            }, 1000 / 5);
        }
    }
}