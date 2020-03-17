import Game from './Game';
import Observer from '../interfaces/Observer';
import * as PIXI from 'pixi.js';
import {Image, AssetResources} from '../types';

export default class AssetManager implements Observer {

  private _game: Game;
  private _loader: PIXI.Loader;
  private _resources: AssetResources;

  public constructor() {}

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
    //console.log("AssetManager: Update received at " + delta);
  }

  /**
  * Load assets function
  */
  public loadAssets(assets: Image[]): Promise<null> {
    const _this = this;
    return new Promise((resolve) => {
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
  public getMapTextures(): AssetResources {
    return this._resources;
  }

  public getUnitTexture(): PIXI.Texture {
    // @ts-ignore
    return this._resources.axe.texture;
  }

  public getBuildingTexture(): PIXI.Texture {
    // @ts-ignore
    return this._resources.archeryRange.texture;
  }

}
