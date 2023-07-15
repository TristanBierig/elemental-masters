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
        new Background('../img/Background/background/sky.png', 0, 0),
        new Background('../img/Background/background/cloud.png', 0, 0, 720, 150),
        new Background('../img/Background/background/mountain2.png', 0, 150, 720, 200),
        new Background('../img/Background/background/mountain.png', 0, 80, 720, 400),
    ];

    foregroundObjects = [
        new Foreground('../img/Background/props/tree2/green/1.png'),
        new Foreground('../img/Background/props/tree2/green/2.png'),
        new Foreground('../img/Background/props/tree2/green/4.png'),
        new Foreground('../img/Background/props/tree2/green/5.png'),
        new Foreground('../img/Background/props/high grass/1.png'),
        new Foreground('../img/Background/props/high grass/3.png'),
        new Foreground('../img/Background/props/high grass/2.png'),
        new Foreground('../img/Background/props/high grass/5.png'), 
        new Foreground('../img/Background/props/bush/green/1.png'), 
        new Foreground('../img/Background/props/tump/3.png'), 
        new Foreground('../img/Background/props/stones/2.png'), 
        new Foreground('../img/Background/props/tree2/orange/2.png'), 
        new Foreground('../img/Background/props/tree2/orange/5.png'),  
    ];

    floor = [
        new Background('../img/Background/tileset/ground.png', -35, 440, 150, 24),
        new Background('../img/Background/tileset/ground.png', 100, 440, 150, 24),
        new Background('../img/Background/tileset/ground.png', 220, 440, 150, 24),
        new Background('../img/Background/tileset/ground.png', 340, 440, 150, 24),
        new Background('../img/Background/tileset/ground.png', 480, 440, 150, 24),
        new Background('../img/Background/tileset/ground.png', 600, 440, 150, 24),
        new Background('../img/Background/tileset/ground_fill.png', -400, 458, 1500, 26),
    ];
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

        // Draws Background
        this.addObjectsToMap(this.backgroundObject);
        // Draws Floor
        this.addObjectsToMap(this.floor);
        // Draws Foreground
        this.addObjectsToMap(this.foregroundObjects);
        // Draws the main Character
        this.addToMap(this.character);
        // Draws the big Slimes
        this.addObjectsToMap(this.enemies);
        // Draws the clouds
        this.addObjectsToMap(this.clouds);



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