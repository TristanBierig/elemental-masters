class World {
    character = new Character();
    level = level1;
    floor = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    ambient_audio_idle = new Audio('audio/background_loops/Overworld.wav');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.fillFloorArray();
        this.draw();
        this.setWorld();  
    }

    setWorld() {
        //this.character.world = this;
    }


    /**
     * This function pushes new objects into the this.floor-Array based on whether the character travelled a certain distance to the right. (infinite World generation)
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

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.floor);
        this.addObjectsToMap(this.level.foregroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        
        // Generate infinite Floor on moving right
        if (this.floor[this.floor.length - 1].x - this.character.x < 800) {
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