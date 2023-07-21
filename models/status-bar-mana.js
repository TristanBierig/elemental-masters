class StatusBarMana extends DrawableObject {
    percentage = 0;
    IMAGE_FRAME = 'img/UI/ingame_bars/frames/frame_grey.png';
    IMAGES_BAR = [
       'img/UI/ingame_bars/bar_blue/tile048.png',
       'img/UI/ingame_bars/bar_blue/tile047.png',
       'img/UI/ingame_bars/bar_blue/tile046.png',
       'img/UI/ingame_bars/bar_blue/tile045.png',
       'img/UI/ingame_bars/bar_blue/tile044.png',
       'img/UI/ingame_bars/bar_blue/tile043.png'
    ];


    constructor() {
        // debugger
        super();
        this.loadImage(this.IMAGES_BAR[0]);
        this.loadImages(this.IMAGES_BAR);
        this.x = 20;
        this.y = 32;
        this.height = 32;
        this.width = 128;

        // debugger
        // setInterval(() => {
        //     this.loadImage('img/UI/ingame_bars/frames/frame_grey.png');
        //     this.setPercentage();
        // }, 100);
    }


   
}