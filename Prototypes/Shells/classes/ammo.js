class Ammunition{
    constructor(initialX, initialY, size) {
        this.aestheticAccelerator = 0;
        this.ammoInitial = createVector(initialX, initialY);
        this.ammoOffset = createVector(0, 0);
        this.ammoPos = createVector(0, 0);
        this.ammoRadius = size;

        this.fallTimer = new Timer(250);
    }
    
    ammoLoop() {
        this.ammoPos.x = (this.ammoInitial.x - this.ammoOffset.x);
        this.ammoPos.y = (this.ammoInitial.y - this.ammoOffset.y);

        fill('#de3434');
        circle(this.ammoPos.x, this.ammoPos.y, this.ammoRadius);

        if (this.holdingItem) {
            this.ammoOffset.x = this.ammoInitial.x - mouseX;
            this.ammoOffset.y = this.ammoInitial.y - mouseY;
        }

        if (this.objectFall) {
            this.fallTimer.timerLoop();
            this.aestheticAccelerator+=0.98;
            this.ammoOffset.y -= this.aestheticAccelerator;

            if (this.fallTimer.timerAction(1)) {
            console.log("dropped");
            this.aestheticAccelerator = 0;
            this.circleReset();
            this.fallTimer.timerReset();
            this.objectFall = false;
            }
        }
    }

    ammoGrab() {
        if (this.withinAmmo() && !this.objectFall) {
            this.holdingItem = true;
        }
    }

    withinAmmo() {
        return (dist(mouseX, mouseY, this.ammoPos.x, this.ammoPos.y) < this.ammoRadius / 2);
    }

    releaseAmmo(withinLoader) {
        this.withinLoader = withinLoader;

        if (!this.withinLoader && this.holdingItem) {
            this.objectFall = true;
            this.holdingItem = false;
            return false
        }

        if (this.withinLoader && this.holdingItem) {
            this.circleReset();
            this.holdingItem = false;
            return true
        }

    }

    circleReset() {
        this.ammoOffset.x = 0;
        this.ammoOffset.y = 0;
    }
}