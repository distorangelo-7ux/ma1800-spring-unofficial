class Ammunition{
    constructor(initialX, initialY, size) {
        this.aestheticAccelerator = 0;
        this.ammoInitial = createVector(initialX, initialY);
        this.ammoOffset = createVector(0, 0);
        this.ammoPos = createVector(0, 0);
        this.ammoRadius = size;

        this.fallTimer = new Timer(250);
    }

    reinitialise(initialX, initialY, size) {
        this.ammoInitial = createVector(initialX, initialY);
        this.ammoRadius = size;
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
        if (this.withinAmmo && !this.objectFall && !this.standby) {
            this.holdingItem = true;
        }
    }
    
    releaseAmmo(withinLoader) {
        this.withinLoader = withinLoader;

        if (!this.withinLoader && this.holdingItem) {
            this.objectFall = true;
            this.holdingItem = false;
            return false
        }

        if (this.withinLoader && this.holdingItem) {
            this.standby = true;            
            this.holdingItem = false;
            return true
        }

    }

    ejectAmmo() {
        if (!this.standby) {return;}
        this.objectFall = true;
        this.holdingItem = false;
    }

    circleReset() {
        this.standby = false;
        this.ammoOffset.x = 0;
        this.ammoOffset.y = 0;
    }
}