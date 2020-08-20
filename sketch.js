//Create variables here
var dog,happyDog;
var database,databaseRef;
var foodS,foodStock;
var dogImg,dogImg1;
 var lastFed, foodObj;
 var fedTime, lastFed;

function preload(){
  //load images here
  dogImg =loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  dog = createSprite(250,250);
  dog.addImage(dogImg);
 // dog.addImage(dogHappy);
  dog.scale=0.1;

  feed=createButton("Feed the dog");
  feed.position(500,110);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(600,110);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46,139,87);

  drawSprites();
  //add styles here
  textSize(12);
  fill("white")
  stroke(2);
  text("Drago loves milk! Press the UP arrow to feed him milk and make him happy!",50,50)
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(225,225,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + " PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : "+lastFeed+ " AM",350,30);
  }

  //display();
}

function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
if(x<=0){
  x=0;
}else{
  x=x-1;
}
database.ref("/").update({
  Food:x
})
}
