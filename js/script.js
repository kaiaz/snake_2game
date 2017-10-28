function Snake(options) {
    this.options = options;
    this.element = this.options.element,
    this.snake = [];
    this.food = [];
    this.gameOver = false;
    this.init()
}


// init game 'objects' - use constructor snake methods
Snake.prototype.init = function () {
    this.initField();
    this.initSnake();
    this.generateFood();
    this.makeStep();
    this.listenPress();
}

// init Snake - field: cellSize = 20px, making 40 cells on y axis and 40 cells x axis
Snake.prototype.initField = function () {
    this.element.style.width = (this.options.field.sizeX * this.options.cellSize) + 'px';
    this.element.style.height = (this.options.field.sizeY * this.options.cellSize) + 'px';
}

// init snake method - use loop for take property snake min size and assign in len var, until then len > i
// loop create div with class snake_item and push in massive after appending in snake every new div use the loop
Snake.prototype.initSnake = function () {
    for(var i = 0, len = this.options.snake.minSize; i < len; i++) {
        var snakeItem = document.createElement('div');
        snakeItem.className = 'snake_item';
        snakeItem.style.height =
            snakeItem.style.width = this.options.cellSize + 'px';
        snakeItem.style.top = 0;
        snakeItem.style.left = (i * this.options.cellSize) + 'px';

        this.snake.push({
            element: snakeItem,
            posX: i,
            posY: 0,
            direction: 'right'
        });
        this.element.appendChild(snakeItem);
    }
}
// this function make snake array moving on field. Loop fore iterating while index i < snake length
// var snake keep every index (cell) snake array and  make it change position on field
// call this function in other function - makeStep, witch keep inside setTimeMount function

Snake.prototype.moveSnake = function () {
    for(var i = 0, len = this.snake.length; i < len; i++) {
        var snakeItem = this.snake[i];
        switch(snakeItem.direction){
            case 'left':
                snakeItem.posX--;
                snakeItem.element.style.left = (snakeItem.posX * this.options.cellSize) + 'px';
                break;
            case 'right':
                snakeItem.posX++;
                snakeItem.element.style.left = (snakeItem.posX * this.options.cellSize) + 'px';
                break;
            case  'top':
                snakeItem.posY--;
                snakeItem.element.style.top = (snakeItem.posY * this.options.cellSize) + 'px';
                break;
            case  'bottom':
                snakeItem.posY++;
                snakeItem.element.style.top = (snakeItem.posY * this.options.cellSize) + 'px';
                break;
        }
    }

    // this loop change direction steel cell snake

    for (var i = 0; i < len - 1; i++) {
        this.snake[i].direction = this.snake[i + 1].direction;
    }

    // this loop check cords snake head cell and food cords if this same remove food element and call grow snake function

    var head = this.snake[this.snake.length - 1];

    for( var i = 0, len = this.food.length; i < len; i++) {
        var food = this.food[i];
        if(food.posX === head.posX && food.posY === head.posY) {
           food.element.remove();
           this.food.splice(i, 1);
           this.grow();
        }
    }

}

Snake.prototype.grow = function () {
    
}

//Assign direction head snake received in listenPress function

Snake.prototype.changeDirection = function (direction) {
    var head = this.snake[this.snake.length - 1];
    head.direction = direction;
}

// This method generate food
// Use object math method random generate number and multiply this on fieldSize
// Use method floor
// Check cords food and snakeItem in loop if cord food == cords snake cell return generate function

Snake.prototype.generateFood = function () {
    var x = Math.floor(Math.random() * this.options.field.sizeX );
    var y = Math.floor(Math.random() * this.options.field.sizeY );

    for(var i = 0, len = this.snake.length; i < len; i++) {
        var snakeItem = this.snake[i];
        if(snakeItem.posX === x && snakeItem.posY === y) {
            return this.generateFood();
        }
    }

    var food = document.createElement('div');
        food.className = 'snake_food';
        food.style.height =
            food.style.width = this.options.cellSize + 'px';
        food.style.top = (y * this.options.cellSize) + 'px';
        food.style.left = (x * this.options.cellSize) + 'px';

        this.food.push({
            element: food,
            posX: x,
            posY: y
        });
        this.element.appendChild(food);
}


// listen key event if press one of thees key calling changeDirection function with argument contain direction match key

Snake.prototype.listenPress = function () {
    var _this = this;
    window.addEventListener('keydown', function () {
        var e = window.event;
        switch (e.keyCode) {
            case 87:
            case 38:
                _this.changeDirection('top');
                break;
            case 83:
            case 40:
                _this.changeDirection('bottom');
                break;
            case 65:
            case 37:
                _this.changeDirection('left');
                break;
            case 68:
            case 39:
                _this.changeDirection('right');
                break;
        }
        console.log(e.keyCode);
    })
}

// Check position snake head - last element in array snake

Snake.prototype.checkGameOver = function () {
    var head = this.snake[this.snake.length - 1];

    if(head.posX === this.options.field.sizeX) {
        return true;
    } else if(head.posY === this.options.field.sizeY) {
        return true;
    } else if (head.posX < 0) {
        return true;
    } else if (head.posY < 0) {
        return true;
    }

    return false
}

// keep inside setTimeout  function. This call makeStep and itself inside makeStep
// makeStep checks result returned in function CheckGameOver if !checkGameOver this working
Snake.prototype.makeStep = function () {
    var _this = this;
    if(!this.checkGameOver()) {
        this.moveSnake();
       return setTimeout(function () {
            _this.makeStep();
        }, this.options.snake.speed)
    }

    alert('Game over!')
}

var createSnake = new Snake({
    element: document.querySelector('.snake'),
    cellSize: 20,
    field: {
        sizeX: 40,
        sizeY: 40
    },
    snake: {
        minSize: 4,
        speed: 500,
        defaultDirection: 'right',
        posX: 0,
        posY: 0
    }
});