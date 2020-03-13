import Game from './Game.ts';
import Observer from '../interfaces/Observers.ts';
import * as PIXI from 'pixi.js';

export default class AssetManager implements Observer {

  private _game: Game;
  private _loader: PIXI.Loader;
  private _resources: PIXI.Texture[];

  public constructor() {}

  /**
   * Interface functions
   */
  public set game(game: Game): void {
    this._game = game;
  }

  public sendUpdate(msg: string): void {
    this._game.receiveUpdate(msg);
  }

  public receiveUpdate(game: Game, delta: number, msg: string): void {
    //console.log("AssetManager: Update received at " + delta);
  }

  /**
  * Load assets function
  */
  public loadAssets(assets: Object[]): Promise {
    var _this = this;
    return new Promise((resolve, reject) => {
      assets.map(asset => {
        PIXI.Loader.shared.add(asset.name, asset.image);
      });
      PIXI.Loader.shared.load((loader, resources) => {
        _this._loader = loader;
        _this._resources = resources;
        resolve();
      });
    })
  }

  /**
  * Load assets function
  */
  public getMapTextures(): Object {
    return this._resources;
  }

  public getUnitTexture(): PIXI.Texture {
    return this._resources.axe.texture
  }

}
