let names = [];
let colors = [];
let canvas = document.getElementById('wheel');
let ctx = canvas.getContext('2d');
let currentAngle = 0;
let spinning = false;

function addName() {
    let name = document.getElementById('nameInput').value;
    if (name.trim() !== "") {
        names.push(name);
        document.getElementById('nameList').innerHTML = names.join("<br>");
        document.getElementById('nameInput').value = "";

        let randomColor;
        do {
            randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        } while (randomColor === "#000000"); // Exclude black

        colors.push(randomColor);
        drawWheel();
    }
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let totalNames = names.length;
    let angle = 360 / totalNames;

    for (let i = 0; i < totalNames; i++) {
        let startAngle = currentAngle + (i * angle * Math.PI / 180);
        let endAngle = currentAngle + ((i + 1) * angle * Math.PI / 180);

        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();

        ctx.fillStyle = 'black'; // Keep text color black
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let midAngle = (startAngle + endAngle) / 2;
        ctx.fillText(names[i], canvas.width / 2 + Math.cos(midAngle) * canvas.width / 3, canvas.height / 2 + Math.sin(midAngle) * canvas.height / 3);
    }
}

function spinWheel() {
    if (names.length === 0 || spinning) return;

    spinning = true;
    let spinDuration = 3000; // 3 seconds
    let targetSpin = Math.floor(Math.random() * 3600) + 720;

    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = Math.min((currentTime - startTime) / spinDuration, 1);

        // Apply easing function for acceleration and deceleration
        let easedProgress = easeOutCubic(progress); // Use a cubic easing function

        currentAngle = targetSpin * easedProgress;
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            determineWinner();
        }
    }

    requestAnimationFrame(animate);
}


// Cubic easing out function (you can add this to your script.js)
function easeOutCubic(t) {
    return (--t) * t * t * 1 + 1;
}


function determineWinner() {
    let totalNames = names.length;
    let angle = 360 / totalNames;
    let winningIndex = Math.floor((360 - (currentAngle % 360)) / angle);

    if (winningIndex < 0) {
        winningIndex = totalNames - 1;
    }
    let winner = names[winningIndex];
    document.getElementById('winner').textContent = "The winner is: " + winner;

    // Rotate the arrow
    let arrow = document.getElementById('arrow');
    arrow.style.transform = `translateX(-50%) rotate(${(360 - (currentAngle % 360)) + (angle/2)}deg)`; //Adjusted to point to the name
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        addName();
    }
}
