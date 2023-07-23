class Endboss extends MovableObject {
    isHitting = false;
    IMAGES_WALKING = [
        'img/Endboss/individual sprites/01_idle/idle_1.png',
        'img/Endboss/individual sprites/01_idle/idle_2.png',
        'img/Endboss/individual sprites/01_idle/idle_3.png',
        'img/Endboss/individual sprites/01_idle/idle_4.png',
        'img/Endboss/individual sprites/01_idle/idle_5.png',
        'img/Endboss/individual sprites/01_idle/idle_6.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500; // 1500 default
        this.y = 288;
        this.width = 288;
        this.height = 160;
        this.speed = 0.15; // 0.2 default
        // Defines the Hitbox
        this.offset = {
            top: 140,
            bottom: 139,
            left: 130,
            right: 268
        };
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 1000 / 5);
    }
}