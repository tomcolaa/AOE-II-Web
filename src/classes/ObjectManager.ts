import Game from './Game';
import Unit from './Unit';
import GameObject from './GameObject';
import Observer from '../interfaces/Observer';
import * as PIXI from 'pixi.js';
import Vector2 from "./Vector2";

export default class ObjectManager implements Observer {

    private _game: Game;
    private _objects: GameObject[];
    private _objectContainer: PIXI.Container;

    public constructor() {
        this._objectContainer = new PIXI.Container();
        this._objects = new Array<GameObject>();
    }

    /**
     * * * Interface functions
     **/
    public registerGame(game: Game): void {
        this._game = game;
    }

    public sendUpdate(msg: string): void {
        this._game.receiveUpdate(msg);
    }

    public receiveUpdate(game: Game, delta: number, msg: string, param: any): void {
        //console.log("ObjectManager: Update received at " + delta);
        for(let i = 0; i < this._objects.length; i++) {
            if(msg === "debug") this._objects[i].debug = param;
            this._objects[i].update();
        }
    }

    /**
     * Getter functions
     **/
    public get objects(): GameObject[] {
        return this._objects;
    }

    public get objectContainer(): PIXI.Container {
        return this._objectContainer;
    }

    /**
     * Class functions
     **/
      public addObject(object: GameObject): void {
          this._objects.push(object);
          object.render(this._objectContainer);
      }

      public renderObjects(): void {
          this._game.getApp().stage.addChild(this._objectContainer);
          for(let i = 0; i < this._objects.length; i++) {
              this._objects[i].render(this.objectContainer);
          }
      }

      public selectObjects(p1: Vector2, p2: Vector2): void {
          this._objects.forEach(obj => {
              let hitX = false;
              let hitY = false;
              let objX = obj.sprite.worldTransform.tx;
              let objY = obj.sprite.worldTransform.ty;

              if(p2.x > p1.x) {
                  if(objX > p1.x && objX < p2.x) hitX = true;
              } else {
                  if(objX < p1.x && objX > p2.x) hitX = true;
              }

              if(p2.y > p1.y) {
                  if(objY > p1.y && objY < p2.y) {
                      hitY = true;
                  }
                  else {
                      if(objY < p1.y && objY > p2.y) hitY = true;
                  }
              }

              obj.selected = (hitX && hitY);

          });
      }

}
