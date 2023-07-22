class StatusbarFrame extends DrawableObject {

    constructor(x, y, height, width, image) {
        super().loadImage(image);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}