import * as PIXI from 'pixi.js';
import EventManager from './EventManager.ts';
import MapManager from './MapManager.ts';
import AssetManager from './AssetManager.ts';
import ObjectManager from './ObjectManager.ts';

export default class Game {

  private app: PIXI.Application;
  private observers: Observer[] = [];
  private _eventManager: EventManager;
  private _mapManager: MapManager;
  private _assetManager: AssetManager;
  private _objectManager: ObjectManager;

  public constructor(app: object) {
    this.app = app || new PIXI.Application();
    this.app.renderer.view.style.position = "absolute";
		this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = true;
    document.body.appendChild(this.app.view);
    this.resize();
  }

  public get eventManager(): EventManager {
    return this._eventManager;
  }

  public get mapManager(): MapManager {
    return this._mapManager;
  }

  public get assetManager(): AssetManager {
    return this._assetManager;
  }

  public get objectManager(): ObjectManager {
    return this._objectManager;
  }

  public getObserver(o: number): Observer {
    return this.observers[o];
  }

  public register(observer: Observer): void {
    this.observers.push(observer);
    observer.registerGame(this);
    if(observer.constructor.name === "EventManager") {
      this._eventManager = observer;
    } else if(observer.constructor.name === "MapManager") {
      this._mapManager = observer;
    } else if(observer.constructor.name === "AssetManager") {
      this._assetManager = observer;
    } else if(observer.constructor.name === "ObjectManager") {
      this._objectManager = observer;
    }
    console.log("Game: " + observer.constructor.name + " was attached.");
  }

  public receiveUpdate(msg: string): void {
    if(msg === "resize") this.resize();
  }

  public sendUpdate(game: Game, delta: number, msg: string): void {
    for (const observer of this.observers) {
      observer.receiveUpdate(game, delta, msg);
    }
  }

  public resize(): void {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  public start(): void {
    let _this = this;
		this.app.ticker.add((delta) => {
      _this.sendUpdate(_this, delta, "update");
		});
  }

}
