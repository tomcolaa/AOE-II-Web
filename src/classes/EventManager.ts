import Game from '../classes/Game';
import Unit from '../classes/Unit';
import Vector2 from './Vector2.ts';
import Observer from '../interfaces/Observers.ts';

export default class EventManager implements Observer {

  private _game: Game;
  private _keys: number[];
  private _mousedown: Vector2;
  private _mouseUp: Vector2;
  private _mouseMove: Vector2;
  private selectBox: string;
  private selectBoxStart: Vector2;

  public constructor() {
    this._keys = [];
    this._mouseDown = null;
    this._mouseUp = null;
    this._mouseMove = new Vector2();
    this.selectBox = null;
    this.selectBoxStart = null;
    window.addEventListener("resize", e => this.resize(e));
    window.addEventListener("keydown", e => this.keyDown(e));
		window.addEventListener("keyup", e => this.keyUp(e));
    window.addEventListener("mousedown", e => this.mouseDown(e));
    window.addEventListener("mouseup", e => this.mouseUp(e));
		window.addEventListener("mousemove", e => this.mouseMove(e));
    window.addEventListener("wheel", e => this.scrollEvent(e));
		window.addEventListener("click", e => this.clickEvent(e));
  }

  /**
   * Interface functions
   */
  public registerGame(game: Game): void {
    this._game = game;
  }

  public sendUpdate(msg: string): void {
    this._game.receiveUpdate(msg);
  }

  public receiveUpdate(game: Game, delta: number, msg: string, param: any): void {
    //console.log("EventManager: Update received at " + delta);
    let mapManager = this._game.mapManager;
    let objectManager = this._game.objectManager;

    /** Camera zoom **/
		mapManager.map.tileMapContainer.scale.x = mapManager.zoom;
		mapManager.map.tileMapContainer.scale.y = mapManager.zoom / 2;
  	objectManager.objectContainer.scale.x = mapManager.zoom;
		objectManager.objectContainer.scale.y = mapManager.zoom;

    /** Player movement **/
    const SPEED = 2;
		if(this._keys["87"]) {
			objectManager.objects.forEach(object => {
        if(object.constructor.name === "Unit" && object.selected)
          object.position = object.position.add(-SPEED, -SPEED);
      });
		}

    if(this._keys["65"]) {
			objectManager.objects.forEach(object => {
        if(object.constructor.name === "Unit" && object.selected)
          object.position = object.position.add(-SPEED/2, SPEED);
      });
		}

    if(this._keys["83"]) {
			objectManager.objects.forEach(object => {
        if(object.constructor.name === "Unit" && object.selected)
          object.position = object.position.add(SPEED, SPEED);
      });
		}

    if(this._keys["68"]) {
			objectManager.objects.forEach(object => {
        if(object.constructor.name === "Unit" && object.selected)
          object.position = object.position.add(SPEED/2, -SPEED);
      });
		}


    /** Object Selection **/
		if(this._mouseDown !== null && this.selectBox === null) {
			this.selectBoxStart = this._mouseDown;
			this.selectBox = document.createElement("div");
			this.selectBox.style.position = "fixed";
			this.selectBox.style.left = this.selectBoxStart.x + "px";
			this.selectBox.style.top = this.selectBoxStart.y + "px";
			this.selectBox.style.border = "1px dashed #fff";
			document.body.append(this.selectBox);
		}
		if(this.selectBox !== null && this._mouseDown !== null) {
			if(this._mouseMove.x > this._mouseDown.x) {
				let width = this._mouseMove.x - this._mouseDown.x ;
				this.selectBox.style.width = width + "px";
			} else {
				let width = this._mouseDown.x - this._mouseMove.x;
				this.selectBox.style.width = width + "px";
				this.selectBox.style.left = this._mouseDown.x - width + "px";
			}
			if(this._mouseMove.y > this._mouseDown.y) {
				let height = this._mouseMove.y - this._mouseDown.y;
				this.selectBox.style.height = height + "px";
			}else {
				let height = this._mouseDown.y - this._mouseMove.y;
				this.selectBox.style.height = height + "px";
				this.selectBox.style.top = this._mouseDown.y - height + "px";
			}
		}
		if(this._mouseUp !== null && this.selectBox !== null) {
			this._game.objectManager.selectObjects(this.selectBoxStart, this._mouseUp);
			this.selectBox.remove();
			this.selectBox = null;
			this.selectBoxStart = null;
		}
  }

  /**
   * EventListener functions
   */
  private resize(e: Event): void {
    this.sendUpdate("resize");
  }

  private keyDown(e: Event): void {
    this._keys[Number(e.keyCode)] = true;
  }

  private keyUp(e: Event): void {
    this._keys[Number(e.keyCode)] = false;
  }

  private mouseDown(e: Event): void {
    this._mouseDown = new Vector2(e.clientX, e.clientY);
		this._mouseUp = null;
  }

  private mouseUp(e: Event): void {
    this._mouseUp = new Vector2(e.clientX, e.clientY);
		this._mouseDown = null;
  }

  private mouseMove(e: Event): void {
    this._mouseMove = new Vector2(e.clientX, e.clientY);
  }

  private scrollEvent(e: Event): void {
    const MAX_ZOOM_OUT = 0.3;
		const MAX_ZOOM_IN = 1.8;
		let zoom = this._game.mapManager.zoom;
		if(e.deltaY > 0) {
			if(zoom > MAX_ZOOM_OUT) this._game.mapManager.zoom = zoom - 0.1;
		} else {
			if(zoom < MAX_ZOOM_IN) this._game.mapManager.zoom = zoom + 0.1;
		}
  }

  private clickEvent(e: Event): void {
    if(this._keys["80"]) {
      let isoPos = new Vector2(e.clientX, e.clientY);
  		isoPos = this.mouseToIso(
        new Vector2(e.clientX, e.clientY),
        this._game.mapManager.map.tileMapContainer,
        this._game.mapManager.zoom
      );
      let unit = new Unit();
      unit.position = new Vector2(isoPos.x, isoPos.y);
      unit.texture = this._game.assetManager.getUnitTexture();
      this._game.objectManager.addObject(unit);
    }
  }

  private mouseToIso(click: Vector2, tileMapContainer: PIXI.Container, zoom: number): Vector2 {
    let cartPos = new Vector2(click.x, click.y).toCart();
    let mapCart = new Vector2(tileMapContainer.position.x, tileMapContainer.position.y).toCart();
    let x = ((cartPos.x - mapCart.x) * 2) / (zoom * 2);
    let y = ((cartPos.y - mapCart.y) * 2) / (zoom * 2);
    return {'x': x * 1.4, 'y': y * 1.4}
  }

}
