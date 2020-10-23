var spaceship, spaceshipImg;
var backGround, backgroundImg;
var asteroid, asteroidImg, asteroidGroup;
var coin, coinImg, coinGroup;
var fuel, fuelImg, fuelGroup;
var gameLogo, gameLogoImg;
var PLAY = 0;
var END = 1;
var gameState = 0;
var score = 0;
var power = 100;

function preload() {
  spaceshipImg = loadImage("spaceship.png");
  backgroundImg = loadImage("space.jpg");
  asteroidImg = loadImage("asteroid.png");
  coinImg = loadImage("coin.png");
  fuelImg = loadImage("fuel.png");
  gameLogoImg = loadImage("game_logo.png")
}

function setup() {
  createCanvas(1000, 1000);

  backGround = createSprite(200, 200);
  backGround.addImage(backgroundImg);
  backGround.velocityX = -8;

  gameLogo = createSprite(130,90);
  gameLogo.addImage(gameLogoImg);
  gameLogo.scale = 0.1;

  spaceship = createSprite(100, 400);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.2;
  spaceship.debug = false;
  spaceship.setCollider("circle", 40, 0, 280);

  asteroidGroup = new Group();
  coinGroup = new Group();
  fuelGroup = new Group();
}

function spawnAsteroid() {
  if (World.frameCount % 100 === 0) {
    asteroid = createSprite(1000, 200);
    asteroid.addImage(asteroidImg);
    asteroid.velocityX = -25;
    asteroid.scale = 0.2;
    asteroid.depth = spaceship.depth;
    spaceship.depth = spaceship.depth + 1;
    asteroid.y = Math.round(random(100, 650));
    asteroid.debug = false;
    asteroid.setCollider("circle", 0, 0, 300);


    asteroid.depth = spaceship.depth;
    spaceship.depth++;
    asteroidGroup.add(asteroid);
  }
}



function draw() {
  if (backGround.x < 200) {
    backGround.x = backGround.width / 2;
  }


  if (gameState === PLAY) {

    spawnAsteroid();
    spawnCoin();
    spawnFuel();

    if (keyDown("w") && spaceship.y > 20) {
      spaceship.y = spaceship.y - 15;
    }

    if (keyDown("s") && spaceship.y < 900) {
      spaceship.y = spaceship.y + 15;
    }

    if (keyDown("d") && spaceship.x < 800) {
      spaceship.x = spaceship.x + 15;
    }

    if (keyDown("a") && spaceship.x > 20) {
      spaceship.x = spaceship.x - 15;
    }




    if (spaceship.isTouching(asteroidGroup)) {
      gameState = END;
    }

    if (spaceship.isTouching(coinGroup)) {
      coinGroup.destroyEach();
      score = score + 1;
    }

    if (spaceship.isTouching(fuelGroup)){
       fuelGroup.destroyEach();
       power = power + 10;
    }
     
    if(World.frameCount % 50 === 0)
    power = power - 1;

    if(power === 0){
      gameState = END;
    }
  
    drawSprites();


    stroke("black");
    fill("green");
    textSize(30);
    text("Coins: $" + score, 550, 60)

    stroke("black");
    fill("yellow");
    textSize(30);
    text("Fuel Left: " + power + "%", 750, 60)
  }

  if (gameState === END) {
    asteroidGroup.destroyEach();
    asteroidGroup.velocityX = 0;
    backGround.velocityX = 0;
    score = 0;
    stroke("black");
    fill("white");
    textSize(100);
    text("Game Over!", 200, 350)
  }

}

function spawnCoin() {
  if (World.frameCount % 150 === 0) {
    coin = createSprite(1000, 200);
    coin.addImage(coinImg);
    coin.velocityX = -20;
    coin.scale = 0.1;
    coin.depth = spaceship.depth;
    spaceship.depth = spaceship.depth + 1;
    coin.y = Math.round(random(100, 650));
    coin.debug = false;
    coin.setCollider("circle", 0, 0, 250);
    coinGroup.add(coin);
  }
}

function spawnFuel() {
  if(World.frameCount % 1200 === 0) {
    fuel = createSprite(1000,200);
    fuel.addImage(fuelImg);
    fuel.velocityX = -15;
    fuel.scale = 0.1;
    fuel.depth = spaceship.depth;
    spaceship.depth = spaceship.depth + 1;
    fuel.y = Math.round(random(100,650));
    fuel.debug = false;
    fuel.setCollider("circle",0,0,300);
    fuelGroup.add(fuel);
  }
}