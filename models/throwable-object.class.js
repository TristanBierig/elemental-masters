class ThrowableObject extends MovableObject {
    hit = false;
    category;
    index;
    choosenChar = world.character.choosenChar;

    IMAGES_W;
    IMAGES_E_FLY;
    IMAGES_E_HIT;

    finishCounterW;
    finishCounterE;


    constructor(x, y, status, category, index, element) {
        // Empty png on first load
        super().loadImage('img/Enemies/Slime/BlueSlime/death/death_8.png');
        this.handleTypeImages(element);
        this.index = index;
        this.category = category;
        this.animationStatus = 'FLY';
        this.movementStatus = status;
        this.processWSpell(x, y, category, element);
        this.processESpell(x, y, category, element);
    }


    /**
     * This function loads only the images of the choosen character elements spells
     * 
     * @param {string} element - element of choosen character
     */
    handleTypeImages(element) {
        switch (element) {
            case 'Earth':
                this.loadEarthImages();
                break;
            case 'Fire':
                this.loadFireImages();
                break;
            case 'Water':
                this.loadWaterImages();
                break;
            case 'Wind':
                this.loadWindImages();
                break;
        }
    }


    loadWindImages() {
        this.IMAGES_W = allImages.characters.Wind.normalForm.abilities.wAttack;
        this.IMAGES_E_FLY = allImages.characters.Wind.normalForm.abilities.eAttackFlying;
        this.IMAGES_E_HIT = allImages.characters.Wind.normalForm.abilities.eAttackHit;
        this.loadImages(this.IMAGES_W);
        this.loadImages(this.IMAGES_E_FLY);
        this.loadImages(this.IMAGES_E_HIT);
    }


    loadWaterImages() {
        this.IMAGES_W = allImages.characters.Water.normalForm.abilities.wAttack;
        this.IMAGES_E_FLY = allImages.characters.Water.normalForm.abilities.eAttackFlying;
        this.IMAGES_E_HIT = allImages.characters.Water.normalForm.abilities.eAttackHit;
        this.loadImages(this.IMAGES_W);
        this.loadImages(this.IMAGES_E_FLY);
        this.loadImages(this.IMAGES_E_HIT);
    }


    loadFireImages() {
        this.IMAGES_W = allImages.characters.Fire.normalForm.abilities.wAttack;
        this.IMAGES_E_FLY = allImages.characters.Fire.normalForm.abilities.eAttackFlying;
        this.IMAGES_E_HIT = allImages.characters.Fire.normalForm.abilities.eAttackHit;
        this.loadImages(this.IMAGES_W);
        this.loadImages(this.IMAGES_E_FLY);
        this.loadImages(this.IMAGES_E_HIT);
    }


    loadEarthImages() {
        this.IMAGES_W = allImages.characters.Earth.normalForm.abilities.wAttack;
        this.IMAGES_E_FLY = allImages.characters.Earth.normalForm.abilities.eAttackFlying;
        this.IMAGES_E_HIT = allImages.characters.Earth.normalForm.abilities.eAttackHit;
        this.loadImages(this.IMAGES_W);
        this.loadImages(this.IMAGES_E_FLY);
        this.loadImages(this.IMAGES_E_HIT);
    }


    /**
     * This function processes all relevant data and functionality regarding the W-Spell
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     * @param {string} category - category of the pressed spellkey
     * @param {string} element - element of the choosen character
     */
    processWSpell(x, y, category, element) {
        if (category == 'W') {
            this.y += 2;
            this.setWSpellData(x, y, element);
            this.handleW();
            if (this.movementStatus == 'LEFT') {
                this.x -= 120;
            }
        }
    }


    /**
     * This function sets the data depending on the given element
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     * @param {string} element - element of the choosen character
     */
    setWSpellData(x, y, element) {
        switch (element) {
            case 'Earth':
                this.setEarthW(x, y);
                break;
            case 'Fire':
                this.setFireW(x, y);
                break;
            case 'Water':
                this.setWaterW(x, y);
                break;
            case 'Wind':
                this.setWindW(x, y);
                break;
        }
    }


    /**
     * This function sets all the base data depending on the element and character orientation
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     */
    setWindW(x, y) {
        this.width = 200;
        this.height = 100;
        if (this.movementStatus == 'RIGHT' || undefined) {
            this.x = x;
        } else {
            this.x = x - 100;
        }
        this.y = y - 20;
        this.offset = {
            top: 30,
            bottom: 30,
            left: 12,
            right: 40
        };
    }


    /**
     * This function sets all the base data depending on the element and character orientation
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     */
    setWaterW(x, y) {
        this.width = 96;
        this.height = 240;
        this.x = x;
        this.y = y - 135;
        this.offset = {
            top: 30,
            bottom: 30,
            left: 12,
            right: 40
        };
    }


    /**
     * This function sets all the base data depending on the element and character orientation
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     */
    setFireW(x, y) {
        this.width = 160;
        this.height = 160;
        if (this.movementStatus == 'RIGHT' || undefined) {
            this.x = x;
        } else {
            this.x = x - 100;
        }
        this.y = y - 30;
        this.offset = {
            top: 30,
            bottom: 30,
            left: 12,
            right: 40
        };
    }


    /**
     * This function sets all the base data depending on the element and character orientation
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     */
    setEarthW(x, y) {
        this.width = 96;
        this.height = 96;
        this.x = x;
        this.y = y - 15;
        this.offset = {
            top: 30,
            bottom: 30,
            left: 12,
            right: 40
        };
    }


    /**
     * This function processes all relevant data and functionality regarding the W-Spell
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     * @param {string} category - category of the pressed spellkey
     * @param {string} element - element of the choosen character
     */
    processESpell(x, y, category, element) {
        if (category == 'E') {
            this.x -= 56;
            this.speed = 8; // 8 default
            this.speedY = 15; // 15 default
            this.accelertion = 1; // 1 default
            this.applyGravitiy(true);
            this.handleE();
            this.setESpellData(x, y, element);
        }
    }


    /**
     * This function sets the data depending on the given element
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     * @param {string} element - element of the choosen character
     */
    setESpellData(x, y, element) {
        switch (element) {
            case 'Earth':
                this.setEarthE(x, y);
                break;
            case 'Fire':
                this.setFireE(x, y);
                break;
            case 'Water':
                this.setWaterE(x, y);
                break;
            case 'Wind':
                this.setWindE(x, y);
                break;
        }
    }


    /**
     * This function sets all the base data depending on the element and character orientation
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     */
    setEarthE(x, y) {
        this.width = 96;
        this.height = 96;
        this.x = x;
        this.y = y - 20;
        if (this.movementStatus == 'RIGHT' || undefined) {
            this.offset = {
                top: 30,
                bottom: 62,
                left: 12,
                right: 68
            };
        } else {
            this.offset = {
                top: 30,
                bottom: 62,
                left: 55,
                right: 68
            };
        }
    }


    /**
     * This function sets all the base data depending on the element and character orientation
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     */
    setFireE(x, y) {
        this.width = 96;
        this.height = 96;
        this.x = x - 50;
        this.y = y - 20;
        this.offset = {
            top: 38,
            bottom: 78,
            left: 40,
            right: 70
        };
    }


    /**
     * This function sets all the base data depending on the element and character orientation
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     */
    setWaterE(x, y) {
        this.width = 96;
        this.height = 96;
        this.x = x;
        this.y = y - 20;
        this.offset = {
            top: 30,
            bottom: 62,
            left: 12,
            right: 24
        };
    }


    /**
     * This function sets all the base data depending on the element and character orientation
     * 
     * @param {integer} x - X-coordinates of the character
     * @param {integer} y - Y-coordinates of the character
     */
    setWindE(x, y) {
        this.width = 96;
        this.height = 96;
        this.x = x;
        this.y = y - 20;
        this.offset = {
            top: 12,
            bottom: 28,
            left: 24,
            right: 48
        };
    }


    handleE() {
        this.moveEAttack();
        this.animateEAttack();

    }


    handleW() {
        this.moveWAttack();
        this.animateWAttack();

    }


    moveWAttack() {
        this.movementInterval = setInterval(() => {
            if (this.movementStatus == 'LEFT') {
                this.otherDirection = true;
            }
        }, 1000 / 25);
    }

    /**
     * This function plays the W-Spell animation once and deletes the object from the activeSpells array afterwards whether it hit something or not
     * 
     */
    animateWAttack() {
        this.animationInterval = setInterval(() => {
            if (this.animationStatus != 'ONCE') {
                this.currentImage = 0;
                this.animationStatus = 'ONCE';
            }
            this.playAnimation(this.IMAGES_W);
            if (this.currentImage >= this.IMAGES_W.length) {
                this.stopInterval(this.animationInterval);
                world.character.activeSpells.splice(this.index, 1);
            }
        }, 1000 / 25);
    }


    moveEAttack() {
        this.movementInterval = setInterval(() => {
            if (this.movementStatus == 'RIGHT' || this.movementStatus == undefined) {
                this.moveRight();
            }
            if (this.movementStatus == 'LEFT') {
                this.moveLeft();
            }
        }, 1000 / 25);
    }


    animateEAttack() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.animateEAttackHit();
            } else {
                this.playAnimation(this.IMAGES_E_FLY);
            }
        }, 1000 / 10);
    }


    /**
     * This function plays the death animation and stops the movementInterval after hitting an enemy and 
     * the animation Intervall after the whole animation played
     * 
     */
    animateEAttackHit() {
        if (this.animationStatus != 'DEAD') {
            this.currentImage = 0;
            this.animationStatus = 'DEAD';
            setTimeout(() => {
                this.stopInterval(this.movementInterval);
            }, 1200);
        }
        this.playAnimation(this.IMAGES_E_HIT);
        if (this.currentImage >= this.IMAGES_E_HIT.length) {
            this.stopInterval(this.animationInterval);
        }
    }
}