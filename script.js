const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

const balls = [];
const gravity = 0.5;
const bounceDamping = 0.8;

class Ball {
    constructor(x, y, vx, vy, radius, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
    }

    update() {
        // Apply gravity
        this.vy += gravity;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.vx = -this.vx * bounceDamping;
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.vy = -this.vy * bounceDamping;
            this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }
}

function addBall(x, y) {
    const radius = Math.random() * 20 + 10;
    const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    const vx = (Math.random() - 0.5) * 10;
    const vy = (Math.random() - 0.5) * 10;
    balls.push(new Ball(x, y, vx, vy, radius, color));
}

function update() {
    balls.forEach(ball => ball.update());
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.draw());
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    addBall(x, y);
});

// Start the animation
animate();
