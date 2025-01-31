let names =[];
let colors =[];
let canvas = document.getElementById('wheel');
let ctx = canvas.getContext('2d');
let currentAngle = 0;
let spinning = false;
let spinCount = 0; // Counter for spin history

function addName() {
    let name = document.getElementById('nameInput').value;
    if (name.trim()!== "") {
        names.push(name);
        document.getElementById('nameList').innerHTML = names.join("<br>");
        document.getElementById('nameInput').value = "";

        let randomColor;
        do {
            randomColor = generateBrightColor(); // Use the new function
        } while (colors.includes(randomColor)); // Ensure unique colors

        colors.push(randomColor);
        drawWheel();
    }
}


function generateBrightColor() {
    let r, g, b;
    do {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    } while (r < 150 && g < 150 && b < 150); // Increased minimum to 150

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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


    // Update spin history
    spinCount++;
    let historyList = document.getElementById('historyList');
    let newEntry = document.createElement('li');
    newEntry.textContent = `${spinCount}. ${winner}`;
    historyList.appendChild(newEntry);
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        addName();
    }
}
