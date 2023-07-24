class Slime extends MovableObject {
    isHitting = false;
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
    ]


    constructor() {
        super().loadImage('img/Enemies/Slime/BlueSlime/move/move_1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.floor(Math.random() * 500);
        this.y = 383; // 383 Ground level
        this.width = 96;
        this.height = 96;
        this.speed = 0.15;
        // Defines the Hitbox
        this.offset = {
            top: 40,
            bottom: 72,
            left: 32,
            right: 66
        };
        this.speed = this.speed + Math.random() * 0.35; // 0.35
        this.animate();
    }


    animate() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

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
        }, 1000 / 6);

    }
}