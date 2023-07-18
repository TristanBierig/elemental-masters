class Slime extends MovableObject {
    height = 96;
    width = 96;
    IMAGES_WALKING = [
        'img/Enemies/Slime/BlueSlime/move/move_1.png',
        'img/Enemies/Slime/BlueSlime/move/move_2.png',
        'img/Enemies/Slime/BlueSlime/move/move_3.png',
        'img/Enemies/Slime/BlueSlime/move/move_4.png',
        'img/Enemies/Slime/BlueSlime/move/move_5.png',
        'img/Enemies/Slime/BlueSlime/move/move_6.png',
        'img/Enemies/Slime/BlueSlime/move/move_7.png',
        'img/Enemies/Slime/BlueSlime/move/move_8.png'        
    ];



    constructor() {
        super().loadImage('img/Enemies/Slime/BlueSlime/move/move_1.png');
        this.x = 200 + Math.random() * 500;
        this.y = 383; // 383 Ground level
      
        this.loadImages(this.IMAGES_WALKING);
        this.speed = this.speed + Math.random() * 0.35;
        this.animate();
    }

    animate() {
        setInterval(() => {
            // if (this.y < 383) {
                this.moveLeft();
            // }
        }, 1000 / 60);

        setInterval(() => {
           this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 4);

    }
}