const playButton = document.getElementById("playButton");
const count = document.getElementById("count");
const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.id = "resetButton";
resetButton.style.display = "none";

function jump(event) {
  if (event.keyCode === 32) {
    // 32 is the keyCode for the spacebar
    if (dino.classList != "jump") {
      dino.classList.add("jump");
      // Fix: Use proper assignment and parseInt
      count.innerHTML = parseInt(count.innerHTML) + 1;
      setTimeout(function () {
        dino.classList.remove("jump");
      }, 300);
    }
  }
}

function startGame() {
  playButton.style.display = "none";
  cactus.style.animation = "cactus-block 1.2s infinite linear";
  document.addEventListener("keydown", jump);
  checkAlive = setInterval(function () {
    let dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );
    let cactusLeft = parseInt(
      window.getComputedStyle(cactus).getPropertyValue("left")
    );
    //check for collision
    if (cactusLeft > 0 && cactusLeft < 70 && dinoTop >= 143) {
      dino.style.animationPlayState = "paused";
      cactus.style.animationPlayState = "paused";
      document.removeEventListener("keydown", jump);
      // alert("Whoops! Game Over :(");
      resetButton.style.display = "block";
      document.querySelector(".game").appendChild(resetButton);
      clearInterval(checkAlive);
    }
  }, 10);
}

function resetGame() {
  dino.style.animationPlayState = "running";
  cactus.style.animationPlayState = "running";
  cactus.style.left = "580px";
  count.innerHTML = "0";
  resetButton.style.display = "none";
  cactus.style.animation = "none";
  cactus.offsetHeight; // Trigger reflow
  cactus.style.animation = null;
  cactus.style.left = "580px";
  startGame();
}

playButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
