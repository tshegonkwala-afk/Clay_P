const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');

// Yes Button click
yesBtn.addEventListener('click', () => {
    response.textContent = "Yay! See you at Hyde Park for a lovely afternoon of clay painting 🎨💗";
    response.classList.remove('hidden');
    startConfetti();
});

// No Button click
noBtn.addEventListener('click', () => {
    response.textContent = "Nice try 😉";
    response.classList.remove('hidden');
});

/* ---------------- Confetti Code ---------------- */
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiParticles = [];

function createConfetti() {
    for(let i=0; i<150; i++){
        confettiParticles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight - window.innerHeight,
            r: Math.random() * 6 + 4,
            d: Math.random() * 40 + 10,
            color: `hsl(${Math.random() * 340 + 320}, 70%, 60%)`, // pink-purple range
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
    });
    updateConfetti();
}

function updateConfetti() {
    confettiParticles.forEach(p => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        if(p.y > window.innerHeight) {
            p.x = Math.random() * window.innerWidth;
            p.y = -20;
            p.tilt = Math.random() * 10 - 10;
        }
    });
}

let confettiInterval;
function startConfetti(){
    createConfetti();
    confettiInterval = setInterval(drawConfetti, 20);
}
