class Slime extends MovableObject {
    isHitting = false;
    category;
    isKilled = false;
    movingInterval;

    IMAGES_WALKING = [
        'img/Enemies/Slime/BlueSlime/idle/idle_1.png',
        'img/Enemies/Slime/BlueSlime/idle/idle_2.png',
        'img/Enemies/Slime/BlueSlime/idle/idle_3.png',
    ];

    IMAGES_DEAD = [
        'img/Enemies/Slime/BlueSlime/death/death_1.png',
        'img/Enemies/Slime/BlueSlime/death/death_2.png',
        'img/Enemies/Slime/BlueSlime/death/death_3.png',
        'img/Enemies/Slime/BlueSlime/death/death_4.png',
        'img/Enemies/Slime/BlueSlime/death/death_5.png',
        'img/Enemies/Slime/BlueSlime/death/death_6.png',
        'img/Enemies/Slime/BlueSlime/death/death_7.png',
        'img/Enemies/Slime/BlueSlime/death/death_8.png'
    ];

    IMAGES_WALKING_TINY = [
        'img/Enemies/Tiny slime/move/tile008.png',
        'img/Enemies/Tiny slime/move/tile009.png',
        'img/Enemies/Tiny slime/move/tile010.png',
        'img/Enemies/Tiny slime/move/tile011.png',
        'img/Enemies/Tiny slime/move/tile012.png',
        'img/Enemies/Tiny slime/move/tile012.png',
        'img/Enemies/Tiny slime/move/tile011.png',
        'img/Enemies/Tiny slime/move/tile013.png',
        'img/Enemies/Tiny slime/idle/tile000.png',
        'img/Enemies/Tiny slime/idle/tile001.png',
        'img/Enemies/Tiny slime/idle/tile002.png',
        'img/Enemies/Tiny slime/idle/tile000.png',
        'img/Enemies/Tiny slime/idle/tile001.png',
        'img/Enemies/Tiny slime/idle/tile002.png',
        'img/Enemies/Tiny slime/idle/tile000.png',
        'img/Enemies/Tiny slime/idle/tile001.png',
        'img/Enemies/Tiny slime/idle/tile002.png'
    ];

    IMAGES_DEAD_TINY = [
        'img/Enemies/Tiny slime/death/tile016.png',
        'img/Enemies/Tiny slime/death/tile017.png',
        'img/Enemies/Tiny slime/death/tile018.png',
        'img/Enemies/Tiny slime/death/tile019.png',
        'img/Enemies/Tiny slime/death/tile020.png',
        'img/Enemies/Tiny slime/death/tile021.png',
        'img/Enemies/Tiny slime/death/tile022.png',
        'img/Enemies/Tiny slime/death/tile023.png'
    ];

    IMAGES_WALKING_FLY = [
        'img/Enemies/Flying slime/idle/tile000.png',
        'img/Enemies/Flying slime/idle/tile001.png',
        'img/Enemies/Flying slime/idle/tile002.png',
        'img/Enemies/Flying slime/idle/tile003.png'
    ];

    IMAGES_DEAD_FLY = [
        'img/Enemies/Flying slime/death/tile000.png',
        'img/Enemies/Flying slime/death/tile001.png',
        'img/Enemies/Flying slime/death/tile002.png',
        'img/Enemies/Flying slime/death/tile003.png',
        'img/Enemies/Flying slime/death/tile004.png',
        'img/Enemies/Flying slime/death/tile005.png'
    ];


    constructor(start, category) {
        super().loadImage('img/Enemies/Slime/BlueSlime/move/move_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING_TINY);
        this.loadImages(this.IMAGES_DEAD_TINY);
        this.loadImages(this.IMAGES_WALKING_FLY);
        this.loadImages(this.IMAGES_DEAD_FLY);
        this.category = category;
        this.y = 380;
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
            this.x = start + 720 + Math.random() * 200;
        } else {
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