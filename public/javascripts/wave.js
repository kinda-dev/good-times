// const CONSTANTS = {
//     // speed should be 
  
//     BACKGROUND_SPEED: 4,
  
  
//   };
  
  export default class WaveCrest {
      constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = 0,
        this.y = 0,
        this.backgroundHeight = this.dimensions.height,
        this.backgroundWidth = this.dimensions.width
  
      }
    
      background() {
        const background = new Image();
        // background.src = 'https://good-times-surfing-game.s3-us-west-1.amazonaws.com/background.png';
        background.src = './assets/images/wave1.png';
  
        return background;
      }
      drawBackground(ctx) {
  
          ctx.drawImage(this.background(), this.x, this.y, this.backgroundWidth, this.backgroundHeight);
  
  
            
          
          // draws a rectangle
        // ctx.fillStyle = "skyblue";
        // ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
      }
  
      //create animate mthod to be invoked in other classes
      animate(ctx) {
          this.drawBackground(ctx);
      }
    }