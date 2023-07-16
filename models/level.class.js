class Level {
    enemies;
    clouds;
    backgroundObjects;
    foregroundObjects;
    level_end_x = 1200;


    constructor(enemies, clouds, backgroundObjects, foregroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.foregroundObjects = foregroundObjects;
    }
}