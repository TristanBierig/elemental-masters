class Cloud extends MovableObject {
    shape = Math.floor(Math.random() * 19) + 1;
    height = 50;
    width = 150;
    

    constructor() {
        super().loadImage(`img/Background/Cloud Pack/Cloud_${this.shape}.png`);
        this.x = Math.random() * 500;
        this.y = Math.random() * 80;
        this.speed = 0.5;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}