class MovableObject {
    x = -200;
    y = 200;
    img;
    height = 256;
    width = 576;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}