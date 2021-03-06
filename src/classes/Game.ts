import * as PIXI from 'pixi.js';
import EventManager from './EventManager';
import MapManager from './MapManager';
import AssetManager from './AssetManager';
import ObjectManager from './ObjectManager';
import Observer from "../interfaces/Observer";

export default class Game {

  private app: PIXI.Application;
  private observers: Observer[] = [];
  private _debug: boolean;
  private _eventManager: EventManager;
  private _mapManager: MapManager;
  private _assetManager: AssetManager;
  private _objectManager: ObjectManager;

  public constructor(app?: PIXI.Application, debug?: boolean) {
    this.app = app || new PIXI.Application();
    this._debug = debug || false;

    this.app.renderer.view.style.position = "absolute";
    this.app.renderer.view.style.display = "block";
    // this.app.renderer.autoResize = true; property does not exist?!

    document.body.appendChild(this.app.view);
    this.resize();
  }

  public getApp(): PIXI.Application {
    return this.app;
  }

  public get debug(): boolean {
    return this._debug;
  }

  public set debug(debug: boolean) {
    if(this._debug !== debug) {
      this._debug = debug;
      this.sendUpdate(this, 0, "debug", debug);
    }
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

    if(observer instanceof EventManager) {
      this._eventManager = observer;
    } else if(observer instanceof MapManager) {
      this._mapManager = observer;
    } else if(observer instanceof AssetManager) {
      this._assetManager = observer;
    } else if(observer instanceof ObjectManager) {
      this._objectManager = observer;
    }

    console.log("Game: " + observer.constructor.name + " was attached.");
  }

  public receiveUpdate(msg: string): void {
    if(msg === "resize") this.resize();
  }

  public sendUpdate(game: Game, delta: number, msg: string, param?: any): void {
    for (const observer of this.observers) {
      observer.receiveUpdate(game, delta, msg, param);
    }
  }

  public resize(): void {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  public start(): void {
    let _this = this;
    this.app.ticker.add((delta) => {_this.sendUpdate(_this, delta, "update");});
  }

}
