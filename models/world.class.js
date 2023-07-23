class World {
    character = new Character();
    level = level1;
    floor = [];
    statusBar = [
        new StatusBar(),
        new StatusBarMana(),
        new StatusBarStars()
    ]
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    slimeKillAudio = playerSoundsKillSlime;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.fillFloorArray();
        this.draw();
        this.checkCollisions();
    }


    checkCollisions() {
        setInterval(() => {
            // debugger
            this.level.enemies.forEach((enemy, index) => {

                // Checks if character is landing on top of enemy -> kills given enemy
                if (this.character.isColliding(enemy) && this.character.speedY < 0 && this.character.isAirborne()) {
                    this.character.jump();
                    this.slimeKillAudio.play();
                    enemy.lifePoints = 0;
                    // Prevents getting hit by dead enemy while its animation is still playing
                    enemy.offset.top = 500;

                    // Delets enemyobject from world after death animation played
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 1200);
                    console.log('Gegner gekillt');
                }

                // Checks for collision bewtween character and any enemy
                if (this.character.isColliding(enemy)) {
                    enemy.isHitting = true;
                    this.character.takingHit = true;
                    this.character.gettingHit();
                    this.statusBar[0].percentage = this.character.lifePoints;
                    // console.log(this.character, enemy);
                    // console.log(this.character.lifePoints);
                    // console.log(this.character.takingHit);
                    return;
                }

                if (!this.character.isColliding(enemy) && enemy.isHitting) {
                    enemy.isHitting = false;
                    this.character.takingHit = false;
                }
            });
        }, 1000 / 24);
    }


    checkEnemyHitting(enemy) {
        return enemy.isHitting == true;
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
        // debugger
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        if (this.character.activeSpells.length > 0) {
            this.addObjectsToMap(this.character.activeSpells);
        }
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // Back
        // debugger
        this.addObjectsToMap(this.statusBar);
        this.addFrameToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); // Forwards

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


    addFrameToMap(object) {
        object.forEach(obj => {
            this.addToMap(obj.statusbarFrame);
            this.addToMap(obj.statusbarIcon);
        })
    }


    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        })
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // debugger
        if (mo.drawHitbox(this.ctx)) {

        }
        mo.drawHitbox(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * - 1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * - 1;
        this.ctx.restore();
    }
}