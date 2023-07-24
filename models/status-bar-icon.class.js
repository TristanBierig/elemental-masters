class StatusbarIcon extends MovableObject {
    icons;
    category;

    ICONS_LIFE = [
        'img/Collectables/health/tile000.png',
        'img/Collectables/health/tile001.png',
        'img/Collectables/health/tile002.png',
        'img/Collectables/health/tile003.png',
        'img/Collectables/health/tile004.png',
        'img/Collectables/health/tile005.png',
        'img/Collectables/health/tile006.png',
        'img/Collectables/health/tile007.png'
    ];

    ICONS_MANA = [
        'img/Collectables/mana/tile000.png',
        'img/Collectables/mana/tile001.png',
        'img/Collectables/mana/tile002.png',
        'img/Collectables/mana/tile003.png',
        'img/Collectables/mana/tile004.png',
        'img/Collectables/mana/tile005.png',
        'img/Collectables/mana/tile006.png',
        'img/Collectables/mana/tile007.png'
    ];

    ICONS_STAR = [
        'img/Collectables/stars/tile000.png',
        'img/Collectables/stars/tile001.png',
        'img/Collectables/stars/tile002.png',
        'img/Collectables/stars/tile003.png',
        'img/Collectables/stars/tile004.png',
        'img/Collectables/stars/tile005.png',
        'img/Collectables/stars/tile006.png',
        'img/Collectables/stars/tile007.png'
    ];

    constructor(x, y, icons) {
        super().loadImage('img/Enemies/Slime/BlueSlime/death/death_8.png');
        this.loadImages(this.ICONS_LIFE);
        this.loadImages(this.ICONS_MANA);
        this.loadImages(this.ICONS_STAR);
        if (icons == 'LIFE') {
            this.icons = this.ICONS_LIFE;
        } else if (icons == 'MANA') {
            this.icons = this.ICONS_MANA;
        } else if (icons == 'STAR') {
            this.icons = this.ICONS_STAR;
        }
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

    animate() {
        setInterval(() => {
            this.playAnimation(this.icons);
        }, 1000 / 8);
    }
}