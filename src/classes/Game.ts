import * as PIXI from 'pixi.js';

export default class Game {

  private app: PIXI.Application;
  private observers: Observer[] = [];

  public constructor(app: object) {
    this.app = app || new PIXI.Application();
    this.app.renderer.view.style.position = "absolute";
		this.app.renderer.view.style.display = "block";
    this.app.renderer.autoResize = true;
    document.body.appendChild(this.app.view);
    this.resize();
  }

  public register(observer: Observer): void {
    this.observers.push(observer);
    observer.game = this;
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
