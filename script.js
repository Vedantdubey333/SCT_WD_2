// Get DOM elements
const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('lapsList');

// Stopwatch state variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;

// Format time function
function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
}

// Update the display
function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start function
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // Resume from where it was paused
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        
        startButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';
    }
}

// Pause function
function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;

        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
    }
}

// Reset function
function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    startTime = 0;
    timeDisplay.textContent = "00:00:00.00";
    lapsList.innerHTML = "";
    lapCounter = 1;

    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
}

// Lap function
function lap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>Lap ${lapCounter}</span><span>${lapTime}</span>`;
        lapsList.appendChild(listItem);
        lapCounter++;
        lapsList.scrollTop = lapsList.scrollHeight; // Auto-scroll to the latest lap
    }
}

// Event Listeners
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);