import * as PIXI from 'pixi.js';
import Vector2 from './Vector2.ts';
import GrasImage from '../assets/gras.png';

export default class Tile {

  private _position: Vector2;
  private _tileSize: number;
  private _texture: PIXI.Texture;

  public constructor(position: Vector2, tileSize: number, texture: PIXI.Texture) {
    this._position = position;
    this._tileSize = tileSize;
    this._texture = texture;
  }

  public render(tileMapIsoPlane: PIXI.Graphics): void {
    let tile = new PIXI.Sprite(this._texture);
		tile.position.set(this.getPixelPos().x, this.getPixelPos().y);
		tile.width = this._tileSize;
		tile.height = this._tileSize;
		tileMapIsoPlane.addChild(tile);
  }

  public getPixelPos(): Vector2 {
    return new Vector2(
      this._position.x * this._tileSize, this._position.y * this._tileSize
    );
  }

}
