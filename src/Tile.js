import * as PIXI from "pixi.js";

const Tile = (state) => {
    const {index, allTiles, str, color, unit} = state;
    const value = 2<<index;
    const container = new PIXI.Container();
    var blur = new PIXI.filters.BlurFilter(1);
    const graphics = new PIXI.Graphics();
    graphics.filters = [blur];

    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#ffffff',
        align : 'center',
        stroke: '#ffffff',
        strokeThickness: 2,
        lineJoin: 'round',
    });

    console.log(color);

    const text = new PIXI.Text(str, style);

    const normalize = (isSmall) => {
        const size = isSmall === true ? 7*unit.size : 10*unit.size;
        graphics.clear();
        graphics.lineStyle(0, color, 1);
        graphics.beginFill(color, 1);
        graphics.drawRoundedRect(1, 1, size-2, size-2, 0.5*unit.size);
        graphics.endFill();
        text.style.fontSize = isSmall === true ? 2.6*unit.size : 3.6*unit.size;
        text.position.x = 0.5*size - text.width/2;
        text.position.y = 0.27*size;
    }

    container.addChild(graphics);
    container.addChild(text);

    normalize();

    return {
        index,
        value,
        container,
        normalize,
        dupTile: () => Tile({index, allTiles, str, color, unit}),
        nextTile: () => {
            console.log(allTiles, index);
            return allTiles[index+1].dupTile()
        },
        remove: () => container.parent.removeChild(container)
    };
}

export default Tile;
