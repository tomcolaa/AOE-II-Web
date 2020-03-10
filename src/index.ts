import './index.css'
import Game from './classes/Game.ts';
import EventManager from './classes/EventManager.ts';
import MapManager from './classes/MapManager.ts';
import AssetManager from './classes/AssetManager.ts';
import TileMap from './classes/TileMap.ts';
import MiniMap from './classes/MiniMap.ts';
import DirtImage from './assets/dirt.png';
import GrasImage from './assets/gras.png';

const assets: Image = [
  {'name': 'dirt', 'image': DirtImage},
  {'name': 'gras', 'image': GrasImage}
];
const TILES = 8;
const TILE_SIZE = 50;
const MAP_ZOOM = 1;
const MINIMAP_SIZE = 200;

window.onload = () => {

  //Initialize Objects
  let game: Game = new Game();
  let eventManager: EventManager = new EventManager();
  let mapManager: MapManager = new MapManager();
  let assetManager: AssetManager = new AssetManager();
  let tileMap: TileMap = new TileMap();
  let miniMap: MiniMap = new MiniMap();

  //Register communication
  game.register(eventManager);
  game.register(mapManager);
  game.register(assetManager);

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

    //Start the game
    game.start();

  });
}
