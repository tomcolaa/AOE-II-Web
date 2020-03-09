import * as PIXI from 'pixi.js';
import Octocat from './octocat.png';

window.onload = () => {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  app.loader.add('bunny', Octocat).load((loader, resources) => {

      const bunny = new PIXI.Sprite(resources.bunny.texture);
      bunny.x = app.renderer.width / 2;
      bunny.y = app.renderer.height / 2;
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;
      app.stage.addChild(bunny);

      app.ticker.add(() => {
          bunny.rotation += 0.01;
      });
  });
}
