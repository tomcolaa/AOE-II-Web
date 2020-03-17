import Map from './Map';
import Tile from './Tile';
import Vector2 from './Vector2';
import * as PIXI from 'pixi.js';
import Game from "./Game";
import {Image, AssetResources} from '../types';

export default class TileMap extends Map {

  private _tiles: number;
  private _tileSize: number;
  private _textures: AssetResources;
  private _tileArray: Tile[];
  private _tileMapIsoPlane: PIXI.Graphics;

  public constructor(tiles?: number, tileSize?: number, debug?: boolean, textures?: AssetResources) {
    super();
    this._tiles = tiles || 32;
    this._tileSize = tileSize || 64;
    this._debug = debug || false;
    this._textures = textures || {};
    this._tileArray = new Array<Tile>();
    this._container = new PIXI.Container();
    this._tileMapIsoPlane = new PIXI.Graphics();
  }

  public set tiles(tiles: number) {
    this._tiles = tiles;
  }

  public set tileSize(tileSize: number) {
    this._tileSize = tileSize;
  }

  public set debug(debug: boolean) {
    this._tileArray.forEach(tile => {
      tile.debug = debug;
    });

    this._debug = debug;
  }

  public set textures(textures: AssetResources) {
    this._textures = textures;
  }

  public get tileMapContainer(): PIXI.Container {
    return this._container;
  }

  public render(game: Game): void {
    const app: PIXI.Application = game.getApp();

    //Render tile map container
    this._container.position.set(
        app.screen.width / 2,
        app.screen.height / 2 - (this._tiles * this._tileSize / 1.4) / 2
    );

    this._container.scale.y = 0.5;
    app.stage.addChild(this._container);

    //Render tile map iso plane;
    this._tileMapIsoPlane.rotation = Math.PI / 4;
    this._container.addChild(this._tileMapIsoPlane);
    this.generateTiles();
  }

  public generateTiles(): void {
    for(let i = 0; i < this._tiles; i++) {
      for(let j = 0; j < this._tiles; j++) {
        let tile = new Tile(new Vector2(i, j), this._tileSize, this.getRandomTile(), false);
        tile.isoPlane = this._tileMapIsoPlane;
        tile.render();
        this._tileArray.push(tile);
      }
    }
  }

  public getRandomTile(): PIXI.Texture {
    let rand = Math.random();
    // @ts-ignore
    return this._textures.gras.texture;
    /*
    if(rand < 0.02) {
      return this._textures.gras.texture;
    } else if(rand < 0.2) {
      return this._textures.sand1.texture;
    } else if(rand < 0.4) {
      return this._textures.sand2.texture;
    } else if(rand < 0.6) {
      return this._textures.sand3.texture;
    } else if(rand < 0.8) {
      return this._textures.sand4.texture;
    } else if(rand < 1) {
      return this._textures.sand5.texture;
    }*/
  }

}
