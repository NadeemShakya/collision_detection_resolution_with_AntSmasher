class Bubble {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.mass = 1;
        this.velocity = {
            x: Math.random() < 0.5 ? -.5 : .5,
            y: Math.random() < 0.5 ? -.5 : .5
        }
        this.r = randomNumbers(0, 255);
        this.g = randomNumbers(0, 255);
        this.b = randomNumbers(0, 255);
    }


    show = () => {
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.font = "15px Arial";    
        ctx.fillText("ANT", this.x - 15, this.y+7.5);
        ctx.fillStyle = "black";
        ctx.stroke();
    }

    move = () => {
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        if(this.x <= this.radius || this.y <= this.radius || 
            this.x + this.radius >= canvas.width || this.y + this.radius >= canvas.height) {
            this.velocity.x = - this.velocity.x;
            this.velocity.y = - this.velocity.y;
        }   
    }

    isTouching(anotherBubble) {
        let x1 = this.x, y1 = this.y, x2 = anotherBubble.x, y2 = anotherBubble.y;
        let part1 = Math.pow((x2 - x1), 2);
        let part2 = Math.pow((y2 - y1), 2);
        let part3 = part1 + part2;
        let d = Math.sqrt(part3);
        let r = this.radius + anotherBubble.radius;
        if(d <= r) {
            return true;
        }else {
            return false;
        }
    }
}