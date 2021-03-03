import Background from './background';
import Dude from './dude';

const KEYS = [
    // UP: false,
    // DOWN: false,
    // RIGHT: false,
    // LEFT: false
];

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
        document.addEventListener("keydown", this.boundDudeMoveHandler);
        document.addEventListener("keyup", this.boundDudeStopHandler);
        
    }
    
    move(e) {
        // debugger
        // KEYS[e.key] = true;

        this.dude.moveDude(e);
        console.log(e.type, e.keyCode);
    }

    stop(e) {

        // delete KEYS[e.key]
        this.dude.moveDude(e);
    }

    // first I am going to crate an animate method
    animate() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)

        // draw the background
        // this.background.animate(this.ctx);

        // draw the dude after the backround so it doesn't get covered
        this.dude.animate(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }


    
}