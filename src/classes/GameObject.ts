import Vector2 from './Vector2';
import * as PIXI from 'pixi.js';

export default abstract class GameObject {

  private _uuid: number;
  protected _position: Vector2;
  private _health: number;
  private _selected: boolean;
  private _movable: boolean;
  private _debug: boolean;
  protected _sprite: PIXI.Sprite;
  private _texture: PIXI.Texture | null;
  private _debugGraphic: PIXI.Graphics | null;
  private _statsGraphic: PIXI.Graphics | null;

  protected constructor(uuid?: number, position?: Vector2, health?: number,
                        selected?: boolean, movable?: boolean, debug?: boolean, texture?: PIXI.Texture) {
        this._uuid = uuid || 0; //TODO: || new UUID()
        this._position = position || new Vector2(0, 0);
        this._health = health || 100;
        this._selected = selected || false;
        this._movable = movable || false;
        this._debug = debug || false;
        this._texture = texture || null;
        this._debugGraphic = null;
        this._statsGraphic = null;
  }

  public set uuid(uuid: number) {
    this._uuid = uuid;
  }

  public get position(): Vector2 {
    return this._position;
  }

  public set position(position: Vector2) {
    this._position = position;
  }

  public set health(health: number) {
    this._health = health;
    if(this._selected) this.renderStats();
  }

  public get selected(): boolean {
    return this._selected;
  }

  public set selected(selected: boolean) {
    this._selected = selected;
    if(selected) { this.renderStats() } else { this.removeStats() }
  }

  public set movable(movable: boolean) {
    this._movable = movable;
  }

  public set debug(debug: boolean) {
    if(this._debug !== debug && this._sprite !== undefined) {
      if(debug) { this.renderDebug() } else { this.removeDebug() }
    }
    this._debug = debug;
  }

  public set sprite(sprite: PIXI.Sprite) {
    this._sprite = sprite;
  }

  public get sprite(): PIXI.Sprite {
    return this._sprite;
  }

  public set texture(texture: PIXI.Texture) {
    this._texture = texture
  }

  public isMovable(): boolean {
    return this._movable;
  }

  public render(objectContainer: PIXI.Container): void {
    if (!this._texture) {
      return;
    }

    this._sprite = new PIXI.Sprite(this._texture);
    let isoPos = new Vector2(this._position.x, this._position.y).toIso();
    this._sprite.anchor.set(0.5, 1);
    this._sprite.position.set(isoPos.x, isoPos.y);
    objectContainer.addChild(this._sprite);
    if(this._debug) this.renderDebug();
    if(this._selected) this.renderStats();
  }

  public renderDebug(): void {
    this._debugGraphic = new PIXI.Graphics();
    this._debugGraphic.lineStyle(1, 0x00FF00);
    this._debugGraphic.drawRect(
        -this._sprite.width / 2,
        -this._sprite.height,
        this._sprite.width,
        this._sprite.height
    );

    this._sprite.addChild(this._debugGraphic);
  }

  removeDebug(): void {
    if(this._debugGraphic) {
      this._sprite.removeChild(this._debugGraphic);
    }

    this._debugGraphic = null;
  }

  public renderStats(): void {
    this.removeStats();
    this._statsGraphic = new PIXI.Graphics();
    this._statsGraphic.beginFill(0xFF0000);
    this._statsGraphic.drawRect(-25/2, -this._sprite.height-4, 25, 2);
    this._sprite.addChild(this._statsGraphic);
    let healthbar = new PIXI.Graphics();
    healthbar.beginFill(0x00FF00);
    healthbar.drawRect(-25/2, -this._sprite.height-4, this._health / 4, 2);
    this._statsGraphic.addChild(healthbar);
  }

  public removeStats(): void {
    if(this._statsGraphic) {
      this._sprite.removeChild(this._statsGraphic);
    }

    this._statsGraphic = null;
  }

  // Empty update function to be implemented by each GameObject
  public update(): void {}

}
