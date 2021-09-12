/*
  Game project 
  extensions : 

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var trees_x;
var treePos_y;
var collectables;
var Mountains;
var sun;
var canyons;
var platforms;
var enemyAnimation;
var bagCoins;


var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var allowJump;
var isContact;
var isFound;
var isReached;

var enemies;
var game_score; 
var flagpole; 
var lives; 
var level;

var firstGameStartTime;
var elapsedTime;
var elapsedTimesinceflag;
var flagReachedTime;

var jumpSound;
var collecteSound; 
var failureSound;
var gameoverSound;
var levelSound;
var backgroundSound;
var isFirstGameStart = true;


function preload()
{
    //load the sounds 
    soundFormats('wav');
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);  
    collecteSound = loadSound('assets/coin.wav');
    collecteSound.setVolume(0.1);  
    failureSound = loadSound('assets/failure.wav');
    failureSound.setVolume(0.2);  
    gameoverSound = loadSound('assets/gameover.wav');
    gameoverSound.setVolume(0.2);
    levelSound = loadSound('assets/levelup.wav');
    levelSound.setVolume(0.1);  
    
    //load images
    enemyAnimation = loadAnimation('assets/asterisk_circle0006.png', 'assets/asterisk_circle0008.png');
    bagCoins = loadGif('assets/bagcoins.gif');

}


function setup()
{
	createCanvas(1024, 576);
 	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    lives = 3; // lives
    level = 0; // level

    startGame(); 
}
//background sound
function sceneSound()
{
    backgroundSound.setVolume(0.09);
    backgroundSound.loop();
}
// game instructions 
function gameInstructions()
{
    elapsedTime = millis() - firstGameStartTime;
    if(elapsedTime < 3000 )
    {  
        noStroke();
        fill(0,0,139);
        textSize(30);
        textFont("Comic Sans MS");
        text('Game instructions : ' , 400,100);
        text('Help the char to find the bag of coins ' , 300,150);
        text('Be aware of hungry ennemies and canyons ' , 300,200);
        text('Press space bar to start ' , 300,250);

    }
}


function startGame()
{
    backgroundSound = loadSound('assets/background.wav',sceneSound);
    
    treePos_y = height/2;

    RDS = random(280, 650); //for sun glow 
	// Variable to control the background scrolling.
	scrollPos = 0;
	// Variable to store the real position of the gameChar in the game world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    isContact = false;
    allowJump = false;
    isFound =false;
	// Initialise arrays of scenery objects.
    sun =[ {
           x:400,
           y:70} 
         ]
    
    trees_x = [200,250,800,850,1500,1550,2100,2150,
              3000,3050,3400,3450,3650,3700,3900,3950,
              4800,4850,5100,5150,5800,5850,6100,6150,
              6600,6650,7100,7150,7600,7650,8200,8250,
              8800,8850,9100,9150,9400,9450
              ];
  
    collectables = [
                   {xpos:680,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:710,ypos:floorPos_y-20,size:20,isFound:false},
                   {xpos:800,ypos:floorPos_y-20,size:20,isFound:false},
                   {xpos:830,ypos:floorPos_y-20,size:20,isFound:false},
                   {xpos:880,ypos:floorPos_y-20,size:20,isFound:false},
                   {xpos:910,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:940,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:1230,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:1290,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:1320,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:1480,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:1510,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:1540,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:1720,ypos:floorPos_y-100,size:20,isFound: false},
                   {xpos:1750,ypos:floorPos_y-100,size:20,isFound: false},
                   {xpos:1780,ypos:floorPos_y-100,size:20,isFound: false},
                   {xpos:1810,ypos:floorPos_y-100,size:20,isFound: false},
                   {xpos:1930,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:1960,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:2020,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:2050,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:2080,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:2110,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:2150,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:2230,ypos:floorPos_y-80,size:20,isFound: false},
                   {xpos:2340,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:2370,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:2400,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:2460,ypos:floorPos_y-130,size:20,isFound: false},   
                   {xpos:2490,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:2640,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:2670,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:2700,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:2730,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:2760,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:3000,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3030,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3060,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3090,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3120,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3150,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3450,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3480,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3510,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3540,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3570,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3600,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:3775,ypos:floorPos_y-80,size:20,isFound: false},
                   {xpos:3850,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:3880,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:3910,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:3940,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:4010,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:4040,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:4070,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:4100,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:4130,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:4160,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:4190,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:4220,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:4250,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:4450,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:4480,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:4510,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:4540,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:4680,ypos:floorPos_y-80,size:20,isFound: false},
                   {xpos:4710,ypos:floorPos_y-80,size:20,isFound: false},
                   {xpos:4850,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:4880,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:4910,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:4940,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:4970,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:5000,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:5030,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:5060,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:5090,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:5520,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:5550,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:5650,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:5680,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:5710,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:5740,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:5770,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:5800,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:6000,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:6030,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:6060,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:6090,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:6120,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:6150,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:6180,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:6380,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:6410,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:6440,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:6470,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:6500,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:6730,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:6760,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:6790,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:6890,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:6920,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:6950,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:6980,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:7110,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7140,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7170,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7200,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7230,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7260,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7430,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:7460,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:7460,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:7490,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:7520,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:7550,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:7580,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:7730,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7760,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7790,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7820,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7850,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:7980,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:8010,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:8040,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:8070,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:8100,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:8130,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:8160,ypos:floorPos_y-130,size:20,isFound: false},
                   {xpos:8330,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:8360,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:8390,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:8420,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:8450,ypos:floorPos_y-110,size:20,isFound: false},        
                   {xpos:8610,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:8640,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:8670,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:8700,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:8730,ypos:floorPos_y-110,size:20,isFound: false},
                   {xpos:8900,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:8930,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:8960,ypos:floorPos_y-20,size:20,isFound: false},
                   {xpos:8990,ypos:floorPos_y-20,size:20,isFound: false},

                  ];
    
    mountains = [{x:400,y:floorPos_y},
                 {x:600,y:floorPos_y},
                 {x:1600,y:floorPos_y}, 
                 {x:1700,y:floorPos_y},
                 {x:1800,y:floorPos_y},
                 {x:2000,y:floorPos_y},
                 {x:2950,y:floorPos_y},
                 {x:3750,y:floorPos_y},
                 {x:3950,y:floorPos_y},
                 {x:4150,y:floorPos_y},
                 {x:5200,y:floorPos_y},        
                 {x:5100,y:floorPos_y},
                 {x:6100,y:floorPos_y}, 
                 {x:6370,y:floorPos_y}, 
                 {x:6400,y:floorPos_y},
                 {x:7350,y:floorPos_y}, 
                 {x:7500,y:floorPos_y}, 
                 {x:8500,y:floorPos_y}, 
                 {x:8900,y:floorPos_y},
                 {x:9300,y:floorPos_y}
                ];
    
    clouds = [{pos_x :200,pos_y:150},
              {pos_x:600,pos_y:100}, 
              {pos_x:1100,pos_y:150},
              {pos_x:1500,pos_y:100},
              {pos_x:2000,pos_y:150},
              {pos_x:2500,pos_y:100},
              {pos_x:3000,pos_y:150},
              {pos_x:3500,pos_y:100},
              {pos_x:4000,pos_y:150},
              {pos_x:4500,pos_y:100},
              {pos_x:5700,pos_y:150},
              {pos_x:6200,pos_y:100},
              {pos_x:6700,pos_y:150},
              {pos_x:7200,pos_y:100},
              {pos_x:8600,pos_y:150},
              {pos_x:9000,pos_y:100},
             ];
    
    canyons = [{xPos:1050,yPos:floorPos_y,height : width/3,width :150},
              {xPos:2300,yPos:floorPos_y,height : width/3,width :250}, 
              {xPos:3250,yPos:floorPos_y,height : width/3,width :100}, 
              {xPos:4450,yPos:floorPos_y,height : width/3,width :250}, 
              {xPos:5500,yPos:floorPos_y,height : width/3,width :200},            
              {xPos:6700,yPos:floorPos_y,height : width/3,width :250}, 
              {xPos:7800,yPos:floorPos_y,height : width/3,width :300}
              ];
    
    platforms = [];  
    platforms.push(createPlatforms(1680,floorPos_y-85,200,20));
    platforms.push(createPlatforms(2200,floorPos_y-65,80,20));
    platforms.push(createPlatforms(2260,floorPos_y-90,200,20));
    platforms.push(createPlatforms(2440,floorPos_y-115,100,20));
    platforms.push(createPlatforms(2600,floorPos_y-90,200,20));
    platforms.push(createPlatforms(3740,floorPos_y-65,80,20));
    platforms.push(createPlatforms(3800,floorPos_y-90,200,20));
    platforms.push(createPlatforms(3985,floorPos_y-115,300,20));
    platforms.push(createPlatforms(4400,floorPos_y-90,200,20));
    platforms.push(createPlatforms(4650,floorPos_y-65,100,20));
    platforms.push(createPlatforms(5400,floorPos_y-65,80,20));
    platforms.push(createPlatforms(5470,floorPos_y-90,150,20));
    platforms.push(createPlatforms(5610,floorPos_y-115,250,20));
    platforms.push(createPlatforms(5950,floorPos_y-90,300,20));
    platforms.push(createPlatforms(6350,floorPos_y-115,250,20));
    platforms.push(createPlatforms(6700,floorPos_y-90,120,20));
    platforms.push(createPlatforms(6850,floorPos_y-115,200,20));
    platforms.push(createPlatforms(7080,floorPos_y-90,250,20));
    platforms.push(createPlatforms(7400,floorPos_y-115,250,20));
    platforms.push(createPlatforms(7700,floorPos_y-90,200,20));
    platforms.push(createPlatforms(7950,floorPos_y-115,250,20));
    platforms.push(createPlatforms(8300,floorPos_y-90,200,20));
    platforms.push(createPlatforms(8580,floorPos_y-90,200,20));

    enemies = []; 
    enemies.push(new createEnemy(1720,floorPos_y-30,100));
    enemies.push(new createEnemy(2650,floorPos_y-30,200));
    enemies.push(new createEnemy(2800,floorPos_y-30,200));
    enemies.push(new createEnemy(3880,floorPos_y-30,200)); 
    enemies.push(new createEnemy(4000,floorPos_y-30,200));
    enemies.push(new createEnemy(4250,floorPos_y-30,100));
    enemies.push(new createEnemy(5860,floorPos_y-30,100));
    enemies.push(new createEnemy(6250,floorPos_y-30,100));
    enemies.push(new createEnemy(6550,floorPos_y-30,100));
    enemies.push(new createEnemy(7000,floorPos_y-30,100));
    enemies.push(new createEnemy(7250,floorPos_y-30,150));
    enemies.push(new createEnemy(7600,floorPos_y-30,150));
    enemies.push(new createEnemy(8200,floorPos_y-30,150));
    enemies.push(new createEnemy(8450,floorPos_y-30,150));
    enemies.push(new createEnemy(8700,floorPos_y-30,150)); 

    game_score = 0;
    if (isFirstGameStart) {
        firstGameStartTime = millis();  
        
    }
    //add an end to the level
    flagpole = {isReached: false, x_pos: 5200}; 
    isFirstGameStart = false;
    gameOver(); 
}

function draw()
{
	background(135, 206, 235); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // to draw green ground

    push();  
    translate(scrollPos,0);
    drawMountains(); // to draw mounains
    // Draw canyons and check if character fell over the canyon
    for(var i = 0; i< canyons.length; i++)
    { 
          if(gameChar_world_x > canyons[i].xPos && gameChar_world_x <(canyons[i].xPos + canyons[i].width)  && gameChar_y >= floorPos_y )
              {
                  checkCanyon(canyons[i]);    
              }
             drawCanyon(canyons[i]); 
      
    }

    drawSun(); //to draw sun
    drawClouds(); //to draw clouds 
    drawTrees(); //to draw trees
    //Draw platforms
    for(var i=0;i< platforms.length; i++ )
        {
            platforms[i].draw();
        }
	// Draw collectable items
    for (var i=0; i<collectables.length; i++)
    {
            if(!collectables[i].isFound)
                {
                    checkCollectable(collectables[i]); 
                    drawCollectable(collectables[i]);
                }
            
    }
    // check if character rechead the flagpole 
    if(!checkFlagpole.isReached)
        {
            checkFlagpole();
        }

    // check if character touch the enemy and decrease lives by 1
    for(var i=0; i<enemies.length; i++)
        {
            enemies[i].draw();         
            var isContact = enemies[i].checkContact(gameChar_world_x,gameChar_y);
            if(isContact)
            {
            if(lives >0)
                {
                    lives--
                    backgroundSound.stop();
                    failureSound.play(); 
                    startGame();
                    break;
                }
            }
            
        }
    
    image(bagCoins,9500,floorPos_y-45); //to draw the bag coins  

    renderFlagpole();
    checkPlayerDie();
    pop(); 
    gameInstructions(); // game instructions text
	drawGameChar(); // to draw game character 
    //score counter
    fill(0, 0, 139); 
    noStroke(2);
    textFont("Comic Sans MS");
    textSize(20);
    text('score: ' + game_score, 700,40);
    //lives counter
    fill(0, 0, 139); 
    noStroke(2);
    textFont("Comic Sans MS");
    textSize(20);
    text('lives: ' + lives, 850,40);
    //level counter
    fill(0, 0, 139); 
    noStroke(2);
    textFont("Comic Sans MS");
    textSize(20);
    text('level: ' + level, 550,40);

    if(lives >= 1)
        {
            checkPlayerDie;
        }

    if(lives == 0 )
        {
            fill(0, 0, 139); 
            noStroke();
            textSize(40);
            textFont("Comic Sans MS");
            text("GAME OVER ! ", 300,200);
            text('Refresh the page to start again',300,250);
            
        }
 
	// Logic to make the game character move or the background scroll
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5; 
		}
		else
		{
			scrollPos += 5;
		}
	}
	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall. 
    if (gameChar_y < floorPos_y) 
    {
      for(var i=0; i<platforms.length; i++)
            {
                var isContact = platforms[i].checkContact(gameChar_world_x,gameChar_y) == true;
                if(isContact)
                    {
                        isFalling = false;
                        allowJump = true;

                        break;
                    }
                
                }
        if(isContact == false)
                {
                    gameChar_y += 2; 
                    isFalling = true;
                }

    }
    else 
    {
        isFalling = false;
    }
    
    if(isPlummeting)
    {
        gameChar_y += 5 ; 
    }    
	//real position of gameChar in game world.
	gameChar_world_x = gameChar_x - scrollPos;

  
   

}

// Key control functions

function keyPressed()
{
    
    if( keyCode ==37)
        {
            isLeft=true; 
        }
    else if( keyCode == 39)
        {
            isRight=true;
        }
    if(key == "" || keyCode == 32)
        {
            if(!isFalling)
                {
                    gameChar_y -= 120; 
                    jumpSound.play();
                }
        }
    if(keyCode == 32)
    {
        if(flagpole.isReached)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


    
    if(allowJump)
        {
            isFalling = true;
        }
    

}

function keyReleased()
{
    if(keyCode==37)
        {
            isLeft=false;
        }
    else if(keyCode==39)
        {
            isRight=false;
        }

}
// Function to draw the game character.
function drawGameChar()
{
    //the game character
	if(isLeft && isFalling)
	{
    // jumping-left code
        //*head
        noStroke();
        fill(205,133,63);
        ellipse(gameChar_x,gameChar_y-55,30);
        //*eyes
        fill(220,220,220);
        ellipse(gameChar_x-8,gameChar_y-60,5,5);
        ellipse(gameChar_x+8,gameChar_y-60,5,5);
        fill(128,0,0);
        ellipse(gameChar_x-8,gameChar_y-59,3,3);
        ellipse(gameChar_x+8,gameChar_y-59,3,3);
        //*nose
        fill(139,0,0);
        rect(gameChar_x-2,gameChar_y-55,2,4);
        //*mouth
        fill(178,34, 34);
        ellipse(gameChar_x-2,gameChar_y-45,6,6);
        //*hands
        fill(0);
        rect(gameChar_x-12,gameChar_y-38,4,8);
        rect(gameChar_x+7,gameChar_y-38,4,8);
        //*body of character
        fill(218, 165, 32);
        rect(gameChar_x-8,gameChar_y-40,15,30);
        //*feet of character
        fill(0);
        rect(gameChar_x-5,gameChar_y-10,6,10);
        rect(gameChar_x+1,gameChar_y-10,6,10);
	}
	else if(isRight && isFalling)
	{
    //jumping-right code
        //*head
        noStroke();
        fill(205,133,63);
        ellipse(gameChar_x,gameChar_y-55,30);
        //*eyes
        fill(220,220,220);
        ellipse(gameChar_x-8,gameChar_y-60,5,5);
        ellipse(gameChar_x+8,gameChar_y-60,5,5);
        fill(128,0,0);
        ellipse(gameChar_x-7.5,gameChar_y-59,3,3);
        ellipse(gameChar_x+8.5,gameChar_y-59,3,3);
        //*nose
        fill(139,0,0);
        rect(gameChar_x+2,gameChar_y-55,2,4);
        //*mouth
        fill(178,34, 34);
        ellipse(gameChar_x+2,gameChar_y-45,6,6);
        //*hands
        fill(0);
        rect(gameChar_x-12,gameChar_y-38,4,8);
        rect(gameChar_x+7,gameChar_y-38,4,8);
        //*body of character
        fill(218, 165, 32);
        rect(gameChar_x-8,gameChar_y-40,15,30);
        //*feet of character
        fill(0);
        rect(gameChar_x+1,gameChar_y-10,6,10);
        rect(gameChar_x-8,gameChar_y-10,6,10);
	}
	else if(isLeft)
	{
    //walking left code
         //*head
        noStroke();
        fill(205,133,63);
        ellipse(gameChar_x,gameChar_y-55,30);
        //*eyes
        fill(220,220,220);
        ellipse(gameChar_x-8,gameChar_y-60,5,5);
        ellipse(gameChar_x+8,gameChar_y-60,5,5);
        fill(128,0,0);
        ellipse(gameChar_x-8,gameChar_y-59,3,3);
        ellipse(gameChar_x+8,gameChar_y-59,3,3);
        //*nose
        fill(139,0,0);
        rect(gameChar_x-2,gameChar_y-55,2,4);
        //*mouth
        fill(178,34, 34);
        ellipse(gameChar_x-2,gameChar_y-45,8,6);
        //*hands
        fill(0);
        rect(gameChar_x-12,gameChar_y-35,4,8);
        rect(gameChar_x+7,gameChar_y-35,4,8);
        //*body of character
        fill(218, 165, 32);
        rect(gameChar_x-8,gameChar_y-40,15,30);
        //*feet of character
        fill(0);
        rect(gameChar_x-1,gameChar_y-10,6,10);
        rect(gameChar_x-8,gameChar_y-10,6,10);
	}
	else if(isRight)
	{
    //walking right code
        //head
        noStroke();
        fill(205,133,63);
        ellipse(gameChar_x,gameChar_y-55,30);
        //eyes
        fill(220,220,220);
        ellipse(gameChar_x-8,gameChar_y-60,5,5);
        ellipse(gameChar_x+8,gameChar_y-60,5,5);
        fill(128,0,0);
        ellipse(gameChar_x-7.5,gameChar_y-59,3,3);
        ellipse(gameChar_x+8.5,gameChar_y-59,3,3);
        //nose
        fill(139,0,0);
        rect(gameChar_x+2,gameChar_y-55,2,4);
        //mouth
        fill(178,34, 34);
        ellipse(gameChar_x+2,gameChar_y-45,8,6);
        //hands
        fill(0);
        rect(gameChar_x-12,gameChar_y-35,4,8);
        rect(gameChar_x+7,gameChar_y-35,4,8);
        //body 
        fill(218, 165, 32);
        rect(gameChar_x-8,gameChar_y-40,15,30);
        //feet 
        fill(0);
        rect(gameChar_x+1,gameChar_y-10,6,10);
        rect(gameChar_x-8,gameChar_y-10,6,10);
	}
	else if(isFalling || isPlummeting)
	{
    //jumping facing forwards code
        //head
        noStroke();
        fill(205,133,63);
        ellipse(gameChar_x,gameChar_y-55,30);
        //eyes
        fill(220,220,220);
        ellipse(gameChar_x-8,gameChar_y-60,5,5);
        ellipse(gameChar_x+8,gameChar_y-60,5,5);
        fill(128,0,0);
        ellipse(gameChar_x-7.5,gameChar_y-59,3,3);
        ellipse(gameChar_x+8.5,gameChar_y-59,3,3);
        //nose
        fill(139,0,0);
        rect(gameChar_x+2,gameChar_y-55,2,4);
        //mouth
        fill(178,34, 34);
        ellipse(gameChar_x+2,gameChar_y-45,8,6);
        //hands
        fill(0);
        rect(gameChar_x-12,gameChar_y-35,4,8);
        rect(gameChar_x+7,gameChar_y-35,4,8);
        //body
        fill(218, 165, 32);
        rect(gameChar_x-8,gameChar_y-40,15,30);
        //feet 
        fill(0);
        rect(gameChar_x+1,gameChar_y-10,6,10);
        rect(gameChar_x-8,gameChar_y-10,6,10);
	}
	else
	{
    //standing front facing code
        //head
        noStroke();
        fill(205,133,63);
        ellipse(gameChar_x,gameChar_y-55,30);
        //eyes
        fill(220,220,220);
        ellipse(gameChar_x-8,gameChar_y-60,5,5);
        ellipse(gameChar_x+8,gameChar_y-60,5,5);
        fill(128,0,0);
        ellipse(gameChar_x-8,gameChar_y-59,3,3);
        ellipse(gameChar_x+8,gameChar_y-59,3,3);
        //nose
        fill(139,0,0);
        rect(gameChar_x-1,gameChar_y-55,2,4);
        //mouth
        fill(178,34, 34);
        ellipse(gameChar_x,gameChar_y-45,10,2);
        //hands
        fill(0);
        rect(gameChar_x-12,gameChar_y-35,4,8);
        rect(gameChar_x+7,gameChar_y-35,4,8);
        //body
        fill(218, 165, 32);
        rect(gameChar_x-8,gameChar_y-40,15,30);
        //feet
        fill(0);
        rect(gameChar_x+1,gameChar_y-10,6,10);
        rect(gameChar_x-8,gameChar_y-10,6,10);
	}
}

//// Background render functions

// Function to draw clouds
function drawClouds()
{
   for(var i = 0; i< clouds.length ; i++)
    {
        var c = clouds[i];
        beginShape();
        fill(211, 211, 211);
        ellipse(c.pos_x, c.pos_y,100,80);
        ellipse(c.pos_x-70, c.pos_y-5,70,70);
        ellipse(c.pos_x+50, c.pos_y,60,60);
        ellipse(c.pos_x-35, c.pos_y-25,50,50);
        ellipse(c.pos_x+20, c.pos_y-30,70,60);
        //second cloud
        ellipse(c.pos_x+200, c.pos_y+20,100,80);
        ellipse(c.pos_x+130, c.pos_y+15,70,70);
        ellipse(c.pos_x+250, c.pos_y+20,60,60);
        ellipse(c.pos_x+165, c.pos_y-5,50,50);
        ellipse(c.pos_x+220, c.pos_y-10,70,60);
        noStroke();
        fill(255);
        c.pos_x += 0.5;
        endShape();
    }
    
    
}

//function to draw sun
function drawSun()
{
    for(var i=0; i<sun.length; i++)
    {
        var s = sun[i];  
        //sun
        fill(200, 130, 10);
        ellipse(s.x, s.y, 100, 100);
        fill(250, 200, 0);
        ellipse(s.x +5 , s.y +10, 100 - 20, 100 - 20);
        //glow
        fill(200, 130, 10, 20);
        ellipse(s.x, s.y, (frameCount % 500)*2, (frameCount % 500)*2);
        ellipse(s.x+5, s.y +10, (frameCount % 500)*4, (frameCount % 500)*4);
        s.x = gameChar_world_x - (gameChar_x - 100) ; 

    }
    
    
}

// Function to draw mountains objects.
function drawMountains()
{
  for(var i =0; i< mountains.length ; i++)
    {
        var m = mountains[i]; 
        fill(169, 169, 169);
        triangle(m.x, m.y,m.x+140,m.y-166,m.x+300,m.y);
        fill(192,192,192);
        triangle(m.x-100,m.y,m.x-60,m.y-176,m.x+200,m.y);
        triangle(m.x-400,m.y,m.x-160,m.y-156,m.x+100,m.y);
    }
  
}

// Function to draw trees objects.
function drawTrees()
{
  for(var i = 0; i< trees_x.length; i++)
    {
        var t = trees_x[i];
        fill(139,69,19);
        rect(t ,treePos_y,30,150);
         //*branches
        fill( 34,139,34);
        triangle(t -60,treePos_y+47, t +20,treePos_y-61, t +90,treePos_y+49);
        triangle(t -60,treePos_y+7,t +20,treePos_y-101,t +90,treePos_y+9);
        triangle(t -60,treePos_y-33,t +20,treePos_y-141,t +90,treePos_y-31);
    }       
}

// Function to draw canyon objects.
function drawCanyon(t_canyon)
{
    noStroke(); 
    fill(135, 206, 235);
    rect(t_canyon.xPos, t_canyon.yPos,t_canyon.width, t_canyon.height);
}

// Function to check if character is over a canyon.
function checkCanyon(t_canyon)
{
    if(gameChar_world_x > t_canyon.xPos && gameChar_world_x <(t_canyon.xPos + t_canyon.width) && gameChar_y >= floorPos_y)
    {

        isPlummeting = true;
    }
    else
    {
        isPlummeting = false;
    }
    if(isPlummeting)
    {
        gameChar_y += 6;
        backgroundSound.stop();
        failureSound.play();
    }

 }

// Function to draw collectable objects.
function drawCollectable(t_collectable)
{
    noFill();
    strokeWeight(2);
    stroke(0);
    fill(255, 215 ,0);
    ellipse(t_collectable.xpos,t_collectable.ypos,t_collectable.size,t_collectable.size);
    textSize(10);
    text('$' , t_collectable.xpos-3,t_collectable.ypos+3);
     
}

// Function to check character has collected an item.
function checkCollectable(t_collectable)
{
    if(dist(gameChar_world_x,gameChar_y,t_collectable.xpos,t_collectable.ypos) <=30)
    {
        t_collectable.isFound = true;
        collecteSound.play();
        game_score += 10; 
    }

}

// function to draw the flagpole 
function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(100);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(178,34,34);
    noStroke();
    if(flagpole.isReached)
        {
            rect(flagpole.x_pos,floorPos_y-250,50,50);
            level = 1;
           
        }
    else
        {
            rect(flagpole.x_pos,floorPos_y-50,50,50);
        }
   
    pop();
}

// function to check the distance of the game character from flagpole
function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);   
    if( d < 4) 
      {
        
        flagpole.isReached = true;
        levelSound.playMode('restart');
        levelSound.play();
      }
}

// each time the game char fall down a canyon the game reset and their remaining lives decrement by one.
function checkPlayerDie()
{   
    if(isPlummeting == true )
        {
           if(lives >0) lives--;
            isPlummeting = false;
            startGame();
        }  
}


// function to create platforms 
function createPlatforms(x,y,length)
{
    var v = {

        x:x,
        y:y,

        length: length,
        currentX: x,  

    draw : function()
               {
                   noStroke();
                   fill(85,107,47);
                   rect(this.currentX,this.y,this.length,20);

               },  
    checkContact : function(gc_x,gc_y)
               {
                   if(gc_x >  this.x && gc_x < this.x + this.length)
                       {
                           var d = this.y-gc_y;

                        if( gc_y > this.y ) 

                               {
                                   return true;
                               }
                       }
                   return false;
               },
    }
    return v;
}

//function to create ennemies 
function createEnemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    this.currentX = x;
    this.inc = 1; 

    this.update = function()
        {
           this.currentX += this.inc; 

            if(this.currentX >= this.x + this.range)
                {
                    this.inc = -1; //-1
                }
            else if (this.currentX < this.x)
                {
                    this.inc = 1; //1
                }
        }
    
    this.draw = function()
    {
        this.update();
        animation(enemyAnimation,this.currentX,this.y);
    }
 
    this.checkContact = function(gc_x,gc_y)
    {
        var d = dist(gc_x,gc_y,this.currentX,this.y)
        
        if(d < 48) 
            {
                return true;
            }
        return false;
    }
       
}

// function to control game over sound 
function gameOver()
{

    if(lives == 0)
        {  
            backgroundSound.pause();
            gameoverSound.play();
        }
}

// function endOfGame()
// {
//     var d = dist(gameChar_world_x,gameChar_y,9500,floorPos_y-45)
//     console.log(d);
//   if(d <= 50)
//   {

//       bagCoins.isFound = true; 
//       noStroke();
//       fill(0);
//       textSize(40);
//       text(' CONGRATULATIONS  ' , 400,200);


//   }
    
// }



        
