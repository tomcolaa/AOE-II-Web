import './index.css'
import Game from './classes/Game.ts';
import EventManager from './classes/EventManager.ts';
import MapManager from './classes/MapManager.ts';
import AssetManager from './classes/AssetManager.ts';
import ObjectManager from './classes/ObjectManager.ts';
import TileMap from './classes/TileMap.ts';
import MiniMap from './classes/MiniMap.ts';
import Unit from './classes/Unit.ts';
import Vector2 from './classes/Vector2.ts';
import GrasImage from './assets/gras_hd.png';
import AxeImage from './assets/axe.png';
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
  {name: 'axe', image: AxeImage}
];
const TILES = 6;
const TILE_SIZE = 128;
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
    var unit = new Unit();
    unit.position = new Vector2(200, 200);
    //unit.debug = true;
    unit.texture = assetManager.getUnitTexture();
    objectManager.addUnit(unit);

    //Start the game
    game.start();

  });
}
