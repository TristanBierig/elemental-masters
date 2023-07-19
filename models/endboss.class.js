class Endboss extends MovableObject {
    height = 160;
    width = 288;
    isHitting = false;
    hitbox_x_start;
    hitbox_y_start;
    hitbox_x_end;
    hitbox_y_end;

    IMAGES_WALKING = [
        'img/Endboss/individual sprites/02_move/move_1.png',
        'img/Endboss/individual sprites/02_move/move_2.png',
        'img/Endboss/individual sprites/02_move/move_3.png',
        'img/Endboss/individual sprites/02_move/move_4.png',
        'img/Endboss/individual sprites/02_move/move_5.png',
        'img/Endboss/individual sprites/02_move/move_6.png',
        'img/Endboss/individual sprites/02_move/move_7.png',
        'img/Endboss/individual sprites/02_move/move_8.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = 1500;
        this.y = 288;

        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.2;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 250);
    }

    updateHitbox() {
        this.hitbox_x_start = this.x + 260;
        this.hitbox_y_start = this.y + 70;
        this.hitbox_x_end = this.hitbox_x_start + (this.width - 520);
        this.hitbox_y_end = this.hitbox_y_start + (this.height + 110);
    }
}