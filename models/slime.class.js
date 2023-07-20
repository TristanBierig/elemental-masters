class Slime extends MovableObject {
    height = 96;
    width = 96;
    isHitting = false;
    x;
    y;
    hitbox_x_start;
    hitbox_y_start;
    hitbox_x_end;
    hitbox_y_end;
    IMAGES_WALKING = [
        'img/Enemies/Slime/BlueSlime/move/move_1.png',
        'img/Enemies/Slime/BlueSlime/move/move_2.png',
        'img/Enemies/Slime/BlueSlime/move/move_3.png',
        'img/Enemies/Slime/BlueSlime/move/move_4.png',
        'img/Enemies/Slime/BlueSlime/move/move_5.png',
        'img/Enemies/Slime/BlueSlime/move/move_6.png',
        'img/Enemies/Slime/BlueSlime/move/move_7.png',
        'img/Enemies/Slime/BlueSlime/move/move_8.png'        
    ];


    constructor() {
        super().loadImage('img/Enemies/Slime/BlueSlime/move/move_1.png');
        this.x = 200 + Math.random() * 500;
        this.y = 383; // 383 Ground level
      
        this.loadImages(this.IMAGES_WALKING);
        this.speed = this.speed + Math.random() * 0.35; // 0.35
        this.animate();
    }


    animate() {
        setInterval(() => {
            // if (this.y < 383) {
                this.moveLeft();
            // }
            this.updateHitbox();
        }, 1000 / 60);

        setInterval(() => {
           this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 4);

    }


    updateHitbox() {
        this.hitbox_x_start = this.x + 24;
        this.hitbox_y_start = this.y + 16;
        this.hitbox_x_end = this.hitbox_x_start + (this.width - 56);
        this.hitbox_y_end = this.hitbox_y_start + (this.height - 48);
    }
}