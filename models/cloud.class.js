class Cloud extends MovableObject {

    shape = Math.floor(Math.random() * 19) + 1;

    constructor() {
        super().loadImage(`../img/Background/Cloud Pack/Cloud_${this.shape}.png`);
        this.x = Math.random() * 500;
        this.y = Math.random() * 50;
        this.height = 50;
        this.width = 150;
    }
}