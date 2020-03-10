import Game from '../classes/Game';
import Observer from '../interfaces/Observers.ts';

export default class EventManager implements Observer {

  private _game: Game;

  public constructor() {
    window.addEventListener("resize", e => this.resize(e));
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
    //console.log("EventManager: Update received at " + delta);
  }

  /**
   * EventListener functions
   */
  private resize() {
    this.sendUpdate("resize");
  }

}
