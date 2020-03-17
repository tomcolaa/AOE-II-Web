export default class Vector2 {

  private _x: number;
  private _y: number;

  public constructor(x?: number, y?: number) {
    this._x = x || 0;
    this._y = y || 0;
  }

  get x(): number {
    return this._x;
  }

  set x(x: number) {
    this._x = x;
  }

  get y(): number {
    return this._y;
  }

  set y(y: number) {
    this._y = y;
  }

  public add(x: number, y: number): Vector2 {
    let newX = this._x + x;
    let newY = this._y + y;
    return new Vector2(newX, newY);
  }

  public toIso(): Vector2 {
    let isoX = this._x - this._y;
		let isoY = (this._x + this._y) / 2;
		return new Vector2(isoX / 1.4, isoY / 1.4);
  }

  public toCart(): Vector2 {
		let cartX = (2 * this._y + this._x) / 2;
		let cartY = (2 * this._y - this._x) / 2;
    return new Vector2(cartX, cartY);
	}

}
