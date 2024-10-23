let timer;
let isRunning = false;
let timeRemaining = 900; // 15 minutes in seconds for Interval mode
let elapsedTime = 0; // To track time for Focus Time mode

const timerDisplay = document.getElementById("timerDisplay");
const playStopButton = document.getElementById("playStopButton");
const resetButton = document.getElementById("resetButton");
const timerOptions = document.getElementsByName("selector");

// Set initial button text to Play (▶) when the page loads
playStopButton.textContent = "\u25B6"; // Play button (▶)
resetButton.textContent = "\u21BA";

let mode = "interval"; // Default mode is Interval (15 minutes)

// Function to update the display
function updateTimerDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

// Get the audio element
const alarmSound = document.getElementById("alarmSound");
const activateSound = document.getElementById("activateSound");
const toggleSound = document.getElementById("toggleSound");
const resetSound = document.getElementById("resetSound");

function playToggle() {
  toggleSound.play();
}
function playReset() {
  resetSound.play();
}

function startTimer() {
  isRunning = true;
  playStopButton.textContent = "\u23F9"; // Change to Stop button (⏹)
  resetButton.disabled = false; // Enable the reset button

  const selectedMode = [...timerOptions].find((option) => option.checked).value;

  if (selectedMode === "interval") {
    mode = "interval";
    timeRemaining = 15 * 60; // Set timer to 15 minutes in seconds
    timer = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);
      } else {
        stopTimer();
        alarmSound.play(); // Play the alarm sound when timer hits zero
      }
    }, 1000);
  } else if (selectedMode === "focus") {
    mode = "focus";
    timer = setInterval(() => {
      elapsedTime++;
      updateTimerDisplay(elapsedTime);
    }, 1000);
  }
}

function stopTimer() {
  isRunning = false;
  playStopButton.textContent = "\u25B6"; // Change to Play button (▶)
  clearInterval(timer);
  if (mode === "focus") {
    alert(
      `Focus Time: You worked for ${Math.floor(elapsedTime / 60)} minutes and ${
        elapsedTime % 60
      } seconds.`
    );
  }
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  playStopButton.textContent = "\u25B6"; // Play button (▶)
  resetButton.disabled = true; // Disable reset button when reset is clicked

  // Reset display based on selected mode
  if (mode === "interval") {
    timeRemaining = 900; // Reset to 15 minutes for Interval
    updateTimerDisplay(timeRemaining);
  } else if (mode === "focus") {
    elapsedTime = 0; // Reset to 0 for Focus Time
    updateTimerDisplay(elapsedTime);
  }
}

// Update display based on mode change
function handleModeChange() {
  const selectedMode = [...timerOptions].find((option) => option.checked).value;
  console.log(selectedMode);
  if (selectedMode === "interval") {
    mode = "interval";
    timeRemaining = 900; // 15 minutes for Interval mode
    updateTimerDisplay(timeRemaining); // Display 15:00 when switching to Interval
  } else if (selectedMode === "focus") {
    mode = "focus";
    elapsedTime = 0; // Reset to 0 for Focus Time mode
    updateTimerDisplay(elapsedTime); // Display 00:00 when switching to Focus Time
  }
}

// Add event listeners to the radio buttons to update display on mode switch
timerOptions.forEach((option) => {
  option.addEventListener("change", handleModeChange);
});

// Button click handler for play/stop
playStopButton.addEventListener("click", () => {
  activateSound.play();
});
playStopButton.addEventListener("click", () => {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
});

// Button click handler for reset
resetButton.addEventListener("click", resetTimer);

// Initialize display (start with Interval time)
updateTimerDisplay(900);
