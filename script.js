let names = [];
let colors = [];
let canvas = document.getElementById('wheel');
let ctx = canvas.getContext('2d');
let currentAngle = 0;
let spinning = false; // Keep track of spinning state

function addName() {
    let name = document.getElementById('nameInput').value;
    if (name.trim() !== "") {
        names.push(name);
        document.getElementById('nameList').innerHTML = names.join("<br>");
        document.getElementById('nameInput').value = "";

        let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
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

        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let midAngle = (startAngle + endAngle) / 2;
        ctx.fillText(names[i], canvas.width / 2 + Math.cos(midAngle) * canvas.width / 3, canvas.height / 2 + Math.sin(midAngle) * canvas.height / 3);
    }
}

function spinWheel() {
  if (names.length === 0 || spinning) return; // Don't spin if no names or already spinning

  spinning = true;
  let spinDuration = 3000; // 3 seconds spin duration
  let targetSpin = Math.floor(Math.random() * 3600) + 720; // Random rotations + a few extra

  let startTime = null;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    let progress = Math.min((currentTime - startTime) / spinDuration, 1);

    currentAngle = targetSpin * progress;
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


function determineWinner() {
    let totalNames = names.length;
    let angle = 360 / totalNames;
    let winningIndex = Math.floor((360 - (currentAngle % 360)) / angle); // Calculate winning index
  
    if (winningIndex < 0) {
      winningIndex = totalNames -1;
    }
    let winner = names[winningIndex];
    document.getElementById('winner').textContent = "The winner is: " + winner;
}
