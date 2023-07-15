class World {
    character = new Character();
    enemies = [
        new Slime(),
        new Slime(),
        new Slime()
    ];
    clouds = [
        new Cloud(),
        new Cloud()
    ];

    backgroundObject = [
        new Background('../img/Background/background/sky.png', 0, 0)
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas

        this.draw();
    }



    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Prevents upscaling Pixelart to be smushy
        this.ctx.imageSmoothingEnabled = false;

        // Draws the main Character
        this.addToMap(this.character);
        // Draws the big Slimes
        this.addObjectsToMap(this.enemies);
        // Draws the clouds
        this.addObjectsToMap(this.clouds);
        // Draws Background
        this.addObjectsToMap(this.backgroundObject);


        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        })
    }


    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}