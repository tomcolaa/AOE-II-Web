import './index.css'
import Game from './classes/Game.ts';
import EventManager from './classes/EventManager.ts';
import MapManager from './classes/MapManager.ts';
import AssetManager from './classes/AssetManager.ts';
import ObjectManager from './classes/ObjectManager.ts';
import TileMap from './classes/TileMap.ts';
import MiniMap from './classes/MiniMap.ts';
import Unit from './classes/Unit.ts';
import Building from './classes/Building.ts';
import Vector2 from './classes/Vector2.ts';
import GrasImage from './assets/gras1_hd.png';
import AxeImage from './assets/axe.png';
import Castle4 from './assets/Castle4.png';
import ArcheryRange from './assets/Archeryrange1.png';
import Barracks1 from './assets/Barracks1.png';
import Barracks5 from './assets/Barracks5.png';
import House11 from './assets/House11.png';
import Market1 from './assets/Market1.png';
import * as PIXI from 'pixi.js';

// Enable debugging
// Used only for debbuging purposes
// Please remove for production
PIXI.useDeprecated();
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
/* End of debugging */

const assets: Image = [
  {name: 'gras', image: GrasImage},
  {name: 'axe', image: AxeImage},
  {name: 'archeryRange', image: ArcheryRange},
  {name: 'castle4', image: Castle4},
  {name: 'barracks1', image: Barracks1},
  {name: 'barracks5', image: Barracks5},
  {name: 'house11', image: House11},
  {name: 'market1', image: Market1}
];
const TILES = 16;
const TILE_SIZE = 69;
const MAP_ZOOM = 1;
const MINIMAP_SIZE = 200;

window.onload = () => {

  //Initialize Objects
  let game: Game = new Game();
  let eventManager: EventManager = new EventManager();
  let mapManager: MapManager = new MapManager();
  let assetManager: AssetManager = new AssetManager();
  let objectManager: ObjectManager = new ObjectManager();
  let tileMap: TileMap = new TileMap();
  let miniMap: MiniMap = new MiniMap();

  //Register communication
  //Access managers via game object and getObserver(n)
  game.register(eventManager);
  game.register(mapManager);
  game.register(assetManager);
  game.register(objectManager);

  //Load assets
  assetManager.loadAssets(assets).then(() => {

    //Configure tilemap
    tileMap.tiles = TILES;
    tileMap.tileSize = TILE_SIZE;
    tileMap.debug = true;
    tileMap.textures = assetManager.getMapTextures();
    //Configure minimap
    miniMap.size = MINIMAP_SIZE;
    miniMap.bgColor = 0x007F0E;
    //Set zoom of map via manager
    mapManager.zoom = MAP_ZOOM;

    //Add maps to map manager
    mapManager.addMap(tileMap, "center", true);
    mapManager.addMap(miniMap, "bottomRight", false);
    mapManager.renderMaps();

    //Configure object container to have the same position as the map
    objectManager.objectContainer.position.set(
      tileMap.tileMapContainer.position.x,
      tileMap.tileMapContainer.position.y
    );
    objectManager.renderObjects();

    //Add test unit
    let unit = new Unit();
    unit.position = new Vector2(200, 200);
    unit.texture = assetManager.getUnitTexture();
    objectManager.addObject(unit);
    let unit2 = new Unit();
    unit2.position = new Vector2(100, 500);
    unit2.texture = assetManager.getUnitTexture();
    //unit2.debug = true;
    objectManager.addObject(unit2);
    let house = new Building();
    house.position = new Vector2(605, 605);
    house.texture = assetManager.getBuildingTexture();
    //house.debug = true;
    objectManager.addObject(house);

    //Start the game
    game.start();

    //UI
    let button = document.createElement("button");
    button.style.position = "fixed";
    button.style.left = "25px";
    button.style.top = "10px";
    button.style.zIndex = "5";
    button.innerHTML = "Toggle debug"
    button.addEventListener("click", e => {
      game.debug = !game.debug;
      console.log("Game debug set to: " + game.debug);
    });
    document.body.append(button);

  });
}
