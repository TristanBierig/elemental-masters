class Cloud extends MovableObject {
    shape = Math.floor(Math.random() * 19) + 1;
    height = 50;
    width = 150;


    constructor(start) {
        super().loadImage(`img/Background/Cloud Pack/Cloud_${this.shape}.png`);
        this.x = Math.random() * 500;
        if (start) {
            this.x = start + 720 + Math.random() * 100;
        }
        this.y = Math.random() * 80;
        this.speed = 0.5;
        this.animate();
    }


    /**
     * This function moves the clouds to the left
     * 
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}