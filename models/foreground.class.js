class Foreground extends MovableObject {
    height = 180;
    width = 80;
    type = Math.floor(Math.random() * 5) + 1;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = Math.random() * 500;
        this.y = 265;

    }
}