var hourlyRate;
var mainDisplay = document.getElementById("main-display");
var startButton = document.getElementById("main-input").elements.namedItem("start-button")
var currentMoneyValue = 0;
var activeIncrementTime;

var clockProcess;
var clockRunning = false;

function checkInput(input){
    if (isNaN(input)){
        return 0.00;
    }
    return input;
}

function updateDisplay(valueInPennies){
    mainDisplay.textContent = (valueInPennies/100).toFixed(2);
}

function runClockMain(){
    currentMoneyValue += 1;
    updateDisplay(currentMoneyValue);
}

function initClock(input){
    //new, time based code
    var penniesPerMinute = input/60
    activeIncrementTime = 60000 / penniesPerMinute;
    //old, fixed interval code
    //var output = ((input/60)/60)/incrementsPerSecond
    //activeIncrementTime = 1000 / incrementsPerSecond;
    //activeIncrementValue = output;
    clockRunning = true;
    clockProcess = setInterval(runClockMain, activeIncrementTime);
}

function startPressed(){
    if(!clockRunning){
        hourlyRate = (parseFloat(document.getElementById("main-input").elements.namedItem("hourly-rate").value).toFixed(2)*100);
        hourlyRate = checkInput(hourlyRate);
        startButton.value = "Stop";
        initClock(hourlyRate);
    } else {
        clockRunning = false;
        startButton.value = "Start";
        clearInterval(clockProcess);
    }
}

function resetPressed(){
    currentMoneyValue = 0;
    updateDisplay(currentMoneyValue);
    if(clockRunning){
        clearInterval(clockProcess);
        clockRunning = false;
    }
    startButton.value = "Start";
}