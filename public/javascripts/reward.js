const CONSTANTS = {
    REWARD_WIDTH: 40,
    REWARD_HEIGHT: 40,
    // how many frames I move per animation
    // variable speed assigned randomly
    // SPEED: Math.random() * 5 + 1,
    // pullback value to test
    // WAVE_PULLBACK: 1

};

export default class Reward {
    constructor(dimensions) {
      this.dimensions = dimensions;
      // obstacle position on x axis
      this.x = 900,

      // I will put like 3 obstacles in an array to cycle them on the screen
      this.rewards = [
          this.reward(this.x),
          this.reward(this.x + 100),
        //   this.reward(this.x + 200),
      ]

    }

    reward(rewardStartPoint) {

        const rewardSpecs = {
            // how many frames I move per animation
            // variable speed assigned randomly
            rewardSpeed: Math.random() * 5 + 1,
            // obstacle position on y axis
            // randomly calculated as follows Math.random() * (max - min) + min

            // aka top
            rewardYposition: Math.random() * (450 - 150) + 150,
            // aka left
            rewardStartPoint: rewardStartPoint,
            // aka right
            // obstacleRight: obstacleStartPoint + CONSTANTS.REWARD_WIDTH,
            // aka bottom
            // obstacleBottom: rewardYposition + CONSTANTS.REWARD_HEIGHT
        }

        return rewardSpecs;

    }
    
    drawreward(ctx) {
        // ctx.clearRect(this.x - CONSTANTS.REWARD_WIDTH, this.y - CONSTANTS.REWARD_HEIGHT, CONSTANTS.REWARD_WIDTH, CONSTANTS.REWARD_HEIGHT);
        // while (true) {
        this.rewards.forEach(rew => {
            ctx.fillStyle = "red";


            ctx.fillRect(
                rew.rewardStartPoint, rew.rewardYposition, CONSTANTS.REWARD_WIDTH, CONSTANTS.REWARD_HEIGHT);
        });
    }

    // }

    animate(ctx) {

        this.drawreward(ctx);
        this.moveReward();

    }

    moveReward() {

    // // // move rewacles to the left on the orizontal axis
        this.rewards.forEach(rew => {
            if ( rew.rewardStartPoint + CONSTANTS.REWARD_WIDTH  < 0) {
                rew.rewardStartPoint = this.x + (Math.random() * (200 - 1) + 1);
                rew.rewardSpeed = Math.random() * 5 + 1;
                rew.rewardYposition = Math.random() * (450 - 150) + 150;

            }
            rew.rewardStartPoint -= rew.rewardSpeed;

    });
    }

    collidesWith(dude) {
        const _overlap = (obj1, obj2) => {
            if ((obj1.rewardStartPoint > obj2.right || 
                obj1.rewardStartPoint + CONSTANTS.REWARD_WIDTH < obj2.left)) {
                    return false;
                }
            if ((obj1.rewardYposition > obj2.bottom || 
                obj1.rewardYposition + CONSTANTS.REWARD_HEIGHT < obj2.top)) {
                    return false;
                }
            return true
        }







        let collision = false;
        this.rewards.forEach(rew => {
            //check that they don't overlap in the x axis or the y axis
            if ( _overlap(rew, dude) ) { 
                rew.rewardStartPoint = this.x + (Math.random() * (200 - 1) + 1);
                rew.rewardSpeed = Math.random() * 5 + 1;
                rew.rewardYposition = Math.random() * (450 - 150) + 150;
                collision = true; 
            } 
            
            // collision = true;
        });
        return collision;

        
    }

  }