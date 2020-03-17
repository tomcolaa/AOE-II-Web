import GameObject from './GameObject';
import Vector2 from './Vector2';

export default class Unit extends GameObject{

  private _direction: number;
  private _action: string;

  public constructor(direction?: number, action?: string) {
      super();
      this._direction = direction || 0;
      this._action = action || "stand";
  }

  public update(): void {
    let newPos = this._position.toIso();
    this._sprite.position.set(newPos.x, newPos.y);
  }

}
