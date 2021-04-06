const runner = document.querySelector('.runner img')
const runnerC = document.querySelector('.runner')
const cactus = document.querySelector('.cactus')
const startGame = document.querySelector('.start-game')
const cactusLose = document.querySelector('.cactusLose')

let gameActive = false
let seconds = 0
let minutes = 0

document.addEventListener('keyup', () => {
  startTheGame(startGame, runner, cactus, cactusLose)
})

function startTheGame(game, player, foe, cactusLose) {
  document.querySelector('.start-game h1').innerHTML = ''
  game.classList.add('remove')
  player.classList.add('show')
  foe.classList.add('show')
  cactusLose.classList.remove('show')
  gameActive = true
  return
}

function runnerJump() {
  if (!runner.classList.contains('jump')) {
    runner.classList.add('jump')
  }
  return
}

let checkCollide = setInterval(() => {
  if (gameActive) {
    let runnerTop = parseInt(
      window.getComputedStyle(runner).getPropertyValue('top')
    )
    let cactusLeft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue('left')
    )

    if (cactusLeft <= 180 && cactusLeft >= 160 && runnerTop >= 180) {
      gameLose()
    }
  }
}, 10)

function gameLose() {
  document.querySelector(
    '.start-game h1'
  ).innerHTML = `your time score is ${minutes}:${seconds} seconds!`
  startGame.classList.remove('remove')
  runner.classList.remove('show')
  cactus.classList.remove('show')
  cactusLose.classList.add('show')
  gameActive = false
  seconds = 0
  minutes = 0
  document.getElementById('seconds').innerText = `00`
  document.getElementById('minutes').innerText = `00`
  cactus.style.animationDuration = '2s'
  clearInterval(countTime, 1)
  return
}

let countTime = function counter() {
  if (gameActive) {
    seconds += 1
    document.getElementById('seconds').innerText =
      seconds >= 10 ? `${seconds}` : `0${seconds}`
    if (seconds >= 29) {
      cactus.style.animationDuration = '1.5s'
    }
    if (seconds >= 59) {
      seconds = 0
      minutes += 1
      document.getElementById('minutes').innerText =
        minutes >= 10 ? `${minutes}` : `0${minutes}`
      cactus.style.animationDuration = '1.2s'
    }
  }

  return
}

setInterval(countTime, 1000)

document.addEventListener('keydown', (event) => {
  const key = event.key

  if (gameActive) {
    if (key === 'ArrowUp') {
      runnerJump()
    }
  }

  setTimeout(() => runner.classList.remove('jump'), 1000)
})
