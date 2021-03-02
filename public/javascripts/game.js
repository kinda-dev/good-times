import Background from './background';
import Dude from './dude';

const KEYS = {
    UP: false,
    DOWN: false,
    RIGHT: false,
    LEFT: false
};

export default class GoodTimes {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.dimensions = { width: canvas.width, height: canvas.height};

        // triggers restart
        this.restart();
    }

    play() {
        this.running = true;
        this.animate();
    }

    restart() {
        this.running = false;
        // create instance of background
        this.background = new Background(this.dimensions);
        // create instance of dude after the backround so it doesn't get covered
        this.dude = new Dude(this.dimensions);

        this.registerEvents();

        // triggers animate
        this.animate();
    }

    registerEvents() {
        this.boundDudeMoveHandler = this.move.bind(this);
        this.boundDudeStopHandler = this.stop.bind(this);
        window.addEventListener("keydown", this.boundDudeMoveHandler);
        window.addEventListener("keyup", this.boundDudeStopHandler);
        
    }
    
    move(e) {
        // debugger
        if (e.key === 'ArrowUp') KEYS.UP = true;
        if (e.key === 'ArrowDown') KEYS.DOWN = true;
        if (e.key === 'ArrowLeft') KEYS.LEFT = true;
        if (e.key === 'ArrowRight') KEYS.RIGHT = true;

        this.dude.moveDude(KEYS);
        console.log(e.key);
    }

    stop(e) {
        if (e.key === 'ArrowUp') KEYS.UP = false;
        if (e.key === 'ArrowDown') KEYS.DOWN = false;
        if (e.key === 'ArrowLeft') KEYS.LEFT = false;
        if (e.key === 'ArrowRight') KEYS.RIGHT = false; 

        this.dude.moveDude(KEYS);
    }

    // first I am going to crate an animate method
    animate() {
        // draw the background
        this.background.animate(this.ctx);
        // draw the dude after the backround so it doesn't get covered
        this.dude.animate(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }


    
}