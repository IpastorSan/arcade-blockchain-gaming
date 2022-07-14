import kaboom, {GameObj} from "kaboom";
import { useState, useEffect } from "react";

const DinoRun = () => {
  const [canvasRef, setCanvasRef] = useState();

  const FLOOR_HEIGHT:number = 48;
  const JUMP_FORCE:number = 800;
  const SPEED:number = 480;
  
  useEffect(() => {
    const k = kaboom({
      //if you don't want to import to the global namespace
      global: false,
      //if you don't want kaboom to create a canvas and insert under document.body
      canvas: canvasRef,
      scale: 2,

    })

    k.loadSprite("background", "../images/dino-run/t-rex-background.png")
    k.loadSprite("cacti", "../images/dino-run/cacti.png")
    k.loadSprite("t-rex", "../images/dino-run/t-rex.png")

    k.scene("game", () => {

      // define gravity
      k.gravity(2400);

      //Dinosaur
      const dino = k.add([
        k.sprite("t-rex"),
        k.pos(20, 50),
        k.body(),
        k.area()
      ])
      
      //Platform
      const platform = k.add([
        k.rect(k.width(), 48),
        k.pos(0, k.height() - 48),
        k.outline(0),
        k.area(),
        k.solid(),
        k.color(0, 0, 0),
    ])

    // add cacti
      const cacti = k.add([
      k.sprite("cacti"),
      k.area(),
      k.pos(k.width(), k.height() - 48),
      k.origin("botleft"),
      k.move(k.LEFT, 240),
      "cacti"
    ]);

    dino.onCollide("tree", () => {
      k.addKaboom(dino.pos);
      k.shake(10);
    });

    function jump() {
      if (dino.isGrounded()) {
          dino.jump(JUMP_FORCE);
      }
  }

    // jump when user press space
    k.onKeyPress("space", jump);
    k.onClick(jump);



    function spawnTree() {
      k.add([
          cacti
      ]);

    }

    k.wait(k.rand(0.5, 1.5), () => {
      spawnTree();
  });

    //spawnTree();

k.scene("game", () => {
  k.add([
      k.sprite("t-rex"),
  ])
})

// lose if player collides with any game obj with tag "tree"
dino.onCollide("tree", () => {
  // go to "lose" scene and pass the score
  k.go("lose", score);
  burp();
  k.addKaboom(dino.pos);
});

// keep track of score
let score:number = 0;

const scoreLabel = k.add([
  k.text(score.toString()),
  k.pos(24, 24),
]);

// increment score every frame
k.onUpdate(() => {
  score++;
  scoreLabel.text = score.toString();
});

});

k.scene("lose", (score) => {

k.add([
  k.sprite("bean"),
  pos(k.width() / 2, height() / 2 - 80),
  scale(2),
  k.origin("center"),
]);

// display score
k.add([
  text(score),
  pos(k.width() / 2, height() / 2 + 80),
  scale(2),
  k.origin("center"),
]);

// go back to game with space is pressed
onKeyPress("space", () => k.go("game"));
onClick(() => k.go("game"));

});

k.go("game");

  })
  return (

  <div className="board">
    <canvas ref={canvasRef}></canvas>
  </div>

  )
}


export default DinoRun;