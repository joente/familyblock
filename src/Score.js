import * as PIXI from "pixi.js";

const Score = (state) => {
    const {offset, stage, unit} = state;

    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 32,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: '#eeeeee',
        align : 'center',
        stroke: '#ffffff',
        strokeThickness: 2,
        lineJoin: 'round',
    });

    const text = new PIXI.Text((0).toLocaleString(), style);

    const normalize = () => {
        text.x = offset.x + 30*unit.size - text.width/2;
        text.y = offset.y + 1*unit.size;
    }

    stage.addChild(text);

    return {
        resize: normalize,
        update: (score) => {
            const str = (score).toLocaleString();
            text.text = str;
            normalize();
        }
    };
}

export default Score;
