class MovableObject {
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelertion = 1;


    applyGravitiy() {
        setInterval(() => {
            if (this.isAirborne() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelertion;
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


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Slime || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            if (this instanceof Character) {
                ctx.rect(this.x + 260, this.y + 170, this.width - 520, this.height - 180);
            } else if (this instanceof Slime) {
                ctx.rect(this.x + 24, this.y + 16, this.width - 56, this.height - 48);
            }
            ctx.stroke();
        }
    }


    isColliding(mo) {
        return this.hitbox_x_end > mo.hitbox_x_start &&
            this.hitbox_y_end > mo.hitbox_y_start &&
            this.hitbox_x_start < mo.hitbox_x_end &&
            this.hitbox_y_start < mo.hitbox_y_end;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }


    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    jump() {
        this.speedY = 20;
    }


    /**
     * This function iterates over a passed in Array 
     * 
     * @param {Array} images - Expects and array with all the paths to a particual animation 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}