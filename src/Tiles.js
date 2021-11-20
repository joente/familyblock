import * as PIXI from "pixi.js";
import Tile from "./Tile";

const Tiles = (state) => {
    const {offset, stage, unit} = state;

    const tileRange = 6;
    const allTiles = [];
    const numTiles = [
        '2', '4', '8', '16', '32', '64', '128', '256', '512',
        '1K', '2K', '4K','8K', '16K', '32K', '64K', '128K', '256K', '512K',
        '1M', '2M', '4M','8M', '16M', '32M', '64M', '128M', '256M', '512M',
        '1T', '2T', '4T','8T', '16T', '32T', '64T', '128T', '256T', '512T',
        '1P', '2P', '4P','8P', '16P', '32P', '64P', '128P', '256P', '512P',
    ];
    const rasterTexture = PIXI.Texture.from("assets/raster.png");
    const currentRaster = new PIXI.Sprite(rasterTexture);
    const nextRaster = new PIXI.Sprite(rasterTexture);

    let minTileIndex = 0;

    const randColor = (index) => {
        const red = (Math.floor(Math.random() * 0x50) + ((index&1)?0x20:0x70)) << 16;
        const green = (Math.floor(Math.random() * 0x50) + ((index&2)?0x20:0x70)) << 8;
        const blue = (Math.floor(Math.random() * 0x50) + ((index&4)?0x20:0x70)) << 0;

        return red+green+blue;
    }

    for (let index = 0; index < numTiles.length; ++index) {
        const color = randColor(index);
        const str = numTiles[index];
        // console.log('index: ', index, color.toString(16).padStart(6, 0));
        allTiles.push(Tile({index, allTiles, str, color, unit}));
    }

    const renderTiles = () => {
        let i = 0;
        for (const tile of allTiles) {
            stage.addChild(tile.container);
            tile.container.position.x = 100*Math.floor(i/8);
            tile.container.position.y = 100*Math.floor(i%8);
            i++;
        }
    }

    const getRandomTile = (mi) => {
        // Update mi
        mi = current && current.index < mi ? current.index : mi;
        let diff;
        if (mi < minTileIndex) {
            diff = minTileIndex-mi;
        } else {
            diff = 0;
            mi = minTileIndex;
        }

        const idx = Math.floor(Math.random() * (tileRange+diff)) + mi;
        return allTiles[idx].dupTile();
    }

    let current = null;
    let next = null;

    const normalizeTiles = () => {
        if (current) {
            current.container.position.x = offset.x + unit.size*25;
            current.container.position.y = offset.y + unit.size*85;
            current.normalize();
        }
        next.container.position.x = offset.x + unit.size*36.5;
        next.container.position.y = offset.y + unit.size*86.5;
        next.normalize(true);
    }

    const normalize = () => {
        currentRaster.position.x = offset.x + unit.size*24;
        currentRaster.position.y = offset.y + unit.size*84;
        currentRaster.width = unit.size*12;
        currentRaster.height = unit.size*12;

        nextRaster.position.x = offset.x + unit.size*36;
        nextRaster.position.y = offset.y + unit.size*86;
        nextRaster.width = unit.size*8;
        nextRaster.height = unit.size*8;

        normalizeTiles();
    }

    const newTile = (mi) => {
        current = next;
        next = getRandomTile(mi);
        stage.addChild(next.container);
        normalizeTiles();
    };

    stage.addChild(currentRaster);
    stage.addChild(nextRaster);

    return {
        renderTiles,
        newTile,
        getCurrentTile: () => current,
        stealCurrentTile: () => {
            const tile = current;
            current = null;
            return tile;
        },
        resize: normalize,
        nextTarget: () => minTileIndex++,
    }
};

export default Tiles;