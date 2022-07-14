import kaboom, {GameObj} from "kaboom";
import { useState, useEffect } from "react";

const DinoRun = () => {
  const [canvasRef, setCanvasRef] = useState();

    useEffect(() => {
      const k = kaboom({
        //if you don't want to import to the global namespace
        global: false,
        //if you don't want kaboom to create a canvas and insert under document.body
        canvas: canvasRef,
        scale: 2,

    });

            document.addEventListener('DOMContentLoaded', () => {
            const dino: HTMLElement | null = document.querySelector('.dino')
            const grid: HTMLElement | null = document.querySelector('.grid')
            const body: HTMLElement | null = document.querySelector('body')
            const alert: HTMLElement | null = document.getElementById('alert')
            let isJumping: boolean = false
            let gravity: number = 0.9
            let isGameOver: boolean = false
            
            function control(e:KeyboardEvent) {
              if (e.code === "32") {
                if (!isJumping) {
                  isJumping = true
                  jump()
                }
              }
            }
            document.addEventListener('keyup', control)
            
            let position: number = 0
            
            function jump() {
              let count: number = 0
              let timerId: NodeJS.Timer = setInterval(function () {
                //move down
                if (count === 15) {
                  clearInterval(timerId)
                  let downTimerId = setInterval(function () {
                    if (count === 0) {
                      clearInterval(downTimerId)
                      isJumping = false
                    }
                    position -= 5
                    count--
                    position = position * gravity
                    dino.style.bottom = position + 'px'
                  },20)
            
                }
                //move up
                position +=30
                count++
                position = position * gravity
                dino.style.bottom = position + 'px'
              },20)
            }
            
            function generateObstacles() {
              let randomTime = Math.random() * 4000
              let obstaclePosition = 1000
              const obstacle = document.createElement('div')
              if (!isGameOver) obstacle.classList.add('obstacle')
              grid.appendChild(obstacle)
              obstacle.style.left = obstaclePosition + 'px'
            
              let timerId = setInterval(function() {
                if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                  clearInterval(timerId)
                  alert.innerHTML = 'Game Over'
                  isGameOver = true
                  //remove all children
                  body.removeChild(body.firstChild)
                  while (grid.firstChild) {
                    grid.removeChild(grid.lastChild)
                  }
                  
                }
                obstaclePosition -=10
                obstacle.style.left = obstaclePosition + 'px'
              },20)
              if (!isGameOver) setTimeout(generateObstacles, randomTime)
            }
            generateObstacles()
            })


    }, []);

    return <div className="board"><canvas ref={canvasRef}></canvas></div>
};

export default DinoRun;