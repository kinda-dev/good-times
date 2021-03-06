// const CONSTANTS = {
//     // speed should be 
  
//     WAVE_SPEED: 4,
  
  
//   };

const SPRITES = {
  2: {
      SPRITE_X: 0,
      SPRITE_Y: 0, 
      SPRITE_WIDTH: 348, 
      SPRITE_HEIGHT: 489
  },
  1: {
      SPRITE_X: 351,
      SPRITE_Y: 0, 
      SPRITE_WIDTH: 346, 
      SPRITE_HEIGHT: 489
  },
  0: {
      SPRITE_X: 699,
      SPRITE_Y: 0, 
      SPRITE_WIDTH: 352, 
      SPRITE_HEIGHT: 489
  },
}
  
  export default class WaveCrest {
      constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = 0,
        this.y = 0,
        // this.backgroundHeight = this.dimensions.height,
        // this.backgroundWidth = this.dimensions.width

        this.waves = [
          this.wave(this.x),
          this.wave(this.x),
          this.wave(this.x)
          
        ],

        this.idx = 0
  
      }

      wave(waveStartPoint) {

        const waveSpecs = {
            waveStartPoint: waveStartPoint,
            waveSpeed: Math.random() * (8 - 12) + 5,
        }

        return waveSpecs;

    }
    


      drawWave(ctx) {
        const waveCrest = new Image();
        waveCrest.src = './assets/images/wave.png';
          
          this.waves.forEach((wave, idx)=> {
            ctx.drawImage(waveCrest, SPRITES[idx].SPRITE_X, SPRITES[idx].SPRITE_Y, 
                SPRITES[idx].SPRITE_WIDTH, SPRITES[idx].SPRITE_HEIGHT, 
                wave.waveStartPoint, 95, 
                SPRITES[idx].SPRITE_WIDTH, SPRITES[idx].SPRITE_HEIGHT);
          // ctx.fillStyle = "orange";
          // ctx.fillRect(
          //     obst.obstacleStartPoint, obst.obstacleYposition, CONSTANTS.OBSTACLE_WIDTH, CONSTANTS.OBSTACLE_HEIGHT);
          });
          // if (this.idx === 2) {this.idx = 0};
          // const length = this.waves.length;
          // ctx.drawImage(waveCrest, SPRITES[this.idx].SPRITE_X, SPRITES[this.idx].SPRITE_Y, 
          //   SPRITES[this.idx].SPRITE_WIDTH, SPRITES[this.idx].SPRITE_HEIGHT, 
          //   this.waves[this.idx].waveStartPoint, 95, 
          //   SPRITES[this.idx].SPRITE_WIDTH, SPRITES[this.idx].SPRITE_HEIGHT);
          // this.idx ++

      }

      moveWave() {

        // // // move obstacles to the left on the orizontal axis
            this.waves.forEach(wave => {
                if ( wave.waveStartPoint < -40) {
                    wave.waveStartPoint = this.x + (Math.random() * (0 - 4) - 12);
                    wave.waveSpeed = 0.1;
    
                }
                wave.waveStartPoint -= wave.waveSpeed;
    
        });
        }
  
      //create animate mthod to be invoked in other classes
      animate(ctx) {
        // setInterval(this.drawWave(ctx), 2000);
          this.drawWave(ctx);
          this.moveWave();
      }
    }