import Game from '../classes/Game';
import Observer from '../interfaces/Observer';
import TileMap from './TileMap';
import MiniMap from './MiniMap';
import Map from './Map';

export default class MapManager implements Observer {

  private _game: Game;
  private _map: Map;
  private _minimap: Map;
  private _zoom: number;

  public constructor(map?: Map, minimap?: Map, zoom?: number) {
    this._map = map || new TileMap();
    this._minimap = minimap || new MiniMap();
    this._zoom = zoom || 1;
  }

  get map(): Map {
    return this._map;
  }

  set map(map: Map) {
    this._map = map;
  }

  get minimap(): Map {
    return this._minimap;
  }

  set minimap(minimap: Map) {
    this._minimap = minimap;
  }

  get zoom(): number {
    return this._zoom;
  }

  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  /**
   * Interface functions
   */
  public registerGame(game: Game): void {
    this._game = game;
  }

  public sendUpdate(msg: string): void {
    this._game.receiveUpdate(msg);
  }

  public receiveUpdate(game: Game, delta: number, msg: string, param: any): void {
    //console.log("MapManager: Update received at " + delta);
    if(msg === "debug") this._map.debug = param;
  }

  /**
  * Add map function
  */
  public addMap(map: Map, position: string, zoomable: boolean): void {
    if(map.constructor.name === "MiniMap") {
      this._minimap = map;
    } else {
      this._map = map;
    }
  }

  /**
  * Add map function
  */
  public renderMaps(): void {
    this._map.render(this._game);
    //this._minimap.render(this._game);
  }

}
