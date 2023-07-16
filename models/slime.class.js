class Slime extends MovableObject {
    height = 96;
    width = 96;
    IMAGES_WALKING = [
        'img/Enemies/Slime/BlueSlime/walk_1.png',
        'img/Enemies/Slime/BlueSlime/walk_2.png',
        'img/Enemies/Slime/BlueSlime/walk_3.png'
    ];



    constructor() {
        super().loadImage('img/Enemies/Slime/BlueSlime/walk_1.png');
        this.x = 200 + Math.random() * 500;
        this.y = 383;
      
        this.loadImages(this.IMAGES_WALKING);
        this.speed = this.speed + Math.random() * 0.35;
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
           this.playAnimation(this.IMAGES_WALKING);
        }, 250);

    }
}