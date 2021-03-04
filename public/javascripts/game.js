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
  
        this.registerEvents();


        this.score = 0;
        this.isPitted = false;

        this.isPlaying = false;

        this.gameOver = true;
        this.restart = false;
        this.drawStart();
    }



    startGame() {
        this.gameOver = false;
        // create instance of background
        this.isPlaying = true;
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
        if (( e.key === "s" ) && (!this.isPlaying) && (this.gameOver)){ 
            console.log(this.id)
            this.startGame();
        }

        if (( e.key === "Enter" ) && (!this.isPlaying) && (this.gameOver)){ 
          this.restart = true;
          console.log(this.restart)
        }

        if (( e.key === "p" ) || ( e.key === "P")) { this.playPause() };

        this.dude.moveDude(e);
        // console.log(e.key)
    }

    stopDudeTrigger(e) {
        this.dude.moveDude(e);
    }

    collision() {
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
            
            this.isPlaying = false;
            if ( !this.restart ) {
                this.drawGameOver();
            } else {
            this.drawStart();
            }
            
            // alert('what the hell');
        } else {

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
        this.collision()

        this.drawScore()
        }
            // cancelAnimationFrame(this.id)
        
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
        const loc = {x: this.dimensions.width / 3.5, y: this.dimensions.height / 6}
        this.ctx.font = "bold 20pt 'DotGothic16', sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Gnarly!! Double Points!!", loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("Gnarly!! Double Points!!", loc.x, loc.y);

    }

    drawStart() {
        const loc = {x: this.dimensions.width / 3.5, y: this.dimensions.height / 6}
        this.ctx.font = "bold 20pt 'DotGothic16', sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Press 's' to start a new game", loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("Press 's' to start a new game", loc.x, loc.y);

    }

    drawGameOver() {
        const loc = {x: this.dimensions.width / 3.5, y: this.dimensions.height / 6}
        this.ctx.font = "bold 20pt 'DotGothic16', sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("The Game is Over press Enter to reset the game", loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("The Game is Over press Enter to reset the game", loc.x, loc.y);

    }

    

    
}