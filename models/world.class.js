class World {
    character = new Character();
    level = level1; // ground on Y-axis 440
    floor = [];
    statusBar = [
        new StatusBar(),
        new StatusBarMana(),
        new StatusBarStars()
    ];
    collectableItems = [];
    droprate;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    backgroundStartX = 1434;
    oddBackgroundNeeded = true;

    slimeKillAudio = playerSoundsKillSlime;
    rockShatterAudio = playerSoundsEarthSpell;
    collectItemsAudio = playerSoundsCollectLoot;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.expandFloor();
        this.draw();
        this.spawnNewEnemies();
        this.updateGame();
    }


    updateGame() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                // If character is landing on top of enemy -> kills enemy
                this.checkJumpOnEnemy(enemy, index);
                // Checks if colliding while Q-Attack is running
                this.checkMeleeAttack(enemy, index);
                // Checks if any active Spell is hitting enemy
                this.checkSpellAttack(enemy, index);
                // Checks if character collides with loot and collects it
                this.checksLoot();
                // Checks for collision bewtween character and any enemy
                this.checkGettingHit(enemy)
                // console.log(this.character, enemy);
                // console.log(this.character.lifePoints);
                // console.log(this.character.takingHit);
            });
        }, 1000 / 25);
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
    expandFloor(newScreen) {
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


    expandBackground() {
        // let cloudHeight = Math.floor(Math.random() * 1);
        // if (this.oddBackgroundNeeded && world) {
        //     world.level.backgroundObjects.push(
        //         new Background('img/Background/background/sky_odd.png', this.backgroundStartX - 1, 0),
        //         new Background('img/Background/background/cloud.png', this.backgroundStartX - 1, 0, 720, 150),
        //         new Background('img/Background/background/mountain2.png', this.backgroundStartX - 3, 150, 720, 200),
        //         new Background('img/Background/background/mountain.png', this.backgroundStartX - 3, 80, 720, 400)
        //     );
        //     this.backgroundStartX += 2 
        //     this.oddBackgroundNeeded = false;
        // } else if(world) {
        //     world.level.backgroundObjects.push(
        //         new Background('img/Background/background/sky.png', this.backgroundStartX - 1, 0),
        //         new Background('img/Background/background/cloud.png', this.backgroundStartX - 1, 0, 720, 150),
        //         new Background('img/Background/background/mountain2.png', this.backgroundStartX - 3, 150, 720, 200),
        //         new Background('img/Background/background/mountain.png', this.backgroundStartX - 3, 80, 720, 400)
        //     );
        // }
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
        if (this.collectableItems.length > 0) {
            this.addObjectsToMap(this.collectableItems);
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
            this.expandFloor(true);
            this.expandBackground();
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

    spawnNewEnemies() {
        this.spawnInterval = setInterval(() => {
            world.level.enemies.push(new Slime(world.character.x));
            world.level.enemies.push(new Slime(world.character.x, true));
            world.level.enemies.push(new Slime(world.character.x, false));
        }, 15000);
    }

    checkJumpOnEnemy(enemy, index) {
        if (this.character.isColliding(enemy) && this.character.speedY < 0 && this.character.isAirborne()) {
            this.character.jump();
            this.slimeKillAudio.play();
            this.damageEnemy(enemy, index, 100);
        }
    }


    checkMeleeAttack(enemy, index) {
        if (this.character.isColliding(enemy) && this.character.spellCooldownQ) {
            this.damageEnemy(enemy, index, 50);

        }
    }


    checkSpellAttack(enemy, index) {
        if (this.character.activeSpells.length > 0) {
            this.character.activeSpells.forEach((spell, i) => {
                if (spell.isColliding(enemy)) {
                    this.rockShatterAudio.play();
                    spell.lifePoints = 0;
                    spell.offset.top = 1500;
                    this.damageEnemy(enemy, index, 100);
                    // enemy.lifePoints = 0;
                    // Prevents getting hit by dead enemy while its animation is still playing
                    // enemy.offset.top = -1500;
                    // Deletes enemy object from world after death animation played
                    // setTimeout(() => {
                    //     this.character.activeSpells.splice(i, 1);
                    //     if (enemy instanceof Slime) {
                    //         this.dropLoot(enemy);
                    //         this.level.enemies.splice(index, 1, new Slime(this.character.x));
                    //     }
                    // }, 1000);
                }
            })
        }
    }


    damageEnemy(enemy, index, damage) {
        enemy.lifePoints -= damage;
        this.character.offset = this.offset = {
            top: 172,
            bottom: 185,
            left: 275,
            right: 550
        };
        if (enemy.lifePoints <= 0) {
            // Shrinks hitbox to prevent enemy interaction while death animation is playing
            enemy.offset.top = -500;
            this.killAndSpawnEnemy(enemy, index);
        }
    }

    killAndSpawnEnemy(enemy, index) {
        // Deletes enemy object from world after death animation played, spawns new one and drops a collectable item as loot
        setTimeout(() => {
            if (enemy instanceof Slime) {
                this.dropLoot(enemy);
                if (enemy.tiny === undefined) {
                    this.level.enemies.splice(index, 1, new Slime(this.character.x, undefined));
                } else if (enemy.tiny === false) {
                    this.level.enemies.splice(index, 1, new Slime(this.character.x, false));
                } else {
                    this.level.enemies.splice(index, 1, new Slime(this.character.x, true));
                }
            }
        }, 1200);
        console.log('Gegner gekillt');
    }

    dropLoot(enemy) {
        // Defines the droprate. Whether a manapot or star is dropped.
        this.droprate = Math.random() * 100;

        if (enemy.tiny) {
            if (this.droprate < 50) {
                this.collectableItems.push(new StatusbarIcon(enemy.x + enemy.offset.left, enemy.y + 30, 'MANA'));
            } else {
                this.collectableItems.push(new StatusbarIcon(enemy.x + enemy.offset.left, enemy.y + 30, 'STAR'));
            }
        } else if (enemy.tiny === false) {
            this.collectableItems.push(new StatusbarIcon(enemy.x + enemy.offset.left, enemy.y + 30, 'STAR'));
        } else {
            this.collectableItems.push(new StatusbarIcon(enemy.x + enemy.offset.left, enemy.y + 30, 'MANA'));
        }
    }

    checksLoot() {
        if (this.collectableItems.length > 0) {
            this.collectableItems.forEach((item, i) => {
                if (item.isColliding(this.character)) {
                    this.collectItemsAudio.play();
                    item.lifePoints = 0;
                    this.collectableItems.splice(i, 1);
                    // checks if collected item is mana pot or star and fills the statusbar accordingly
                    if (item.category == 'MANA') {
                        this.statusBar[1].percentage += 20;
                    } else {
                        this.statusBar[2].percentage += 20;
                    }
                }
            })
        }
    }

    checkGettingHit(enemy) {
        if (this.character.isColliding(enemy)) {
            enemy.isHitting = true;
            this.character.takingHit = true;
            this.character.gettingHit();
            this.statusBar[0].percentage = this.character.lifePoints;
            // return;
        }

        // Stops hit animation from char when he is not being hit anymore
        if (!this.character.isColliding(enemy) && enemy.isHitting) {
            enemy.isHitting = false;
            this.character.takingHit = false;
        }
    }
}