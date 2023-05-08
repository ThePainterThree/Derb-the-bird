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
  backgroundImg.src = "/Derb-the-bird/Images/background.png";
  const derbImg = new Image();
  derbImg.src = "./images/Derb-bird.png";
  let obstacles = [];

   
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
      //ctx.drawImage(this.img, this.x - this.img.width*2, 0, 3000, 784);
    },
  };


  window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };

    function startGame() {
      // Set the canvas dimensions to match the viewport or is not necessary?
      document.getElementById("game-instructions").style.display = "none";
      document.getElementsByClassName("game-intro")[0].style.display = "none";
      loopBackground();
      //updateCanvas(); 
    }
  };

  


  function loopBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.move();
    backgroundImage.draw();
    derb.draw();

    requestAnimationFrame(loopBackground);
  };


      class Player {
      constructor() {
        this.x = 50;   // define initial position for Derb x
        this.y = 50;   // define initial position for Derb y
        this.img = derbImg;  
        this.draw();
      }
    
      moveLeft(){
        this.x -=30;
      }
      moveRight(){
        this.x +=30;
      }
      moveUp(){
        this.y -=30;
      }
      moveDown(){
        this.y +=30;
      }
  
      draw() {
        ctx.drawImage(this.img, this.x, this.y, 150, 150); //Define the size of derb
      }
    };

    let derb= new Player();

    document.addEventListener("keydown", function(e){
        switch (e.keyCode) {
          case 38:
            // add here the limits
            derb.moveUp();
          break;
        case 40: // down arrow
          derb.moveDown();
          break;
        case 37: // left arrow
          derb.moveLeft();
          break;
        case 39: // right arrow
          derb.moveRight();
          break;
      }
    });
  
    
      class Objects {
        constructor(){
          this.img = derbImg;
          this.speed = 3;
          this.width = this.img.width;
          this.height=this.img.height;
          this.x = 400;
          this.y = Math.random()*canvas.height;
          this.angle = this.angle();
          this.dx=1*this.speed;
          this.yx = 1 * this.speed;   
          this.radius = 20; 
        }
        draw(){
          ctx.save();
          ctx.translate(this.x,this.y);
          ctx.rotate(this.angle * Math.PI/360);
          ctx.drawImage(this.img, 0, 0, this.img.width,this.img.height);
          ctx.restore();
        }
        angle(){
          if(this.y <= 150) return -60;
          else if (this.y >= 151 && this.y <= 300) return 0;
          else return 60;
        }
        move(){
          if(this.angle === -60){
              this.x -= this.dx;
              this.y += this.dx;
          }
          else if(this.angle === 60){
              this.x -= this.dx;
              this.y -= this.dx;
          }
          else this.x -= this.dx;
        }
        update(){
          this.move();
          this.draw();
        }
      };

      



    console.log(obstacles);