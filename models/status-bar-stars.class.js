class StatusBarStars extends DrawableObject {
    statusbarFrame;
    statusbarIcon;

    IMAGES_BAR = [
        'img/UI/ingame_bars/bar_yellow/tile041.png',
        'img/UI/ingame_bars/bar_yellow/tile040.png',
        'img/UI/ingame_bars/bar_yellow/tile039.png',
        'img/UI/ingame_bars/bar_yellow/tile038.png',
        'img/UI/ingame_bars/bar_yellow/tile037.png',
        'img/UI/ingame_bars/bar_yellow/tile036.png',
    ];

    ICONS = [
        'img/Collectables/stars/tile000.png',
        'img/Collectables/stars/tile001.png',
        'img/Collectables/stars/tile002.png',
        'img/Collectables/stars/tile003.png',
        'img/Collectables/stars/tile004.png',
        'img/Collectables/stars/tile005.png',
        'img/Collectables/stars/tile006.png',
        'img/Collectables/stars/tile007.png'
    ];


    constructor() {
        // debugger
        super();
        this.loadImage(this.IMAGES_BAR[0]);
        this.loadImages(this.IMAGES_BAR);
        this.x = 20;
        this.y = 64;
        this.height = 32;
        this.width = 200;
        this.statusbarFrame = new StatusbarFrame(this.x, this.y, this.height, this.width, 'img/UI/ingame_bars/frames/frame_grey.png');
        this.statusbarIcon = new StatusbarIcon(0, this.y, 'STAR');
    }
}