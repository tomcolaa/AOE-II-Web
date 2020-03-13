import GameObject from './GameObject.ts';
import Vector2 from './Vector2.ts';

export default class Unit extends GameObject{

  private _direction: number;
  private _action: string;

  public constructor(uuid: number, position: Vector2, health: number,
    selected: boolean, movable: boolean, debug: boolean, texture: PIXI.Texture,
    direction: number, action: string) {
      super(uuid, position, health, selected, movable, debug, texture);
      this._direction = direction || 0;
      this._action = action || "stand";
  }

  public update(): void {
    let newPos = this._position.toIso();
    this._sprite.position.set(newPos.x, newPos.y);
  }

}
