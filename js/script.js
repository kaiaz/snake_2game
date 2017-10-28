function Snake(options) {
    this.options = options;
    this.element = this.options.element,
    this.snake = [];

    this.init()
}


// init game 'objects' - use constructor snake methods
Snake.prototype.init = function () {
    this.initField();
    this.initSnake();
}

// init Snake - field: cellSize = 20px, making 40 cells on y axis and 40 cells x axis
Snake.prototype.initField = function () {
    this.element.style.width = (this.options.field.sizeX * this.options.cellSize) + 'px';
    this.element.style.height = (this.options.field.sizeY * this.options.cellSize) + 'px';
}

Snake.prototype.initSnake = function () {

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