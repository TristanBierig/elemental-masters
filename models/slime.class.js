class Slime extends MovableObject {
    isHitting = false;
    IMAGES_WALKING = [
        'img/Enemies/Slime/BlueSlime/idle/idle_1.png',
        'img/Enemies/Slime/BlueSlime/idle/idle_2.png',
        'img/Enemies/Slime/BlueSlime/idle/idle_3.png',
    ];


    constructor() {
        super().loadImage('img/Enemies/Slime/BlueSlime/move/move_1.png');
        this.x = 200 + Math.random() * 500;
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
        this.loadImages(this.IMAGES_WALKING);
        this.speed = this.speed + Math.random() * 0.35; // 0.35
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 5);

    }
}