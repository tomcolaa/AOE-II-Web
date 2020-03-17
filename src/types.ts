import * as PIXI from 'pixi.js';

export type Image = {
    name: string,
    image: any
};

export type AssetResources = {[index: string]: PIXI.LoaderResource | undefined};
