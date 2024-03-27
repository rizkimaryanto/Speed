# Repository Documentation

This is a [vite](https://vitejs.dev/) project bootstrapped with `npm create vite@latest`.

This app is heavily depends on JS module and JS ES6.

Run `npm install` to install all depedencies.

## Run app

to run app with development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173/) with your browser to see the result.

## Initializing game scene

Make a new folder inside script (e.g scene) to group all game object. I use scene because it's smiliar to Unity engine folder structures (scene based game object).

You may use any folder structure as you will.

```bash
/
├── ...
├── script/
│   ├── scene/
│   └── main.js
└── ...
```

Inside the scene, there we place all game object like player, background, bot, enemy, etc.

Before making any game scene, it's best to make one main scene to control all other scene. I'll be using `startScene.js` as my main scene.

```javascript
export class StartScene {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    //init other properties
  }
  draw() {
    //draw other scene
  }
  update() {
    //watch for update on other scene
  }
  // OTHER METHODS OMITTED FOR SIMPLICITY
}

```

`startScene.js` act like a container of the game. Any game object will be initialized inside it.

## Game scene

After we're done with main scene, we can make other game object by making another game scene. I'll demonstrate with `spriteScene.js` as an example. file naming is up to you but I personally like to stick with one naming convention to reduce confusion and more meaningful names.

Before we dive in to the actual code, we must know what main component in game scene. Usually there are two main method; `draw()` and `update()`. Which I will explain shortly.

### `draw()`

`draw()` is a method that tells the scene what to draw inside the canvas. They include X and Y of the canvas location as to where draw and what object to draw.

Here is a demo use of `draw()` method to draw a red rectangle.

```javascript
class GameScene{
//...

  draw() {
    this.game.ctx.save(); // save canvas context to keep current canvas's condition (rotate, translate, etc.)
    this.game.ctx.fillStyle = "red"; // change attribute of canvas's context fillStyle to the desired color
    this.game.ctx.fillRect(/* x value */ 20, /* y value */ 15, /* width */ 10, /* height*/ 10); // create a 10x10 red cube at (20, 15)
    this.game.ctx.restore(); // restore the canvas context to saved state
  }

//...
}
```

### `update()`

what is `update()`? We may already have a method that keeps drawing itslef, but what about updating current condition like moving, hit, and jump? That's where `update()` take control. You actually can use just one method but it's more convenient this way. These method is separated by its usage; one for drawing and other for updating conditions.

Demo of `update()` to constantly increment the `x` prop of a class. Thus, making the object drawn always move.

```javascript
class GameScene{
  constructor() {
    this.speed = 1;
    this.x = 1;
    this.y = 10;
  }

  //...

  update() {
    this.move(); // always do move per frame
  }

 /**
  * Moves the sprite by its speed.
  */
  move() {
    this.x += this.speed;
  }

  //...
}
```

In the example above, the game object is moving 1px per frame as defined. The `x` property then used by `draw()` method as the `x` parameter. Making the `draw()` always draw horizontally 1px more than the previous position.

Another thing that I usually do is move every sub-function of the update condition into its own method. That way, the code will be easier to read, maintain, and debug. Just as I did with `move()`.

### `constructor()`

`constructor()` will always be executed firstly, initializing all props inside it. In JsCanvas, constructor have a big role in terms of connecting the scene to one another. Making them able to "communicate" their current state.

Mainly, `constructor()` is used to pass the game itself. By doing so, any child class will have the parent instance (main scene).

Here is an example of making two class able to access each other props by passing the game to the `constructor()`.

```javascript
class ExampleParent{
  constructor(){
    this.positionClass = new PositionClass(this)
    this.childClassOne = new ChildClassOne(this)
  }
}

class ChildClassOne{
  constructor(game){
    this.game = game
    this.x = this.game.positionClass.x //<-- this will get 10 as value, from Position class `x` prop
  }
}

class PositionClass{
  constructor(game){
    this.game = game
    this.x = 10
    this.y = 10
  }
}
```

By utilizing `constructor()` this way, it is possible to pass properties from siblings to siblings through parent class. An example usage of this: object intersection, object collision, player lifes, and many more.
