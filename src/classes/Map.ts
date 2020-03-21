import Game from './Game';
import * as PIXI from "pixi.js";

export default abstract class Map {

  private _debug: boolean = false;
  protected _container: PIXI.Container;

  protected constructor() {}

  public get container(): PIXI.Container {
    return this._container;
  }
  public set debug(debug: boolean) {
    this._debug = debug;
  }

  public render(game: Game): void {}

}
