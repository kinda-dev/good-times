const CONSTANTS = {
    OBSTACLE_WIDTH: 90,
    OBSTACLE_HEIGHT: 45,
    // how many frames I move per animation
    // variable speed assigned randomly
    // SPEED: Math.random() * 5 + 1,
    // pullback value to test
    // WAVE_PULLBACK: 1

};

export default class Obstacle {
    constructor(dimensions) {
      this.dimensions = dimensions;
      // obstacle position on x axis
      this.x = 900,

      // I will put like 3 obstacles in an array to cycle them on the screen
      this.obstacles = [
          this.obstacle(this.x),
          this.obstacle(this.x + 100),
          this.obstacle(this.x + 200),
      ]

    }

    obstacle(obstacleStartPoint) {

        const obstacleSpecs = {
            // how many frames I move per animation
            // variable speed assigned randomly
            obstacleSpeed: Math.random() * 5 + 1,
            // obstacle position on y axis
            // randomly calculated as follows Math.random() * (max - min) + min

            // aka top
            obstacleYposition: Math.random() * (450 - 150) + 150,
            // aka left
            obstacleStartPoint: obstacleStartPoint,
            // aka right
            // obstacleRight: obstacleStartPoint + CONSTANTS.OBSTACLE_WIDTH,
            // aka bottom
            // obstacleBottom: obstacleYposition + CONSTANTS.OBSTACLE_HEIGHT
        }

        return obstacleSpecs;

    }
    
    drawObstacle(ctx) {
        // ctx.clearRect(this.x - CONSTANTS.OBSTACLE_WIDTH, this.y - CONSTANTS.OBSTACLE_HEIGHT, CONSTANTS.OBSTACLE_WIDTH, CONSTANTS.OBSTACLE_HEIGHT);
        // while (true) {
        this.obstacles.forEach(obst => {
            ctx.fillStyle = "orange";


            ctx.fillRect(
                obst.obstacleStartPoint, obst.obstacleYposition, CONSTANTS.OBSTACLE_WIDTH, CONSTANTS.OBSTACLE_HEIGHT);
        });
    }

    // }

    animate(ctx) {

        this.drawObstacle(ctx);
        this.moveObstacle();

    }

    moveObstacle() {

    // // // move obstacles to the left on the orizontal axis
        this.obstacles.forEach(obst => {
            if ( obst.obstacleStartPoint + CONSTANTS.OBSTACLE_WIDTH  < 0) {
                obst.obstacleStartPoint = this.x + (Math.random() * (200 - 1) + 1);
                obst.obstacleSpeed = Math.random() * 5 + 1;
                obst.obstacleYposition = Math.random() * (450 - 150) + 150;

            }
            obst.obstacleStartPoint -= obst.obstacleSpeed;

    });
    }

    collidesWith(dude) {
        const _overlap = (obj1, obj2) => {
            if ((obj1.obstacleStartPoint > obj2.right || 
                obj1.obstacleStartPoint + CONSTANTS.OBSTACLE_WIDTH < obj2.left)) {
                    return false;
                }
            if ((obj1.obstacleYposition > obj2.bottom || 
                obj1.obstacleYposition + CONSTANTS.OBSTACLE_HEIGHT < obj2.top)) {
                    return false;
                }
            return true
        }







        let collision = false;
        this.obstacles.forEach(obst => {
            //check that they don't overlap in the x axis or the y axis
            if ( _overlap(obst, dude) ) { collision = true; } 
            
            // collision = true;
        });
        return collision;

        
    }

  }