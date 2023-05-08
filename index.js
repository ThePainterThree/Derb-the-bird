// Average browser window size = 1366 x 784
// General guideline: canvas size of 800x600 pixels for simple browser games

/* STEPS:

  1.Create the Canvas and draw on it (background, derb, obstacles)
  2.Move the player
  3.Define the player to the limits of the canvas
  4.Keyboard controls
  5.Game over
  6.Collision detection
  7.Track the score and win
  8.Restart
  9.Finishing up

 */

  //const canvas = document.getElementById('canvas');
  //const ctx = canvas.getContext('2d');
  // window.onload: add the first screen with the start game button and instructions, after the window loads totally
  

/* STEPS:

  1. startGame function
    1.1 Load game screen and player function (not nested)

  2.Move the playergit pull
   2.1 Define the player to the limits of the canvas
   2.2 Keyboard controls

  3. Define obstacles and from where they appear
    3.1 Collision detection
    
  4. Function updateGame
    4.1 Player position
    4.2 Obstacles position
    4.3 Track the score (and win ?)

  5. Function gameOver or gameWon
  
  6.Function reStart
    6.1 Button Restart - eventListener
    6.2 Start new game 

  7.Finishing up (sounds? original drawings?)

 */
  const canvas = document.getElementById("game-area");
  const ctx = canvas.getContext("2d");
  const backgroundImg = new Image;
  backgroundImg.src = "./images/background.png";
  const derbImg = new Image();
  derbImg.src = "./images/Derb-bird.png";
  let obstaclesImage = new Image();
  obstaclesImage.src = "./images/bird-blackandwhite.jpg"
  let obstacles = [];
  let frames = 0;
  //let currentGame;
  
 

   
  const backgroundImage = {

    img: backgroundImg,
    x: 0,
    speed: -3,

    move: function() {
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function() {
      ctx.drawImage(this.img, this.x, 0, 3000, 784);    
      ctx.drawImage(this.img, this.x - this.img.width, 0, 3000, 784);                    
      ctx.drawImage(this.img, this.x - this.img.width*2, 0, 3000, 784);
    },

    update(){
      this.move();
      this.draw();
    }
  };


  window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };

    function startGame() {
      // Set the canvas dimensions to match the viewport or is not necessary?
      document.getElementById("game-instructions").style.display = "none";
      document.getElementsByClassName("game-intro")[0].style.display = "none";
      document.getElementById("game-area").style.display="block";
      updateGame();
      
    }
  };

  



      class Player {
      constructor() {
        this.x = 50;   // define initial position for Derb x
        this.y = 50;   // define initial position for Derb y
        this.img = derbImg;  
      }
  
          draw() {
            ctx.drawImage(this.img, this.x, this.y, 150, 150); //Define the size of derb
          }

          move(){
            document.onkeydown = event => {
              const key = event.keyCode;
              switch (key) {
                case 38: // up
                  if(this.y >=0) this.y -=30;
                  break;
                case 40: // down
                  this.y +=30;
                  if (this.y >= canvas.height) {this.y = canvas.height}; 
                  //canvas.height/width doesn't work here. Has to be the px limit of the canvas (to be defined on html)
                  break;
                case 37: // left
                  if (this.x >=0) this.x -=30;
                  break;
                case 39: // right
                  if (this.x < canvas.width) this.x +=30;
                  //canvas.height/width doesn't work here. Has to be the px limit of the canvas (to be defined on html)
                  else this.x=0;
                  break;
              }
            }
          }

          update(){
            this.draw();
            this.move();
          }
      }

    let derb = new Player();




    class Obstacles {

        constructor(){
          this.img = obstaclesImage;
          this.x = canvas.width - 100;  // objects always come from the right
          this.y = Math.random() * (canvas.height - 200) + 100; // objects can come from any height
          this.speed = 1;
  
        }

        draw(){
          ctx.drawImage(this.img, this.x, this.y, 150, 150);
        }

        move(){
          this.x -=this.speed;
        }

        update() {
          this.draw();
          this.move();

          if (this.x < -150) { // check if obstacle is off screen
            this.x = canvas.width + 150; // reset obstacle
            this.y = Math.random() * (canvas.height - 200) + 100; // set new y position
          }
        }
    }

    let obstacleInterval = setInterval(() => {
      obstacles2.push(new Obstacles());
    }, 3000);
    clearInterval(obstacleInterval);

      
      function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        backgroundImage.update(); //includes move and draw method for the background
        derb.update(); // includes move and draw method for Derb
        obstacles.forEach((obstacle) => {   // Loop through obstacles array and update each obstacle
        obstacle.update();
        });
        if (frames % 90 === 0) {
          let newObstacle = new Obstacles();
          obstacles.push(newObstacle);
        }
      
        // Loop through obstacles array to update and render each obstacle
        obstacles.forEach((obstacle, index) => {
          obstacle.update();
          
          // If obstacle is off the screen, remove it from the obstacles array
          if (obstacle.x < -150) {
            obstacles.splice(index, 1);
          }
        });
      
        frames++;
        requestAnimationFrame(updateGame);
      }
      
        // Check for collisions between derb and obstacles
        obstacles.forEach((obstacle) => {
          if (derb.isCollidingWith(obstacle)) {
          endGame();
           }
          });

        // Call updateGame again after a set amount of time (in milliseconds)
        setTimeout(() => {
        window.requestAnimationFrame(updateGame);
        }, 1000 / 60);
        







        //obstaclesFrequency++;
    
         /* if (obstaclesFrequency % 100 === 1) {
    
            let randomObstacleX = Math.floor(Math.random * (derbImg))
            let newObstacle = new Obstacle
            obstacles.push(newObstacle);*/
          

      


        

      
