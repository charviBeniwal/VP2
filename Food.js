class Food {

    constructor() {
        this.image = loadImage("Milk.png");
        this.foodStock = null;
        this.lastFed = null;
    }

    display() {
        var x = 80, y = 100;
        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 80;
                    y = y + 50;
                }
                this.image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }

    getFoodStock() {
        var foodStockRef = database.ref('foodStock');
        foodStockRef.on("value", (data) => {
            foodStock = data.val();
        })
    }

    updateFoodStock() {
        database.ref('/').update({
            foodStock: count
        });
    }

    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1;
        }
    }

}