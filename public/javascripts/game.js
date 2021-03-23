import Background from './background';
import Dude from './dude';
import Obstacle from './obstacle';
import Reward from './reward';
import WaveCrest from './wave';

export default class GoodTimes {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.dimensions = { width: canvas.width, height: canvas.height};
        this.loc = canvas;
        this.id = '';
        this.score = 0;
        this.isPitted = false;
        this.gameOver = false;

    }

    startGame() {
        this.score = 0;
        this.gameOver = false;
        const element = document.getElementById('play-riff').play();

        this.background = new Background(this.dimensions);
        // create instance of dude after the backround so it doesn't get covered
        this.dude = new Dude(this.dimensions);

        this.obstacles = new Obstacle(this.dimensions);

        this.rewards = new Reward(this.dimensions);


        this.wave = new WaveCrest(this.dimensions);

        this.registerKeyEvents();
        this.collision();

        // triggers animate condinoals to trigger will go here
        this.animate();
    }

    registerKeyEvents() {
        this.boundKeyDown = this.handlePressedKeys.bind(this);
        this.boundDudeStopHandler = this.stopDudeTrigger.bind(this);
        document.addEventListener("keydown", this.boundKeyDown);
        document.addEventListener("keyup", this.boundDudeStopHandler);

    }

    removeRegisterKeyEvents() {
        this.boundKeyDown = this.handlePressedKeys.bind(this);
        this.boundDudeStopHandler = this.stopDudeTrigger.bind(this);
        document.removeEventListener("keydown", this.boundKeyDown);
        document.removeEventListener("keyup", this.boundDudeStopHandler);
    }
    
    handlePressedKeys(e = '') {
        
        this.dude.moveDude(e);
    }

    stopDudeTrigger(e = '') {
        this.dude.moveDude(e);
    }

    collision() {
        if ( this.obstacles.collidesWith(this.dude.bounds()) ) {
            this.gameOver = true;
            this.gameIsOver();
        }
        // add logic for adding scores if pickup bonuses
        if ( this.rewards.collidesWith(this.dude.bounds()) ) {
            this.score += 10;

            // maybe we can draw something
        }
        
    }

    handleScore() {
        if (this.dude.bounds().right < 180) {
            this.score += 0.08;
            this.isPitted = true;

        } else {
        this.score += 0.04;
        this.isPitted = false;
        }

    }
    gameIsOver() {
        document.getElementsByClassName('game-container')[0].classList.add('hidden');
        document.getElementsByClassName('game-over')[0].classList.remove('hidden');
        document.getElementById('your-score').innerHTML=Math.trunc(this.score)
    }

     // first I am going to crate an animate method
    animate() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)
        if ( this.gameOver ) {
            cancelAnimationFrame(this.id);
        } else {
        document.getElementsByClassName('leader-board-container')[0].classList.add('hidden');
        document.getElementsByClassName('game-over')[0].classList.add('hidden');
        document.getElementsByClassName('game-container')[0].classList.remove('hidden');

        this.handleScore();
        this.collision()

        // drasw the background this is to comment in
        this.background.animate(this.ctx);

        // draw the dude after the backround so it doesn't get covered
        this.dude.animate(this.ctx);
        
        this.obstacles.animate(this.ctx);

        this.rewards.animate(this.ctx);
        // below should be the last to animate
        this.wave.animate(this.ctx);

        if (this.isPitted) {
            this.drawPitted();
        }

        this.drawScore()
        // }
            // cancelAnimationFrame(this.id)
        
        // debugger
            // if (this.isPlaying) {
               this.id = requestAnimationFrame(this.animate.bind(this));
            } 
        
    }

    drawScore() {
        //loc will be the location 
        const loc = {x: this.dimensions.width / 30, y: this.dimensions.height / 10}
        this.ctx.font = "bold 15pt 'Press Start 2P', cursive";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("SCORE " + Math.trunc(this.score), loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("SCORE " + Math.trunc(this.score), loc.x, loc.y);
    }

    drawPitted() {
        const loc = {x: this.dimensions.width / 4.5, y: this.dimensions.height / 6}
        this.ctx.font = "bold 15pt 'Press Start 2P', cursive";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText("Gnarly!! Double Points!!", loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("Gnarly!! Double Points!!", loc.x, loc.y);

    }

    

    
}