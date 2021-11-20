const Highlight = (state) => {
    const {offset, ok, nok, unit} = state;

    let sprite = ok;
    let col = null;

    const normalize = () => {
        if (col === null) {
            ok.visible = false;
            nok.visible = false;
            return;
        }
        sprite.visible = true;
        sprite.position.x = offset.x + 4*unit.size + col*10*unit.size;
        sprite.position.y = offset.y + 9*unit.size;
        sprite.width = 12*unit.size;
        sprite.height = 72*unit.size;
    }

    return {
        normalize,
        update: (newCol, newSprite) => {
            col = newCol;
            if (sprite) {
                sprite.visible = false;
            }
            sprite = newSprite;
            normalize();
        }
    };
};

export default Highlight;