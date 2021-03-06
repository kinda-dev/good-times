// const CONSTANTS = {
//     // speed should be 
  
//     WAVE_SPEED: 4,
  
  
//   };

const SPRITES = {
  1: {
      SPRITE_X: 0,
      SPRITE_Y: 0, 
      SPRITE_WIDTH: 348, 
      SPRITE_HEIGHT: 489
  },
  2: {
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
          this.wave(this.x -16),
          this.wave(this.x),
          this.wave(this.x + 32)
          
        ]
  
      }

      wave(waveStartPoint) {

        const waveSpecs = {
            waveStartPoint: waveStartPoint,
            waveSpeed: Math.random() * (8 - 12) + 5,
        }

        return waveSpecs;

    }
    
      // background() {
      //   const background = new Image();
      //   // background.src = 'https://good-times-surfing-game.s3-us-west-1.amazonaws.com/background.png';
      //   background.src = './assets/images/wave1.png';
  
      //   return background;
      // }

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
          this.drawWave(ctx);
          this.moveWave();
      }
    }