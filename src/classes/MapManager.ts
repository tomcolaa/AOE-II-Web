import Game from '../classes/Game';
import Observer from '../interfaces/Observers.ts';
import TileMap from './TileMap';
import MiniMap from './MiniMap';

export default class MapManager implements Observer {

  private _game: Game;
  private _map: Map;
  private _minimap: Map;
  private _zoom: number;

  public constructor(map: Map, minimap: Map, zoom: number) {
    this._map = map || new TileMap();
    this._minimap = minimap || new MiniMap();
    this._zoom = zoom || 1;
  }

  get map(): Map {
    return this._map;
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
  }o

}
