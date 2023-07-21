class StatusBar extends DrawableObject {
    percentage = 100;
    IMAGE_FRAME = 'img/UI/ingame_bars/frames/frame_grey.png';
    IMAGES_GREEN_BAR = [
        'img/UI/ingame_bars/bar_green/tile055.png',
        'img/UI/ingame_bars/bar_green/tile054.png',
        'img/UI/ingame_bars/bar_green/tile053.png',
        'img/UI/ingame_bars/bar_green/tile052.png',
        'img/UI/ingame_bars/bar_green/tile051.png',
        'img/UI/ingame_bars/bar_green/tile050.png'
    ];


    constructor() {
        // debugger
        super();
        this.loadImage(this.IMAGES_GREEN_BAR[0]);
        this.loadImages(this.IMAGES_GREEN_BAR);
        this.x = 20;
        this.y = 0;
        this.height = 32;
        this.width = 128;

        // debugger
        setInterval(() => {
            this.loadImage('img/UI/ingame_bars/frames/frame_grey.png');
            this.setPercentage();
        }, 100);
    }


    setPercentage() {
        let path = this.IMAGES_GREEN_BAR[this.resolveImageIndex()];
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