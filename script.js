import { updateBird, setupBird, isInFrame, hitObstacle } from "./bird.js"

document.addEventListener("keypress", handleStart, { once: true })
const title = document.getElementById("title")
const subtitle = document.getElementById("subtitle")

let lastTime

function checkLose() {
  if(isInFrame() == false || hitObstacle() == true) {
    return true
  } 
  return false
}

function updateLoop(time) {
  if(lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(updateLoop)
    return
  }
  const delta = time - lastTime
  updateBird(delta)
  if(checkLose()) {
    return handleLose()
  }
  lastTime = time
  window.requestAnimationFrame(updateLoop)
}

function handleStart() {
  title.classList.add("hidden")
  setupBird()
  lastTime = null
  window.requestAnimationFrame(updateLoop)
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove("hidden")
    subtitle.classList.remove("hidden")
    subtitle.textContent = "0 pipes"
    document.addEventListener("keypress", handleStart, { once: true })
  })
}