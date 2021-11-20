import * as PIXI from "pixi.js";
import Grid from "./Grid";
import Tiles from "./Tiles";
import Score from "./Score";

/*

0 1 2 3  4  5  6   7   8   9  10 11 12 13
2 4 8 16 32 64 128 256 512 1K 2K 4K 8K 16K

initial tiles: 0..5
initial goal:


*/

const Game = (state) => {
    let container = state.container;
    let unit = {size: 10}, offset = {x: 0, y: 0};

    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // Add the canvas that Pixi automatically created for you to the HTML document
    container.appendChild(app.view);

    // Configure app
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.view.style.backgroundColor = "#823456";
    app.renderer.autoResize = true;

    const stage = new PIXI.Container();

    stage.interactive = true;

    const onPointerDown = (event) => {
        const pos = event.data.getLocalPosition(stage);
        grid.select(pos, tiles.getCurrentTile());
    };

    const onPointerMove = (event) => {
        const pos = event.data.getLocalPosition(stage);
        grid.move(pos, tiles.getCurrentTile());
    };

    const placeTile = (col) => {
        const tile = tiles.stealCurrentTile();
        if (!tile) {
            return;
        }

        grid.addTile(tile, col);
        score.update(grid.getScore());

        grid.animate()
    }

    const onPointerUp = (event) => {
        const pos = event.data.getLocalPosition(stage);
        grid.final(pos, tiles.getCurrentTile(), placeTile);
    };

    stage
        .on('pointerdown', onPointerDown)
        .on('pointermove', onPointerMove)
        .on('pointerup', onPointerUp);

    const normalize = () => {
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let nh = wh * (6/10);

        if (ww < nh) {
            unit.size = ww / 60;
            offset.x = 0;
            offset.y = (wh - (unit.size * 100)) / 2;
        } else {
            unit.size = wh / 100;
            offset.x = (ww - (unit.size * 60)) / 2;;
            offset.y = 0;
        }
    }

    const tiles = Tiles({offset, stage, unit});
    const score = Score({offset, stage, unit});
    const grid = Grid({unit, offset, stage, score, tiles});

    tiles.newTile(0);
    tiles.newTile(0);

    const animate = () => {
        requestAnimationFrame(animate);

        grid.animate();

        app.renderer.render(stage);
    }

    // tiles.renderTiles();

    normalize();
    grid.resize();
    tiles.resize();
    score.resize();

    return {
        resize: () => {
            normalize();
            score.resize();
            grid.resize();
            tiles.resize();
            app.renderer.resize(window.innerWidth, window.innerHeight);
        },
        animate: animate
    }
};


export default Game;