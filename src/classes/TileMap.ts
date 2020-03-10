import Map from './Map.ts';
import Tile from './Tile.ts';
import Vector2 from './Vector2.ts';
import * as PIXI from 'pixi.js';

export default class TileMap extends Map{

  private _tiles: number;
  private _tileSize: number;
  private _textures: Object;
  private _tileMapContainer: PIXI.Container;
  private _tileMapIsoPlane: PIXI.Graphics;

  public constructor(tiles: number, tileSize: number, textures: Object) {
    super();
    this._tiles = tiles || 32;
    this._tileSize = tileSize || 128;
    this._textures = textures || new Object();
    this._tileMapContainer = new PIXI.Container();
    this._tileMapIsoPlane = new PIXI.Graphics();
  }

  public set tiles(tiles: number): void {
    this._tiles = tiles;
  }

  public set tileSize(tileSize: number): void {
    this._tileSize = tileSize;
  }

  public set textures(textures: Object): void {
    this._textures = textures;
  }

  public render(game: Game): void {
    //Render tile map container
    this._tileMapContainer.position.set(
      game.app.screen.width / 2,
      game.app.screen.height / 2 - (this._tiles * this._tileSize / 1.4) / 2
    );
    this._tileMapContainer.scale.y = 0.5;
    game.app.stage.addChild(this._tileMapContainer);
    //Render tile map iso plane;
    this._tileMapIsoPlane.rotation = Math.PI / 4;
    this._tileMapContainer.addChild(this._tileMapIsoPlane);
    this.generateTiles();
  }

  public generateTiles(): void {
    for(let i = 0; i < this._tiles; i++) {
      for(let j = 0; j < this._tiles; j++) {
        let tile = new Tile( new Vector2(i, j), this._tileSize, this._textures.dirt.texture);
        tile.render(this._tileMapIsoPlane);
      }
    }
  }

}
