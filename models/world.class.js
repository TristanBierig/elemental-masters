class World {
    character;
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
    spawnInterval;
    camera_x = 0;
    endbossSpawned = false;

    // Starts background render from left out of sight
    backgroundStartX = -2160; // -2160 default
    oddBackgroundNeeded = true;

    slimeKillAudio = playerSoundsKillSlime;
    rockShatterAudio = playerSoundsEarthSpell;
    collectItemsAudio = playerSoundsCollectLoot;

    constructor(canvas, keyboard, choosenChar) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.updateGame();
        this.spawnClouds();
        this.expandFloor();
        switch (choosenChar) {
            case 'Earth':
                this.character = new CharacterEarth();
                break;
            case 'Fire':
                this.character = new CharacterFire();
                break;
            case 'Water':
                this.character = new CharacterWater();
                break;
            case 'Wind':
                this.character = new CharacterWind();
                break;
        }
        this.draw();
        this.spawnNewEnemies();
        this.checkKillEnemy();
    }


    updateGame() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                this.checkJumpOnEnemy(enemy, index);
                this.checkMeleeAttack(enemy, index);
                this.checkSpellAttack(enemy, index);
                this.checkKillEnemyOutOfSight(enemy, index);
                this.checkGettingHit(enemy);
                this.collectLoot();

                if (world && world.statusBar[2].percentage == 100 && !this.endbossSpawned && this.character.x > 1400) {
                    this.endbossSpawned = true;
                    this.spawnEndboss();
                }
            });
        }, 1000 / 25);
    }


    checkEnemyHitting(enemy) {
        return enemy.isHitting == true;
    }


    /**
     * This function pushes new objects into the this.floor-Array based on whether the character travelled a certain distance to the right. (infinite World generation)
     * 
     * @param {boolean} isNewScreen - This is True when the character travelled a certain distance to the right 
     *                              in relation to the already rendered Background and Floor Sprites X-Coordinates 
     */
    expandFloor(isNewScreen) {
        let oneScreenWidth = 6;
        let tileStart = -720;
        if (isNewScreen) {
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
        let cloudHeight = Math.floor(Math.random() * 1);
        let newStartSky = this.backgroundStartX + 719;
        let newStartMountain = this.backgroundStartX + 717;

        if (this.oddBackgroundNeeded && world) {
            world.level.backgroundObjects.push(
                new Background('img/Background/background/sky_odd.png', newStartSky, 0),
                new Background('img/Background/background/cloud.png', newStartSky, cloudHeight, 720, 150),
                new Background('img/Background/background/mountain2.png', newStartMountain, 150, 720, 200),
                new Background('img/Background/background/mountain.png', newStartMountain, 80, 720, 400)
            );
            this.oddBackgroundNeeded = false;
        } else if (world) {
            world.level.backgroundObjects.push(
                new Background('img/Background/background/sky.png', newStartSky, 0),
                new Background('img/Background/background/cloud.png', newStartSky, cloudHeight, 720, 150),
                new Background('img/Background/background/mountain2.png', newStartMountain, 150, 720, 200),
                new Background('img/Background/background/mountain.png', newStartMountain, 80, 720, 400)
            );
            this.oddBackgroundNeeded = true;
        }
        this.backgroundStartX = newStartSky;
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
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Slime) {
                this.addToMap(enemy.lifeBar);
            }
        });
        this.addToMap(this.character);

        if (this.character.activeSpells.length > 0) {
            this.addObjectsToMap(this.character.activeSpells);
        }
        if (this.collectableItems.length > 0) {
            this.addObjectsToMap(this.collectableItems);
        }

        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // Back
        this.addObjectsToMap(this.statusBar);
        this.addFrameToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); // Forwards

        this.ctx.translate(-this.camera_x, 0);

        // Generate infinite World on moving right
        if (this.floor[this.floor.length - 1].x - this.character.x < 800) {
            this.expandFloor(true);
        }
        if (this.backgroundStartX < this.character.x || this.character.x + 720 > this.backgroundStartX) {
            this.expandBackground();
        }

        console.log(this.level.enemies[0].lifeBar.x);
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
        // mo.drawHitbox(this.ctx);

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


    /**
     * This function checks all 5 seconds if there are still enemies on the map and spawns new one if there are none
     * 
     */
    spawnNewEnemies() {
        this.spawnInterval = setInterval(() => {
            let hasEnemies;
            if (world) {
                hasEnemies = world.level.enemies.some((enemy) => enemy instanceof Slime);
            }
            if (!hasEnemies) {
                this.spawnNormalSlime();
                this.spawnTinySlime();
                this.spawnFlyingSlime();
            }

            if (this.endbossSpawned) {
                clearInterval(this.spawnInterval);
            }
        }, 1000);
    }


    spawnEndboss() {
        world.level.enemies.push(new Endboss(this.character.x));
    }


    spawnNormalSlime() {
        world.level.enemies.push(new Slime(world.character.x, 'normal'));
        world.level.enemies.push(new Slime(world.character.x, 'normal'));
    }


    spawnTinySlime() {
        world.level.enemies.push(new Slime(world.character.x, 'tiny'));
        world.level.enemies.push(new Slime(world.character.x, 'tiny'));
    }


    spawnFlyingSlime() {
        world.level.enemies.push(new Slime(world.character.x, 'fly'));
        world.level.enemies.push(new Slime(world.character.x, 'fly'));
    }


    spawnClouds() {
        setInterval(() => {
            world.level.clouds.push(new Cloud(this.character.x));
        }, 10000);
    }


    checkJumpOnEnemy(enemy, index) {
        // Cant damage Endboss with jump
        if (enemy instanceof Slime || !enemy.isTransformed) {
            if (this.character.isColliding(enemy) && this.character.speedY < 0 && (this.character.isAirborne() || (this.character instanceof CharacterEarth && this.character.y < 205)) && !this.character.spellCooldownQ) {
                this.character.jump();
                this.slimeKillAudio.play();
                this.damageEnemy(enemy, index, 100);
            }
        }
    }


    checkMeleeAttack(enemy, index) {
        if (this.character.isColliding(enemy) && this.character.spellCooldownQ && !this.character.isHitting) {
            this.character.isHitting = true;
            this.damageEnemy(enemy, index, 50);
            this.character.punch_sound.playpause();
        }
    }


    checkSpellAttack(enemy, index) {
        if (this.character.activeSpells.length > 0) {
            this.character.activeSpells.forEach((spell, i) => {
                if (spell.isColliding(enemy)) {
                    this.rockShatterAudio.play();
                    spell.lifePoints = 0;
                    setTimeout(() => {
                        spell.isKilled = true;
                    }, 400);
                    this.damageEnemy(enemy, spell, 100);
                }
            })
        }
    }


    checkGettingHit(enemy) {
        if (this.character.isColliding(enemy) && !this.character.spellCooldownQ && !this.character.isAirborne()) {
            enemy.isHitting = true;
            this.character.isTakingHit = true;
            this.character.gettingHit();
            this.statusBar[0].percentage = this.character.lifePoints;
        }
        // Stops hit animation from char when he is not being hit anymore
        if (!this.character.isColliding(enemy) && enemy.isHitting) {
            enemy.isHitting = false;
            this.character.isTakingHit = false;
        }
    }


    damageEnemy(enemy, spell, damage) {
        if (enemy instanceof Slime || !enemy.isTransformed) {
            enemy.lifePoints -= damage;
        } else if (enemy.isTransformed && enemy.Status != 'STAND') {
            enemy.lifePoints -= damage;
            enemy.isTakingHit = true;
        }

        if (enemy instanceof Endboss && enemy.isTransformed) {
            world.statusBar[3].percentage = enemy.lifePoints;
            if (world.statusBar[3].percentage <= 0) {
                world.statusBar[3].percentage = 0;
            }
        }

        if (enemy.lifePoints <= 0 && enemy instanceof Slime) {
            // Shrinks hitbox to prevent enemy interaction while death animation is playing
            // Handles normal enemy Kills
            setTimeout(() => {
                this.dropLoot(enemy);
                enemy.isKilled = true;
            }, 1200); // 1200 default
            enemy.offset.top = -500;
        }
        // Shrinks hitbox to prevent enemy interaction while death animation is playing
        // Handles Endboss Kill
        if (enemy.lifePoints <= 0 && enemy.isTransformed) {
            playerSoundsEndbossDeath.play();
            setTimeout(() => {
                enemy.isKilled = true;
                playerSoundsVictory.play();
                GameOver(true);
                world.character.isGameOver = true;
            }, 4000); // 4000 default
            enemy.offset.top = -500;
        }
    }


    checkKillEnemy() {
        setInterval(() => {
            for (let i = world.level.enemies.length - 1; i >= 0; i--) {
                const enemy = world.level.enemies[i];
                if (enemy.isKilled && !this.endbossSpawned) {
                    world.level.enemies.splice(i, 1, new Slime(this.character.x, enemy.category));
                }
                if (enemy.isKilled && this.endbossSpawned) {
                    world.level.enemies.splice(i, 1);
                }
            }
            for (let i = this.character.activeSpells.length - 1; i >= 0; i--) {
                const spell = this.character.activeSpells[i];
                if (spell.isKilled) {
                    this.character.activeSpells.splice(i, 1);
                }
            }
        }, 1000 / 60);
    }


    dropLoot(enemy) {
        // Defines the droprate. Whether a manapot or star is dropped.
        this.droprate = Math.random() * 100;

        if (enemy.category == 'tiny') {
            switch (true) {
                case (this.droprate < 25):
                    this.collectableItems.push(new StatusbarIcon(enemy.x + enemy.offset.left, enemy.y + 30, 'MANA'));
                    break;
                case (this.droprate < 50):
                    this.collectableItems.push(new StatusbarIcon(enemy.x + enemy.offset.left, enemy.y + 30, 'STAR'));
                    break;
            }
        }

        if (enemy.category == 'fly') {
            if (this.droprate < 40) {
                this.collectableItems.push(new StatusbarIcon(enemy.x + enemy.offset.left, enemy.y + 30, 'STAR'));
            }
        }

        if (enemy.category == 'normal') {
            if (this.droprate < 70)
                this.collectableItems.push(new StatusbarIcon(enemy.x + enemy.offset.left, enemy.y + 30, 'MANA'));
        }
    }


    collectLoot() {
        if (this.collectableItems.length > 0) {
            this.collectableItems.forEach((item, i) => {
                if (item.isColliding(this.character)) {
                    this.collectItemsAudio.play();
                    item.lifePoints = 0;
                    this.collectableItems.splice(i, 1);
                    // checks if collected item is mana pot or star and fills the statusbar accordingly
                    if (item.category == 'MANA') {
                        this.statusBar[1].percentage += 20;
                        if (this.statusBar[1].percentage > 100) {
                            this.statusBar[1].percentage = 100;
                        }
                    } else {
                        this.statusBar[2].percentage += 20;
                        if (this.statusBar[2].percentage > 100) {
                            this.statusBar[2].percentage = 100;
                        }
                    }
                }
            })
        }
    }


    /**
     * This function deletes enemy object from the enemies array when they are travelled to far to the left in Relation to the character.
     * Helps cycling enemies
     * 
     * @param {object} enemy 
     */
    checkKillEnemyOutOfSight(enemy) {
        if ((this.character.x - 720) > enemy.x && enemy.x < this.character.x) {
            enemy.isKilled = true;
        }
    }
}