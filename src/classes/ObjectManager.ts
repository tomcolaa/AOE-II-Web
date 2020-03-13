import Game from './Game.ts';
import Unit from './Unit.ts';
import GameObject from './GameObject.ts';
import Observer from '../interfaces/Observers.ts';
import * as PIXI from 'pixi.js';

export default class ObjectManager implements Observer {

  private _game: Game;
  private _objects: GameObject[];
  private _objectContainer: PIXI.Container;

  public constructor() {
    this._objectContainer = new PIXI.Container();
    this._objects = new Array<GameObject>();
  }

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
    //console.log("ObjectManager: Update received at " + delta);
    for(let i = 0; i < this._objects.length; i++) {
      this._objects[i].update();
    }
  }

  public get objectContainer(): PIXI.Container {
    return this._objectContainer;
  }

  public renderObjects(): void {
    this._game.app.stage.addChild(this._objectContainer);
    for(let i = 0; i < this._objects.length; i++) {
      this._objects[i].render();
    }
  }

  /**
  * Add functions
  */

  public addUnit(unit: Unit): void {
    this._objects.push(unit);
    unit.render(this._objectContainer);
  }


}
