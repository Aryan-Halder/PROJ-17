var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameState = "play"


function preload(){
  monkey_running =loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  bananaImage = loadImage("banana.png")
  obstacleImage = loadImage("obstacle.png")
}

function setup() {
  createCanvas(1000,500)
  monkey = createSprite(80,500,40,40)
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale = 0.2
  
  ground = createSprite(300,500,900,20)
  ground.velocityX = -4
  ground.x = ground.width/2
  
  FoodGroup = new Group()
  obstacleGroup = new Group()
  score = 0
  
}


function draw() {
  background("white")
  if(gameState === "play"){
    
  if(ground.x <500){
  ground.x = ground.width/2
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12
  }
  monkey.velocityY = monkey.velocityY +0.8
  monkey.collide(ground)
  
  spawnFood()
  spawnObstacle()

     score = score+Math.round(getFrameRate()/60)

    if(obstacleGroup.isTouching(monkey)){
    gameState = "end"
    }
  }
  else if(gameState=== "end"){
    ground.velocityX = 0
    monkey.velocityX = 0
   obstacleGroup.setVelocityXEach(0)
    FoodGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    FoodGroup.setLifetimeEach(-1)
  }
 
  stroke("black")
  textSize(30)
  fill("black")
  text("Score:"+score,600,50)

  stroke("black")
  textSize(30)
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50)
  

  drawSprites()
  
  
  
}

function spawnFood(){
if(frameCount %80 === 0 ){
banana = createSprite(500,360,40,10)
banana.y = random(120,200)
banana.addImage(bananaImage)
banana.scale = 0.2
banana.velocityX = -5
banana.lifetime = 200
monkey.depth = banana.depth +1
FoodGroup.add(banana)

}
}

function spawnObstacle(){
if(frameCount %80 === 0 ){
obstacle = createSprite(500,460,40,10)
obstacle.addImage(obstacleImage)
obstacle.scale = 0.18
obstacle.velocityX = -5
obstacle.lifetime = 200
obstacleGroup.add(obstacle)

}
}
