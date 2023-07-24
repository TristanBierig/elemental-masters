class StatusBarMana extends DrawableObject {
    percentage = 0;
    statusbarFrame;
    statusbarIcon;

    IMAGES_BAR = [
        'img/UI/ingame_bars/bar_blue/tile048.png',
        'img/UI/ingame_bars/bar_blue/tile047.png',
        'img/UI/ingame_bars/bar_blue/tile046.png',
        'img/UI/ingame_bars/bar_blue/tile045.png',
        'img/UI/ingame_bars/bar_blue/tile044.png',
        'img/UI/ingame_bars/bar_blue/tile043.png'
    ];

    ICONS = [
        'img/Collectables/mana/tile000.png',
        'img/Collectables/mana/tile001.png',
        'img/Collectables/mana/tile002.png',
        'img/Collectables/mana/tile003.png',
        'img/Collectables/mana/tile004.png',
        'img/Collectables/mana/tile005.png',
        'img/Collectables/mana/tile006.png',
        'img/Collectables/mana/tile007.png'
    ];


    constructor() {
        // debugger
        super();
        this.loadImage(this.IMAGES_BAR[0]);
        this.loadImages(this.IMAGES_BAR);
        this.x = 20;
        this.y = 32;
        this.height = 32;
        this.width = 200;
        this.statusbarFrame = new StatusbarFrame(this.x, this.y, this.height, this.width, 'img/UI/ingame_bars/frames/frame_grey.png');
        this.statusbarIcon = new StatusbarIcon(0, this.y, 'MANA');

        setInterval(() => {
            this.setPercentage();
        }, 100);
    }

    setPercentage() {
        let path = this.IMAGES_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.percentage > 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        }
    }

}