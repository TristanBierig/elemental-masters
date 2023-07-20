class DrawableObject {
    height;
    width;
    x;
    y;
    img;
    imageCache = {};
    currentImage = 0;  


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
            } else if (this instanceof Endboss) {
                ctx.rect(this.x + 260, this.y + 70, this.width - 520, this.height + 110);
            }
            ctx.stroke();
        }
    }

    
}