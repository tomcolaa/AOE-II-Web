import Map from './Map';

export default class MiniMap extends Map {

  private _size: number;
  private _bgColor: number;

  public constructor(size?: number, bgColor?: number) {
    super();
    this._size = size || 200;
    this._bgColor = bgColor || 0x007F0E;
  }

  public set size(size: number) {
    this._size = size;
  }

  public set bgColor(bgColor: number) {
    this._bgColor = bgColor;
  }

}
