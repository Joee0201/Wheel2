let names = [];
let colors = [];
let canvas = document.getElementById('wheel');
let ctx = canvas.getContext('2d');
let currentAngle = 0;

function addName() {
    let name = document.getElementById('nameInput').value;
    if (name.trim() !== "") {
        names.push(name);
        document.getElementById('nameList').innerHTML = names.join("<br>");
        document.getElementById('nameInput').value = ""; // Clear input

        // Generate a random color
        let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        colors.push(randomColor);
        drawWheel();
    }
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
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

        // Add name labels (simplified for now)
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let midAngle = (startAngle + endAngle) / 2;
        ctx.fillText(names[i], canvas.width/2 + Math.cos(midAngle) * canvas.width/3, canvas.height/2 + Math.sin(midAngle) * canvas.height/3 );
    }
}

function spinWheel() {
  // In a future step, we will add the spin functionality here.
  // For now, let's just alert a placeholder.
  alert("Wheel spinning (functionality to be added)");
}