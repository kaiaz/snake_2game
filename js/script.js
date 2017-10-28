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

    this.initMoving();
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
        this.snake.push(snakeItem);
        this.element.appendChild(snakeItem);
    }
}

Snake.prototype.initMoving = function () {
    
}

var createSnake = new Snake({
    element: document.querySelector('.snake'),
    cellSize: 20,
    field: {
        sizeX: 40,
        sizeY: 40
    },
    snake: {
        minSize: 2,
        defaultDirection: 'right',
        posX: 0,
        posY: 0
    }
});