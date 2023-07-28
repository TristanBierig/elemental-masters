class Foreground extends MovableObject {
    height = 180;
    width = 80;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        if (x) {
            this.width = 120;
            this.height = 220;
            this.x = x;
            this.y = 225;
            return
        }
        this.x = Math.random() * 2160;
        this.y = 265;

    }
}