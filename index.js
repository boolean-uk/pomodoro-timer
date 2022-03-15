// change icon on clicking the button
// start the counter.

// setup
const controlBtn = document.querySelector(".control-btn")
const workTimer = document.querySelector("#workTimer")
const breakTimer = document.querySelector("#breakTimer")
const addTimeBtn = document.querySelector("#addTimeBtn")
const circle = document.querySelector("#circleTimer")
const needle = document.querySelector(".needle")
const workSeconds = 3
const breakSeconds = 3
const radius = 50;
const increment = 60

let isPaused, timerInterval, currentSeconds, currentTimer, isWorkPhase

// initialize
isPaused = true
isWorkPhase = true
currentSeconds = workSeconds
currentTimer = workTimer
currentTotal = workSeconds
updateTimer(workTimer, workSeconds)
updateTimer(breakTimer, breakSeconds)


function updateTimer(timer, totalSeconds) {
  const minutes = Math.floor(totalSeconds/60)
  const seconds = totalSeconds % 60
  const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`
  timer.textContent = `${minutes}:${formattedSeconds}`
}

const circumference = 2 * Math.PI * radius
circle.style.strokeDasharray = circumference
circle.style.strokeDashoffset = circumference

function setProgress(perc) {
  const offset = circumference - (perc / 100) * circumference
  const rotation = (perc / 100) * 360
  circle.style.strokeDashoffset = offset
  needle.style.transform = `rotate(${rotation}deg)`
}

function decrement() {
  if (isPaused) return
  // reduce time by 1
  currentSeconds--
  // update the timer on the page
  updateTimer(currentTimer, currentSeconds)
  // find percentage of time elapsed
  const percentage = Math.ceil(((currentTotal - currentSeconds) / currentTotal) * 100)
  // draw the amount of circle border needed.
  setProgress(percentage)

  if (currentSeconds === 0) {
    // reset interval
    clearInterval(timerInterval)
    // switch timer to break
    if (isWorkPhase) {
      isWorkPhase = false
      currentSeconds = breakSeconds
      currentTimer = breakTimer
      workTimer.classList.remove("timer--active")
      breakTimer.classList.add("timer--active")

      // change body style
      document.body.classList.add("break-phase")
      timerInterval = setInterval(decrement, 1000);
    } else {
      controlBtn.classList.remove('control-btn--pause');
      controlBtn.setAttribute('disabled', 'disabled');
      addTimeBtn.setAttribute('disabled', 'disabled');
    }
  }
}

controlBtn.addEventListener('click', () => {
  // change the icon play/pause
  isPaused = !isPaused
  controlBtn.classList.toggle('control-btn--pause', !isPaused)
  // start the timer
  if(!timerInterval) {
    timerInterval = setInterval(decrement, 1000)
  }
})


addTimeBtn.addEventListener('click', () => {
  // increase the currentSeconds
  currentSeconds += increment
  // increase the currentTotal
  currentTotal += increment

  // update the page
  updateTimer(currentTimer, currentSeconds)
})
