class DrawableObject {
    height;
    width;
    x;
    y;
    img;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;


    /**
     * This function takes a path to an image as string, creates a new Image object and assigns the path to its source
     * 
     * @param {string} path - The path is a string with a path to a certain image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * This function creates all images needed for a passed in animation and assigns the certain pathes to the Image Objects
     * 
     * @param {Array} arr - Array filled with different image paths needed for an animation
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * This function draws an 2D image on the canvas with a given image x and y coordinates, height and witdh of the image
     * 
     * @param {CanvasDrawImage} ctx - Context for the drawing method on the canvas
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }



    /**
     * This function draws an outer and inner hitbox frame around certain objects. This is only needed when in developing state and one wants to make changes
     * in reference to the collision or certain abilites. Helps visualizing the position and interaction between different objects
     * 
     * @param {CanvasDrawImage} ctx - Context for the drawing method on the canvas
     */
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