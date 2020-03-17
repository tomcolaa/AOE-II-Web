import * as PIXI from 'pixi.js';
import Vector2 from './Vector2';

export default class Tile {

  private _position: Vector2;
  private _tileSize: number;
  private _sprite: PIXI.Sprite;
  private _texture: PIXI.Texture;
  private _isoPlane: PIXI.Graphics;
  private _debug: boolean;
  private _debugGraphic: PIXI.Graphics | null;

  public constructor(position: Vector2, tileSize: number, texture: PIXI.Texture, debug: boolean) {
    this._position = position;
    this._tileSize = tileSize;
    this._texture = texture;
    this._debug = debug || false;
    this._debugGraphic = null;
  }

  set isoPlane(isoPlane: PIXI.Graphics) {
    this._isoPlane = isoPlane;
  }

  set debug(debug: boolean) {
    if(this._debug !== debug && this._sprite !== undefined) {
      if(debug) { this.renderDebug() } else { this.removeDebug() }
    }
    this._debug = debug;
  }

  public render(): void {
    this._sprite = new PIXI.Sprite(this._texture);
		this._sprite.position.set(this.getPixelPos().x, this.getPixelPos().y);
    this._sprite.width = this._tileSize;
		this._sprite.height = this._tileSize;
		this._isoPlane.addChild(this._sprite);
    if(this._debug) this.renderDebug();
  }

  public renderDebug(): void {
    this._debugGraphic = new PIXI.Graphics();
    this._debugGraphic.lineStyle(1, 0xFFFFFF);
    this._debugGraphic.drawRect(
      this.getPixelPos().x,
      this.getPixelPos().y,
      this._tileSize,
      this._tileSize
    );
    this._isoPlane.addChild(this._debugGraphic);
  }

  public removeDebug(): void {
    if (this._debugGraphic) {
      this._isoPlane.removeChild(this._debugGraphic);
    }

    this._debugGraphic = null;
  }

  public getPixelPos(): Vector2 {
    return new Vector2(
      this._position.x * this._tileSize, this._position.y * this._tileSize
    );
  }

}
