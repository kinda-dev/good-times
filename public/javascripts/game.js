import Background from './background';

export default class GoodTimes {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.dimensions = { width: canvas.width, height: canvas.height};

        // triggers restart
        this.restart();
    }

    // first I am going to crate an animate method
    animate() {
        // draw the background
        this.background.animate(this.ctx)
    }

    restart() {
        // create instance of background
        this.background = new Background(this.dimensions);

        // triggers animate
        this.animate();
    }

    
}