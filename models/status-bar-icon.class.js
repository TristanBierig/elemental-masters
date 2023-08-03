class StatusbarIcon extends MovableObject {
    icons;
    category;

    ICONS_LIFE = allImages.ingameUI.icons.healthPot;
    ICONS_MANA = allImages.ingameUI.icons.manaPot;
    ICONS_STAR = allImages.ingameUI.icons.stars;

    constructor(x, y, icons) {
        super().loadImage('img/Enemies/Slime/BlueSlime/death/death_8.png');
        this.loadImages(this.ICONS_LIFE);
        this.loadImages(this.ICONS_MANA);
        this.loadImages(this.ICONS_STAR);
        this.setType(icons);
        this.category = icons;
        this.x = x;
        this.y = y;
        this.height = 32;
        this.width = 32;
        // Defines the Hitbox
        this.offset = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
        this.animate();
    }

    setType(icons) {
        if (icons == 'LIFE') {
            this.icons = this.ICONS_LIFE;
        } else if (icons == 'MANA') {
            this.icons = this.ICONS_MANA;
        } else if (icons == 'STAR') {
            this.icons = this.ICONS_STAR;
        }
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.icons);
        }, 1000 / 8);
    }
}