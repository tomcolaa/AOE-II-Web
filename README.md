# Age of Empires II - Web Edition
This is going to be a recreation of [Age of Empires 2](https://www.ageofempires.com/) using [pixie.js](https://www.pixijs.com/) written mostly in TypeScript. This project is in a very early stage and most parts of the game are not realized yet like map / terrain generation, building placement system, depth sorting and path finding. This very early version includes a showcase of a simple 16 x 16 tilemap and some graphics, unit selection and the debugging interface.
<br><br>
**Table of Contents**
<br>
<a href="#demo">Demo</a>
<br>
<a href="#install">How to install</a>
<br>
<a href="#use">How to use</a>

<div id="demo"></div>

## Demo
Follow the "How to install" instructions to get your own development version.
1. Unit selection: Click and drag your mouse over a unit to select it. Then use WASD to move it around.
	![Unit selection](https://i.ibb.co/wwqr1YK/s1.png)

2. Unit placement: Hold the `p` key on your keyboard and click on the screen to place a new unit at this position.
3. Debugging interface: Click the button to toggle the debugging interface.
	![enter image description here](https://i.ibb.co/hRrdF9s/s2.png)

<div id="install"></div>

## How to install
To install this repository you require `npm`, `git` and `TypeScript` installed on your machine.
1. Clone repository
	```shell
	$ git clone https://github.com/tomcolaa/AOE-II-Web.git
	```

2. Run install
	```shell
	$ npm install
	```

3. Start development server
	```shell
	$ npm start
	```

This will start a development server on port 8080 if available and it will open a brwoser window with the url `http://localhost:8080/`

<div id="use"></div>

## How to use
The game is build on a game instance and managers which manage things like events, the map, assets and other things.

To use managers you first need to create an instance of them and then register them via the game instance.

```typescript
let game: Game = new Game();
let eventManager: EventManager = new EventManager();
let mapManager: MapManager = new MapManager();

game.register(eventManager);
game.register(mapManager);
```

### Loading assets
To load assets into the game you can use the AssetManager and the included loadAssets function. This returns a promise which can be used to proceed after a loading screen.
```typescript
import Castle4 from './assets/Castle4.png';

const assets: Image = [
  {name: 'gras', image: GrasImage},
  //more assets go here
];

let assetManager: AssetManager = new AssetManager();
game.register(assetManager);

assetManager.loadAssets(assets).then(() => {
	//Continue here
}
```

### Creating a TileMap
You can easily create a new TileMap using the built in class and then add it to the game via the MapManager.
```typescript
let tileMap: TileMap = new TileMap();
tileMap.tiles = 16;
tileMap.tileSize = 128;
tileMap.textures = assetManager.getMapTextures();
mapManager.addMap(tileMap, "center", true);
```

### Adding GameObjects
Every object in the game extends the GameObject class. Therefore you can easily add units and buildings via the ObjectManager.
```typescript
let objectManager: ObjectManager = new ObjectManager();
game.register(objectManager);

let unit = new Unit();
unit.position = new Vector2(200, 200);
unit.texture = assetManager.getUnitTexture();
objectManager.addObject(unit);
```

### Starting the game
Finally you have to call the start function of the Game instance to start the gameloop which will automatically update all registered managers.
```typescript
game.start();
```
