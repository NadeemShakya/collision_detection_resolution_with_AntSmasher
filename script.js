
let canvas = document.getElementById("myCanvas");
// set the resizable canvas height and width.
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext("2d");
//  draw the canvas.
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.styleRect = "red";
// bubbles array to hold all the bubbles particles.
let bubbles = [];
// generate random numbers 
let randomNumbers = (max, min) => Math.floor(Math.random() * (max - min)) + min;
// distance formula
let distance = (x1, y1, x2, y2) => {
    let part1 = Math.pow((x2 - x1), 2);
    let part2 = Math.pow((y2 - y1), 2);
    let part3 = part1 + part2;
    return Math.sqrt(part3);
}

document.addEventListener("click", event => {
   var mouseX = event.clientX;
   var mouseY = event.clientY;
   for(let i = 0; i < bubbles.length; i++) {
        let d = distance(mouseX, mouseY, bubbles[i].x, bubbles[i].y);
        if(d < bubbles[i].radius) {
            bubbles.splice(i, 1);
        }   
   }
})

// generate radnom bubbles.
let bubblesGenerator = () => {
    
    // offset off the canvas.
    const offset = 100;
    // number of bubbles.
    const bubblesCount =50;
    for(let i = 0; i < bubblesCount; i++) {
        // radius of the bubbles.
        let radius;
        if(bubblesCount > 500) {
             radius = randomNumbers(5, 15);
        }else if(bubblesCount > 100) {
             radius = randomNumbers(15, 25);
        }else {
            radius = randomNumbers(25, 40);
        }
        // get random x & y position.
        let x = randomNumbers(radius + offset, canvas.width - radius - offset);
        let y = randomNumbers(radius + offset, canvas.height - radius - offset);
        if(i != 0) {
            for(let j = 0; j < bubbles.length; j++) {
            
              let d = distance(bubbles[j].x, bubbles[j].y, x, y);
              if(d <= (radius * 2)) {
                x = randomNumbers(radius + offset, canvas.width - radius - offset);
                y = randomNumbers(radius + offset, canvas.height - radius - offset);
                j = -1;
              }  
            }
        }
        // construct a new bubble object and push into bubbles array..
        let bubble = new Bubble(x, y, radius);
        bubbles.push(bubble);
    }

}
// animate the bubbles.
let animate = () => {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "25px Verdana";
    ctx.fillText("Click on the ANT to smash them.", 100, 50);
    // change alpha value to get the tail  effect.
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    for(index in bubbles) {
        // for every bubbles, show and move bubbles.
        bubbles[index].show();
        bubbles[index].move();
        for(let i = 0; i < bubbles.length; i++) {
            // collision detection and resolution.
            if(index != i && bubbles[index].isTouching(bubbles[i])) {
                collisionResolver(bubbles[index], bubbles[i]);
            }
        }
    }
    requestAnimationFrame(animate);
}

bubblesGenerator();
animate();
