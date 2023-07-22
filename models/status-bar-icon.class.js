class StatusbarIcon extends MovableObject {
    x = 0;
    y;
    icons;

    constructor(y, icons) {
        super().loadImage(icons[0]);
        this.loadImages(icons);
        this.icons = icons;
        this.y = y;
        this.height = 32;
        this.width = 32;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.icons);
         }, 1000 / 8);
    }
}