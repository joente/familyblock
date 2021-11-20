import * as PIXI from "pixi.js";
import AnimateMoveUp from "./AnimateMoveUp";
import AnimateMerge from "./AnimateMerge";


const Cell = (state) => {
    const {stage, pos, unit, col, row, cellTexture} = state;
    const bg = new PIXI.Sprite(cellTexture);
    const cellpos = {x: 0, y: 0, size: 0};

    let tile = null;
    let animation = null;

    const normalize = () => {
        cellpos.x = pos.x + unit.size*10*col;
        cellpos.y = pos.y + unit.size*10*row;
        cellpos.size = 10*unit.size;

        if (bg.visible) {
            bg.position.x = cellpos.x;
            bg.position.y = cellpos.y;
            bg.width = bg.height = cellpos.size;
        }

        if (tile !== null) {
            tile.container.position.x = cellpos.x;
            tile.container.position.y = cellpos.y;
            tile.normalize();
        }

        if (animation !== null) {
            animation.normalize();
        }
    }

    stage.addChild(bg);

    return {
        col,
        row,
        resize: normalize,
        isEmpty: () => tile === null,
        hide: () => bg.visible = false,
        setTile: (newTile) => {
            if (tile) {
                tile.remove();
            }
            tile = newTile;
            tile.container.position.x = cellpos.x;
            tile.container.position.y = cellpos.y;
        },
        animate: () => {
            if (animation) {
                if (animation.animate() === true) {
                    animation = null;  // finished;
                }
            }
            return animation === null;  // true when finished or nothing to animate
        },
        getValue: () => tile === null ? 0 : tile.value,
        getIndex: () => tile === null ? null : tile.index,
        getXpos: () => pos.x + unit.size*10*col,
        getYpos: () => pos.y + unit.size*10*row,
        getTile: () => tile,
        moveTileUp: (toCell) => {
            animation = AnimateMoveUp({toCell, tile, unit});
            tile = null;
        },
        mergeTile: (withCell, direction) => {
            animation = AnimateMerge({withCell, direction, tile, unit});
            tile = null;
        },
        nextTile: () => {
            const nextTile = tile.nextTile();
            tile.container.parent.addChild(nextTile.container);
            tile.remove();
            tile = nextTile;
            tile.container.position.x = cellpos.x;
            tile.container.position.y = cellpos.y;
        }
    }
};

export default Cell;