class RectangularPanel {
    constructor(posX, posY, width, height) {
        this.position = createVector(posX, posY);
        this.width = width;
        this.height = height;
    }
    
    collisionCheck(mouseX, mouseY) {
        this.mouseX = mouseX;
        this.mouseY = mouseY;

        if (this.mouseX < this.position.x + this.width / 2 && this.mouseX > this.position.x - this.width / 2 &&
            this.mouseY < this.position.y + this.height / 2 && this.mouseY > this.position.y - this.height / 2
            ) {return true;} else {return false;}
    }
}