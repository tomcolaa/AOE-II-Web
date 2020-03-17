import Game from './Game';
import * as PIXI from "pixi.js";

export default abstract class Map {

  _debug: boolean = false;
  protected _container: PIXI.Container;

  protected constructor() {}

  public render(game: Game): void {}

  public get container(): PIXI.Container {
    return this._container;
  }

}
