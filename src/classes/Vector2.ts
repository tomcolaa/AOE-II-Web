export default class Vector2 {

  private _x;
  private _y;

  public constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  set x(x: number): void {
    this._x = x;
  }

  get y(): number {
    return this._y;
  }

  set y(y: number) {
    this._y = y;
  }

  public toIso(): Vector2 {
    let isoX = this._x - this._y;
		let isoY = (this._x + this._y) / 2;
		return new Vector2(isoX / 1.4, isoY / 1.4);
  }

}
