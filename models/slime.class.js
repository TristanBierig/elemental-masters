class Slime extends MovableObject {

    constructor() {
        super().loadImage('../img/Enemies/Slime/BlueSlime/walk_1.png');
        this.x = 200 + Math.random() * 500;
        this.y = 400;
        this.height = 64;
        this.width = 64;
    }
}