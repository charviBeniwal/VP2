//Create variables here
var dog, happyDog, benji;
var database, foodS, foodStock;
var feed, addFood;
var lastFed, fedTime;
var foodObj, food;

function preload() {
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {

  createCanvas(1000, 500);
  benji = createSprite(250, 250, 5, 5);
  benji.addImage(dog);
  benji.scale = 0.1;

  food = new Food();

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime = database.ref('lastFed');
  fedTime.on("value", readStock);

  feed = createButton(" Feed the dog");
  feed.position(700, 95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46, 139, 87);
  food.display();

  drawSprites();

  textSize(13);
  fill(0, 0, 0);
  text("food Stock: " + foodS, 200, 205);

  if (lastFed >= 12) {
    text("Last Feed ; " + lastFed % 12 + "PM", 350, 30)
  } else if (lastFed == 0) {
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }
  console.log(lastFed);


  fedTime = database.ref('FedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

}

// Function to read values
function readStock(data) {
  foodS = data.val();
}

// Function to write values
function writeStock(x) {

  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })


}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}