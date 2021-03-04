import Background from './background';
import Dude from './dude';
import Obstacle from './obstacle';
import WaveCrest from './wave';

const OBSTACLES = [];

export default class GoodTimes {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.dimensions = { width: canvas.width, height: canvas.height};
        this.loc = canvas;
        // triggers restart
        this.restart();

        // this will be use to create periodic events
        this.gameframe = 0;

        this.score = 0;
        this.isPitted = false;

        this.isPlaying = true;

        this.gameOver = false;
    }

    playPause() {
        // if ( this.gameOver ) this.restart();
        if ( this.isPlaying ) {
            this.isPlaying = false;
        } else {
        this.isPlaying = true;
        this.animate();
        }
        console.log(this.isPlaying)
    }



    restart() {
        this.gameOver = false;
        // create instance of background
        this.background = new Background(this.dimensions);
        // create instance of dude after the backround so it doesn't get covered
        this.dude = new Dude(this.dimensions);

        this.obstacles = new Obstacle(this.dimensions);

        this.wave = new WaveCrest(this.dimensions);

        this.registerEvents();
        this.collision();

        // triggers animate condinoals to trigger will go here
        this.animate();
    }

    registerEvents() {
        this.boundKeyDown = this.handlePressedKeys.bind(this);
        this.boundDudeStopHandler = this.stopDudeTrigger.bind(this);
        document.addEventListener("keydown", this.boundKeyDown);
        document.addEventListener("keyup", this.boundDudeStopHandler);
        
    }
    
    handlePressedKeys(e) {
        if ( e.key === "Enter" ) { 
            // this.restart();
            // this.score = 0;
            
            // hella hacky
            location.reload();

        }

        if (( e.key === "p" ) || ( e.key === "P")) { this.playPause() };

        this.dude.moveDude(e);
        console.log(e.key)
    }

    stopDudeTrigger(e) {
        this.dude.moveDude(e);
    }

    collision() {
        // debugger
        if ( this.obstacles.collidesWith(this.dude.bounds()) ) {
            this.gameOver = true;
        }
        // add logic for adding scores if pickup bonuses
    }

    handleScore() {
        if (this.dude.bounds().right < 180) {
            this.score += 0.08;
            this.isPitted = true;
            console.log('pitted')

        } else {
        this.score += 0.04;
        this.isPitted = false;
        }

    }

    // first I am going to crate an animate method
    animate() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)

        if ( this.gameOver ) {
            delete this.id
            // alert('what the hell');
        } else {
        // below line increases the counter that I will use to trigger periodic events
        // this.score += 0.04;
        this.handleScore();

        // draw the background this is to comment in
        this.background.animate(this.ctx);

        // draw the dude after the backround so it doesn't get covered
        this.dude.animate(this.ctx);
        
        this.obstacles.animate(this.ctx);

        // below should be the last to animate
        this.wave.animate(this.ctx);

        if (this.isPitted) {
            this.drawPitted();
        }

        if (this.collision()) {
            // console.log('collision')
        }

        this.drawScore()
        }
            // cancelAnimationFrame(this)
        
        // debugger
            // if (this.isPlaying) {
               this.id = requestAnimationFrame(this.animate.bind(this));
            // } 
        
    }

    drawScore() {
        //loc will be the location 
        const loc = {x: this.dimensions.width / 30, y: this.dimensions.height / 10}
        this.ctx.font = "bold 20pt 'DotGothic16', sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("SCORE " + Math.trunc(this.score), loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("SCORE " + Math.trunc(this.score), loc.x, loc.y);
    }

    drawPitted() {
        const loc = {x: this.dimensions.width / 5, y: this.dimensions.height / 6}
        this.ctx.font = "bold 20pt 'DotGothic16', sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Dude you're so pitted!! Double Points!!", loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("Dude you're so pitted!! Double Points!!", loc.x, loc.y);

    }


    
}