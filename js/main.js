///// SERVICE WORKER /////
window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js');
    }
}
//////////////////////////

///// BEFORE INSTALL PROMPT /////
// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

const showInstallButton = () => {
    document.getElementById("installButton").addEventListener("click", async () => {
        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        // Optionally, send analytics event with outcome of user choice
        if (outcome === "accepted") {
            let thanks = document.getElementById("message");
            thanks.innerHTML = "Thank you for installing my app!";
        }
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
    });   
}

window.addEventListener('beforeinstallprompt', (e) => {
//     // Prevent the mini-infobar from appearing on mobile
//     e.preventDefault();

    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    // creating install button
    console.log("beforeinstallprompt detected");
    console.log(deferredPrompt);
    showInstallButton();
});
/////////////////////////////////

const arabianInput = document.getElementById("arabianInput");
const romanInput = document.getElementById("romanInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.lineCap = "round";

const unit = [102.5,2.5];
const ten = [2.5,2.5];
const hundred = [102.5,202.5];
const thousand = [2.5,202.5];

const base = {
    points: [{
        x: 0,
        y: 0
    }, {
        x: 0,
        y: 300
    }]
}

const one = {
    points: [{
        x: 0,
        y: 0
    }, {
        x: 100,
        y: 0
    }]
}
const two = {
    points: [{
        x: 0,
        y: 100
    }, {
        x: 100,
        y: 100
    }]
}
const three = {
    points: [{
        x: 0,
        y: 0
    }, {
        x: 100,
        y: 100
    }]
}
const four = {
    points: [{
        x: 0,
        y: 100
    }, {
        x: 100,
        y: 0
    }]
}
const five = {
    points: [{
        x: 0,
        y: 0
    }, {
        x: 100,
        y: 0
    }, {
        x: 0,
        y: 100
    }]
}
const six = {
    points: [{
        x: 100,
        y: 0
    }, {
        x: 100,
        y: 100
    }]
}
const seven = {
    points: [{
        x: 0,
        y: 0
    }, {
        x: 100,
        y: 0
    }, {
        x: 100,
        y: 100
    }]
}
const eight = {
    points: [{
        x: 0,
        y: 100
    }, {
        x: 100,
        y: 100
    }, {
        x: 100,
        y: 0
    }]
}
const nine = {
    points: [{
        x: 0,
        y: 0
    }, {
        x: 100,
        y: 0
    }, {
        x: 100,
        y: 100
    }, {
        x: 0,
        y: 100
    }]
}



// function to display a shape on the canvas
function draw(number, place) {
    let points = number.points;
    ctx.beginPath();

    if (place === ten) {
        ctx.moveTo((points[0].x === 0 ? 100 : 0) + place[0], points[0].y + place[1]);

        points.forEach(point => {
            ctx.lineTo(((point.x === 0 ? 100 : 0) + place[0]), (point.y + place[1]));
        });
    } else if (place === hundred) {
        ctx.moveTo(points[0].x + place[0], (points[0].y === 0 ? 100 : 0) + place[1]);

        points.forEach(point => {
            ctx.lineTo((point.x + place[0]), ((point.y === 0 ? 100 : 0) + place[1]));
        });
    } else if (place === thousand) {
        ctx.moveTo((points[0].x === 0 ? 100 : 0) + place[0], (points[0].y === 0 ? 100 : 0) + place[1]);

        points.forEach(point => {
            ctx.lineTo(((point.x === 0 ? 100 : 0) + place[0]), ((point.y === 0 ? 100 : 0) + place[1]));
        });
    } else {
        ctx.moveTo(points[0].x + place[0], points[0].y + place[1]);

        points.forEach(point => {
            ctx.lineTo((point.x + place[0]), (point.y + place[1]));
        });
    }

    ctx.stroke();
}

// display the triangle and parallelogram
draw(base, unit);


///// EVENTLISTENER FOR CISTERCIEN INPUT /////
const number = ["",one,two,three,four,five,six,seven,eight,nine];
let unitCount = 0;
let tenCount = 0;
let hundredCount = 0;
let thousandCount = 0;

document.getElementById("unit").addEventListener("click", () => {
    if (unitCount == 9) {
        unitCount = 0;
    } else {
        unitCount++;
    }
    updateCanvas();
});

document.getElementById("ten").addEventListener("click", () => {
    if (tenCount == 9) {
        tenCount = 0;
    } else {
        tenCount++;
    }
    updateCanvas();
});

document.getElementById("hundred").addEventListener("click", () => {
    if (hundredCount == 9) {
        hundredCount = 0;
    } else {
        hundredCount++;
    }
    updateCanvas();
});

document.getElementById("thousand").addEventListener("click", () => {
    if (thousandCount == 9) {
        thousandCount = 0;
    } else {
        thousandCount++;
    }
    updateCanvas();
});

const updateCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(base, unit);

    if (unitCount != 0) draw(number[unitCount], unit);
    if (tenCount != 0) draw(number[tenCount], ten);
    if (hundredCount != 0) draw(number[hundredCount], hundred);
    if (thousandCount != 0) draw(number[thousandCount], thousand);

    let result = unitCount+(tenCount*10)+(hundredCount*100)+(thousandCount*1000);
    arabianInput.value = result;
    numberToRoman(result);
}

const decompose = (number) => {
    let value = number.toString();
    let decomposedValue = [];

    for (let i = 0; i < value.length; i++) {
        decomposedValue.push(parseInt(value[i]));
    }

    return decomposedValue;
}

///// EVENTLISTENER FOR ARABIAN INPUT /////

arabianInput.addEventListener("change", () => {
    let arabianValue = arabianInput.value;
    let invertedValue = decompose(arabianValue).reverse();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(base, unit);

    if (invertedValue[0] && invertedValue[0] != 0) {
        draw(number[invertedValue[0]], unit);
        unitCount = invertedValue[0];
    } else { unitCount = 0}
    if (invertedValue[1] && invertedValue[1] != 0) {
        draw(number[invertedValue[1]], ten);
        tenCount = invertedValue[1];
    } else { tenCount = 0}
    if (invertedValue[2] && invertedValue[2] != 0) {
        draw(number[invertedValue[2]], hundred);
        hundredCount = invertedValue[2];
    } else { hundredCount = 0}
    if (invertedValue[3] && invertedValue[3] != 0) {
        draw(number[invertedValue[3]], thousand);
        thousandCount = invertedValue[3];
    } else { thousandCount = 0}

    numberToRoman(arabianValue);
});

///// EVENTLISTENER FOR ROMAN INPUT /////
const numberToRoman = (number) => {
    let decomposedValue = decompose(number).reverse();
    let romanNumber = "";
    let romanNumberThousand ="";

    ///// ROMAN THOUSAND /////
    switch (decomposedValue[3]) {
        case 0:
        case 1:
        case 2:
        case 3:
            for (let i = 0; i < decomposedValue[3]; i++) {
                romanNumber = romanNumber+"M";
            }
            break;
        case 4:
            romanNumberThousand = romanNumberThousand+"IV";
            break;
        case 5:
            romanNumberThousand = romanNumberThousand+"V";
            break;
        case 6:
        case 7:
        case 8:
            romanNumberThousand = romanNumberThousand+"V";
            for (let i = 5; i < decomposedValue[3]; i++) {
                romanNumberThousand = romanNumberThousand+"I";
            }
            break;
        case 9:
            romanNumberThousand = romanNumberThousand+"IX";
            break;
    }

    ///// ROMAN HUNDRED /////
    switch (decomposedValue[2]) {
        case 0:
        case 1:
        case 2:
        case 3:
            for (let i = 0; i < decomposedValue[2]; i++) {
                romanNumber = romanNumber+"C";
            }
            break;
        case 4:
            romanNumber = romanNumber+"CD";
            break;
        case 5:
            romanNumber = romanNumber+"D";
            break;
        case 6:
        case 7:
        case 8:
            romanNumber = romanNumber+"D";
            for (let i = 5; i < decomposedValue[2]; i++) {
                romanNumber = romanNumber+"C";
            }
            break;
        case 9:
            romanNumber = romanNumber+"CM";
            break;
    }

    ///// ROMAN TEN /////
    switch (decomposedValue[1]) {
        case 0:
        case 1:
        case 2:
        case 3:
            for (let i = 0; i < decomposedValue[1]; i++) {
                romanNumber = romanNumber+"X";
            }
            break;
        case 4:
            romanNumber = romanNumber+"XL";
            break;
        case 5:
            romanNumber = romanNumber+"L";
            break;
        case 6:
        case 7:
        case 8:
            romanNumber = romanNumber+"L";
            for (let i = 5; i < decomposedValue[1]; i++) {
                romanNumber = romanNumber+"X";
            }
            break;
        case 9:
            romanNumber = romanNumber+"XC";
            break;
    }

    ///// ROMAN UNIT /////
    switch (decomposedValue[0]) {
        case 0:
        case 1:
        case 2:
        case 3:
            for (let i = 0; i < decomposedValue[0]; i++) {
                romanNumber = romanNumber+"I";
            }
            break;
        case 4:
            romanNumber = romanNumber+"IV";
            break;
        case 5:
            romanNumber = romanNumber+"V";
            break;
        case 6:
        case 7:
        case 8:
            romanNumber = romanNumber+"V";
            for (let i = 5; i < decomposedValue[0]; i++) {
                romanNumber = romanNumber+"I";
            }
            break;
        case 9:
            romanNumber = romanNumber+"IX";
            break;
    }

    romanInput.innerHTML = "";

    let romanThousand = document.createElement("span");
    romanThousand.className = "romanInputThousand";
    romanThousand.innerHTML = romanNumberThousand;
    romanInput.appendChild(romanThousand);
    let romanRest = document.createElement("span");
    romanRest.innerHTML = romanNumber;
    romanInput.appendChild(romanRest);
}
