class MovableObject {
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelertion = 1;
    test = '';

    applyGravitiy() {
        setInterval(() => {
            if (this.isAirborne()) {
                this.y += this.speedY;
                this.speedY += this.accelertion;
            }
        }, 1000 / 25);
    }

    isAirborne() {
        return this.y < 205;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving right');
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }


    /**
     * This function iterates over a passed in Array 
     * 
     * @param {Array} images - Expects and array with all the path to a particual animation 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}