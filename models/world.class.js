class World {
    character;
    level = level1; // ground on Y-axis 440
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

    slimeKillAudio = playerSoundsKillSlime;
    rockShatterAudio = playerSoundsEarthSpell;
    collectItemsAudio = playerSoundsCollectLoot;

    constructor(canvas, keyboard, choosenChar) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.updateGame();
        this.spawnClouds();
        this.chooseCharacter(choosenChar);
        this.draw();
        this.spawnNewEnemies();
        this.checkKillEnemy();
    }


    /**
     * This function creates a new Character Object depending on the choosen character
     * 
     * @param {string} choosenChar - element of the choosen character
     */
    chooseCharacter(choosenChar) {
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
    }


    /**
     * This function sets an Interval and checks continuously if certain interactions between character and enemies occur
     * 
     */
    updateGame() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                this.checkJumpOnEnemy(enemy);
                this.checkMeleeAttack(enemy);
                this.checkSpellAttack(enemy);
                this.checkKillEnemyOutOfSight(enemy);
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
     * This function draws all the images on the canvas
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Prevents upscaling Pixelart to be smushy
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.translate(this.camera_x, 0);
        this.handleMultipleObjectDraw();
        this.addToMap(this.character);
        this.handleStaticObjectDraw();
        this.ctx.translate(-this.camera_x, 0);
        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * This function draws only static items
     * 
     */
    handleStaticObjectDraw() {
        this.ctx.translate(-this.camera_x, 0); // Back
        this.addObjectsToMap(this.statusBar);
        this.addFrameToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); // Forwards
    }


    /**
     * This function draws images containing multiple objects
     * 
     */
    handleMultipleObjectDraw() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.floor);
        this.addObjectsToMap(this.level.foregroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        if (this.character.activeSpells.length > 0) {
            this.addObjectsToMap(this.character.activeSpells);
        }
        if (this.collectableItems.length > 0) {
            this.addObjectsToMap(this.collectableItems);
        }
    }


    /**
     * This function draws the static status bar frames and icons
     * 
     * @param {object} object - either an object regarding the icon or frame used for the status bars
     */
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
        // Is just need to adjust Hitboxes with e.g. new Spells
        // mo.drawHitbox(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * This function flips the image if need. E.g. if its travelling in opposing direction thant its grafic is designed for
     * 
     * @param {object} mo - object that needs to be drawn
     */
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
     * This function checks every second if there are still enemies on the map and spawns new one if there are none
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


    
    checkJumpOnEnemy(enemy) {
        // Cant damage Endboss with jump
        if (enemy instanceof Slime || !enemy.isTransformed) {
            if (this.character.isColliding(enemy) && this.character.speedY < 0 && (this.character.isAirborne() || (this.character instanceof CharacterEarth && this.character.y < 205)) && !this.character.spellCooldownQ) {
                this.character.jump();
                this.slimeKillAudio.play();
                this.damageEnemy(enemy, 100);
            }
        }
    }


    checkMeleeAttack(enemy) {
        if (this.character.isColliding(enemy) && this.character.spellCooldownQ && !this.character.isHitting) {
            this.character.isHitting = true;
            this.damageEnemy(enemy, 50);
            this.character.punch_sound.playpause();
        }
    }


    checkSpellAttack(enemy) {
        if (this.character.activeSpells.length > 0) {
            this.character.activeSpells.forEach((spell) => {
                if (spell.isColliding(enemy)) {
                    this.rockShatterAudio.play();
                    spell.lifePoints = 0;
                    setTimeout(() => {
                        spell.isKilled = true;
                    }, 400);
                    this.damageEnemy(enemy, 100);
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


    damageEnemy(enemy, damage) {
        this.handleDamageForSlimes(enemy, damage);
        this.handleDamageForEndboss(enemy);
        this.handleKillForSlimes(enemy);
        this.handleKillForEndboss(enemy);
    }


    handleKillForEndboss(enemy) {
        if (enemy.lifePoints <= 0 && enemy.isTransformed) {
            playerSoundsEndbossDeath.play();
            setTimeout(() => {
                enemy.isKilled = true;
                playerSoundsVictory.play();
                GameOver(true);
                world.character.isGameOver = true;
            }, 4000); // 4000 default
            // Shrinks hitbox to prevent enemy interaction while death animation is playing
            enemy.offset.top = -500;
        }
    }


    handleKillForSlimes(enemy) {
        if (enemy.lifePoints <= 0 && enemy instanceof Slime) {
            setTimeout(() => {
                this.dropLoot(enemy);
                enemy.isKilled = true;
            }, 1200); // 1200 default
            // Shrinks hitbox to prevent enemy interaction while death animation is playing
            enemy.offset.top = -500;
        }
    }


    handleDamageForEndboss(enemy) {
        if (enemy instanceof Endboss && enemy.isTransformed && this.statusBar[3]) {
            world.statusBar[3].percentage = enemy.lifePoints;
            if (world.statusBar[3].percentage <= 0) {
                world.statusBar[3].percentage = 0;
            }
        }
    }


    handleDamageForSlimes(enemy, damage) {
        if (enemy instanceof Slime || !enemy.isTransformed) {
            enemy.lifePoints -= damage;
        } else if (enemy.isTransformed && enemy.Status != 'STAND') {
            enemy.lifePoints -= damage;
            enemy.isTakingHit = true;
        }
    }


    checkKillEnemy() {
        setInterval(() => {
            this.checkForDeadEnemy();
            this.checkForDeadSpell();
        }, 1000 / 60);
    }


    checkForDeadEnemy() {
        for (let i = world.level.enemies.length - 1; i >= 0; i--) {
            const enemy = world.level.enemies[i];
            if (enemy.isKilled && !this.endbossSpawned) {
                world.level.enemies.splice(i, 1, new Slime(this.character.x, enemy.category));
            }
            if (enemy.isKilled && this.endbossSpawned) {
                world.level.enemies.splice(i, 1);
            }
        }
    }


    checkForDeadSpell() {
        for (let i = this.character.activeSpells.length - 1; i >= 0; i--) {
            const spell = this.character.activeSpells[i];
            if (spell.isKilled) {
                this.character.activeSpells.splice(i, 1);
            }
        }
    }


    dropLoot(enemy) {
        // Defines the droprate, which is used to define the chance of a manapot or star being dropped
        this.droprate = Math.random() * 100;
        this.dropLootFromTinySlime(enemy);
        this.dropLootFromFlyingSlime(enemy);
        this.dropLootFromNormalSlime(enemy);
    }


    dropLootFromNormalSlime(enemy) {
        if (enemy.category == 'normal') {
            if (this.droprate < 70)
                this.collectableItems.push(new StatusbarIcon(enemy.x + enemy.offset.left, enemy.y + 30, 'MANA'));
        }
    }


    dropLootFromFlyingSlime(enemy) {
        if (enemy.category == 'fly') {
            if (this.droprate < 40) {
                this.collectableItems.push(new StatusbarIcon(enemy.x + enemy.offset.left, enemy.y + 30, 'STAR'));
            }
        }
    }


    dropLootFromTinySlime(enemy) {
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
    }


    collectLoot() {
        if (this.collectableItems.length > 0) {
            this.collectableItems.forEach((item, i) => {
                // Checks if colliding with any collectables
                if (item.isColliding(this.character)) {
                    this.collectItemsAudio.play();
                    item.lifePoints = 0;
                    this.collectableItems.splice(i, 1);
                    // checks if collected item is mana pot or star and fills the statusbar accordingly
                    this.handleManapot(item);
                    this.handleStar(item);
                }
            })
        }
    }


    handleStar(item) {
        if (item.category == 'STAR') {
            this.statusBar[2].percentage += 20;
            if (this.statusBar[2].percentage > 100) {
                this.statusBar[2].percentage = 100;
            }
        }
    }


    handleManapot(item) {
        if (item.category == 'MANA') {
            this.statusBar[1].percentage += 20;
            if (this.statusBar[1].percentage > 100) {
                this.statusBar[1].percentage = 100;
            }
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