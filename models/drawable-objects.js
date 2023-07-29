class DrawableObject {
    height;
    width;
    x;
    y;
    img;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;


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
        if (this instanceof Character || this instanceof Slime || this instanceof Endboss || this instanceof ThrowableObject || this instanceof StatusbarIcon) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            if (this instanceof Character) {
                ctx.strokeStyle = 'green';
                // Whole dimension of png
                ctx.rect(this.x, this.y, this.width, this.height);
                // Actual hitbox
                ctx.rect(this.x + this.offset.left,
                    this.y + this.offset.top,
                    this.width - this.offset.right,
                    this.height - this.offset.bottom);
            } else if (this instanceof Slime) {
                // Whole dimension of png 
                ctx.rect(this.x, this.y, this.width, this.height);
                // Actual hitbox
                ctx.rect(this.x + this.offset.left,
                    this.y + this.offset.top,
                    this.width - this.offset.right,
                    this.height - this.offset.bottom);
            } else if (this instanceof Endboss) {
                // Whole dimension of png 
                ctx.rect(this.x, this.y, this.width, this.height);
                // Actual hitbox
                ctx.rect(this.x + this.offset.left,
                    this.y + this.offset.top,
                    this.width - this.offset.right,
                    this.height - this.offset.bottom);
            } else if (this instanceof ThrowableObject) {
                ctx.strokeStyle = 'blue';
                // Whole dimension of png 
                ctx.rect(this.x, this.y, this.width, this.height);
                // Actual hitbox
                ctx.rect(this.x + this.offset.left,
                    this.y + this.offset.top,
                    this.width - this.offset.right,
                    this.height - this.offset.bottom);
            } else if (this instanceof StatusbarIcon) {
                ctx.strokeStyle = 'yellow';
                // Whole dimension of png and actual Hitbox
                ctx.rect(this.x, this.y, this.width, this.height);                
            }
            ctx.stroke();
        }
    }
}