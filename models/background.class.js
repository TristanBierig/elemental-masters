class Background extends MovableObject {
    width = 720;
    height = 480;

    constructor(imagePath, x, y, width, height) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        if (width && height) {
            this.width = width;
            this.height = height;
        }
    }
}