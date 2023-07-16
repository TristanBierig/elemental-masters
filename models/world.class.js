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
        new Background('img/Background/background/sky_odd.png', -720, 0),
        new Background('img/Background/background/cloud.png', -720, 0, 720, 150),
        new Background('img/Background/background/mountain2.png', -720, 150, 720, 200),
        new Background('img/Background/background/mountain.png', -720, 80, 720, 400),
        new Background('img/Background/background/sky.png', -2, 0),
        new Background('img/Background/background/cloud.png', -2, 0, 720, 150),
        new Background('img/Background/background/mountain2.png', -3, 150, 720, 200),
        new Background('img/Background/background/mountain.png', -3, 80, 720, 400),
        new Background('img/Background/background/sky_odd.png', 717, 0),
        new Background('img/Background/background/cloud.png', 717, 0, 720, 150),
        new Background('img/Background/background/mountain2.png', 716, 150, 720, 200),
        new Background('img/Background/background/mountain.png', 716, 80, 720, 400)
    ];
    foregroundObjects = [
        new Foreground('img/Background/props/tree1/green/3.png', -80),
        new Foreground('img/Background/props/tree1/green/3.png', 660),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/cover grass/4.png'),
        new Foreground('img/Background/props/tree2/green/1.png'),
        new Foreground('img/Background/props/tree2/green/2.png'),
        new Foreground('img/Background/props/tree2/green/4.png'),
        new Foreground('img/Background/props/tree2/green/5.png'),
        new Foreground('img/Background/props/high grass/1.png'),
        new Foreground('img/Background/props/high grass/3.png'),
        new Foreground('img/Background/props/high grass/2.png'),
        new Foreground('img/Background/props/high grass/5.png'),
        new Foreground('img/Background/props/bush/green/1.png'),
        new Foreground('img/Background/props/tump/3.png'),
        new Foreground('img/Background/props/stones/2.png'),
        new Foreground('img/Background/props/tree2/orange/2.png'),
        new Foreground('img/Background/props/tree2/orange/5.png'),
    ];
    floor = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.fillFloorArray();
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }


    /**
     * This function pushes new objects into the this.floor-Array based of whether the character travelled a certain distance to the right. (infinite World generation)
     * 
     * @param {boolean} newScreen - This is True when the character travelled a certain distance to the right 
     *                              in relation to the already rendered Background and Floor Sprites X-Coordinates 
     */
    fillFloorArray(newScreen) {
        let oneScreenWidth = 6;
        let tileStart = -720;
        if (newScreen) {
            oneScreenWidth + 6;
            tileStart = this.floor[this.floor.length - 1].x;
        }
        for (let i = 0; i < oneScreenWidth; i++) {
            this.floor.push(new Background('img/Background/tileset/ground.png', tileStart, 440, 150, 24),
                new Background('img/Background/tileset/ground_fill.png', tileStart, 458, 400, 26),
            );
            tileStart = tileStart + 140;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Prevents upscaling Pixelart to be smushy
        this.ctx.imageSmoothingEnabled = false;

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObject);
        this.addObjectsToMap(this.floor);
        this.addObjectsToMap(this.foregroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        this.ctx.translate(-this.camera_x, 0);
        
        // Generate infinite World
        if (this.floor[this.floor.length - 1].x - this.character.x < 600) {
            this.fillFloorArray(true);
        }

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
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * - 1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.otherDirection) {
            mo.x = mo.x * - 1;
            this.ctx.restore();
        }
    }
}