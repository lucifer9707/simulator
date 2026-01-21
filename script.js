const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");

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
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.vx *= -bounceDamping;
        }

        if (this.y + this.radius >= canvas.height) {
            this.vy *= -bounceDamping;
            this.y = canvas.height - this.radius;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}

function randomColor() {
    return `hsl(${Math.random() * 360}, 70%, 50%)`;
}

function addBall(x, y) {
    const radius = Math.random() * 15 + 10;
    const vx = (Math.random() - 0.5) * 8;
    const vy = (Math.random() - 0.5) * 8;
    balls.push(new Ball(x, y, vx, vy, radius, randomColor()));
}

function addRandomBall() {
    addBall(
        Math.random() * canvas.width,
        Math.random() * canvas.height
    );
}

function clearBalls() {
    balls.length = 0;
}

canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    addBall(e.clientX - rect.left, e.clientY - rect.top);
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });
    requestAnimationFrame(animate);
}

animate();
