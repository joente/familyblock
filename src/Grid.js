import * as PIXI from "pixi.js";
import Cell from "./Cell";
import Highlight from "./Highlight";


const Grid = (state) => {
    const {offset, stage, unit, score, tiles} = state;
    const pos = {x: 0, y: 0, w: 50, h:70};
    const cols = 5;
    const rows = 8;  // 8 rows but only 7 visible
    const cells = [];
    const cellTexture = PIXI.Texture.from('assets/cell.png');
    const okTexture = PIXI.Texture.from('assets/ok.png');
    const nokTexture = PIXI.Texture.from('assets/nok.png');
    const ok = new PIXI.Sprite(okTexture);
    const nok = new PIXI.Sprite(nokTexture);
    const highlight = Highlight({offset, ok, nok, unit});
    let isAnimating = false;
    let targetIndex = 9;  // 9 is the first target

    stage.addChild(ok);
    stage.addChild(nok);

    const normalize = () => {
        pos.x = offset.x + unit.size*5;
        pos.y = offset.y + unit.size*10;
        pos.w = unit.size*50;
        pos.h = unit.size*70;
    }

    normalize();

    for (let row = 0; row < rows; row++) {
        cells.push([]);
        for (let col = 0; col < cols; col++) {
            cells[row].push(Cell({stage, pos, unit, col, row, cellTexture}));
        }
    }

    const lastRow = cells[rows-1];

    lastRow.forEach(cell => cell.hide());

    const resize = () => {
        normalize();
        highlight.normalize();
        cells.forEach(row => row.forEach(cell => cell.resize()));
    };

    const colOnGrid = (mpos) => {
        return (
            mpos.x >= pos.x &&
            mpos.x < pos.x + pos.w &&
            mpos.y >= pos.y &&
            mpos.y < pos.y + pos.h
        ) ? Math.floor((mpos.x - pos.x) / (10*unit.size)) : null;
    }

    const colOkNok = (col, tile) => {
        if (col === null) {
            return ok;
        }
        let cell;
        for (const row of cells) {
            if (row === lastRow) {
                break;
            }
            cell = row[col];
            if (cell === undefined) {
                console.log("undefined cell for col and row: ", col, row);
                return nok;
            }
            if (cell.isEmpty()) {
                return ok;
            }
        }
        return cell.getIndex() === tile.index ? ok : nok;
    }

    const select = (mpos, tile) => {
        if (tile === null) {
            return;
        }
        const col = colOnGrid(mpos);
        highlight.update(col, colOkNok(col, tile));
    }

    const final = (mpos, tile, cb) => {
        const col = colOnGrid(mpos);
        highlight.update(null);
        if (col !== null && tile && colOkNok(col, tile) === ok) {
            cb(col);
        }
    }

    const getScore = () => cells.reduce((total, row) => row.reduce((total, cell) => total + cell.getValue(), total), 0);
    const getMaxIndex = () => cells.reduce((ma, row) => row.reduce((ma, cell) => {
        const cidx = cell.getIndex();
        return cidx === null || cidx < ma ? ma : cidx;
    }, ma), 0);
    const getMinIndex = () => cells.reduce((mi, row) => row.reduce((mi, cell) => {
        const cidx = cell.getIndex();
        return cidx === null || cidx > mi ? mi : cidx;
    }, mi), 999);

    const cellsToAnimate = [];
    const colsMoved = [];

    const addMovedCol = col => colsMoved.includes(col) ? null : colsMoved.push(col);

    const processGrid = () => {
        // we never destoy cells, so do not care about references
        cellsToAnimate.length = 0;

        // update the score
        score.update(getScore());

        // calculate if tiles need to move up...
        const toList = Array(cols).fill(0);
        for (let r = 0; r < cells.length; r++) {
            const row = cells[r];
            for(let i = 0; i < row.length; ++i) {
                const cell = row[i];
                if (cell.isEmpty()) {
                    toList[i] += 1;
                } else {
                    const n = toList[i];
                    if (n > 0) {
                        addMovedCol(i);
                        cell.moveTileUp(cells[r-n][i]);
                        cellsToAnimate.push(cell);
                    }
                }
            }
        }

        if (cellsToAnimate.length) {
            return;
        }

        // Merge check...
        // console.log('-------')
        // console.log(colsMoved.join(' - '))
        for (let r = 0; r < rows-1; r++) {
            for (const i of colsMoved) {
                const cell = cells[r][i];

                if (cell.isEmpty()) {
                    continue;
                }

                const cellsToCheck = [
                    {direction: "right", ce: i > 0 ? cells[r][i-1] : null},
                    {direction: "left", ce: i < cols-1 ? cells[r][i+1] : null},
                    {direction: "up", ce: cells[r+1][i]}
                ];

                cellsToCheck.forEach(({direction, ce}) => {
                    if (ce !== null && !ce.isEmpty() && ce.getIndex() === cell.getIndex()) {
                        if (direction === "up") {
                            cell.mergeTile(ce, direction);
                            cellsToAnimate.push(cell);
                        } else {
                            ce.mergeTile(cell, direction);
                            cellsToAnimate.push(ce);
                        }
                    }

                });
            }
        }

        if (cellsToAnimate.length) {
            return;
        }

        // done, get the next tile and reset moved cols
        // console.log('+++++++')
        colsMoved.splice(0, colsMoved.length);

        if (getMaxIndex() >= targetIndex) {
            targetIndex += 2;
            tiles.nextTarget();
        }
        tiles.newTile(getMinIndex());
    };

    const animate = () => {
        isAnimating = false;
        for (const cell of cellsToAnimate) {
            if (cell.animate() === false) {
                isAnimating = true;  // not finished animating
            }
        }
        if (!isAnimating && cellsToAnimate.length > 0) {
            // just finished animating, check for more
            processGrid();
        }
    }

    const addTile = (tile, col) => {
        const cell = lastRow[col];
        cell.setTile(tile);
        addMovedCol(col);
        processGrid();
    }

    return {
        // draw: draw,
        resize,
        select,
        move: select,
        final,
        addTile,
        animate,
    }
};

export default Grid;