import Background from './background';
import Dude from './dude';
import Obstacle from './obstacle';

const OBSTACLES = [];

export default class GoodTimes {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.dimensions = { width: canvas.width, height: canvas.height};

        // triggers restart
        this.restart();

        // this will be use to create periodic events
        this.gameframe = 0;

        this.score = 0;
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
        
        // triggering Obstacles creation
        // this.spawnObstacles()

        this.obstacles = new Obstacle(this.dimensions);

        this.registerEvents();

        // triggers animate condinoals to trigger will go here
        this.animate();
    }

    registerEvents() {
        this.boundDudeMoveHandler = this.moveDudeTrigger.bind(this);
        this.boundDudeStopHandler = this.stopDudeTrigger.bind(this);
        document.addEventListener("keydown", this.boundDudeMoveHandler);
        document.addEventListener("keyup", this.boundDudeStopHandler);
        
    }
    
    moveDudeTrigger(e) {
        this.dude.moveDude(e);
    }

    stopDudeTrigger(e) {
        this.dude.moveDude(e);
    }

    collision() {
        // debugger
        return (
            this.obstacles.collidesWith(this.dude.bounds())
        );
    }

    // first I am going to crate an animate method
    animate() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)

        // below line increases the counter that I will use to trigger periodic events
        this.gameframe ++;

        // draw the background this is to comment in
        // this.background.animate(this.ctx);

        // draw the dude after the backround so it doesn't get covered
        this.dude.animate(this.ctx);
        
        this.obstacles.animate(this.ctx);

        if (this.collision()) {
            console.log('collision')
        }
   
        // debugger

        requestAnimationFrame(this.animate.bind(this));
    }


    
}