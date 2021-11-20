const AnimateMoveUp = (state) => {
    const {tile, toCell, unit} = state;

    let move = {
        target: 0,
        speed: -1,
    }

    const normalize = () => {
        move.target = toCell.getYpos();
        move.speed = -5.0*unit.size;
        tile.width = 10*unit.size;
        tile.height = 10*unit.size;
    }

    normalize();

    const animate = () => {
        tile.container.position.y += move.speed;
        if (tile.container.position.y <= move.target) {
            toCell.setTile(tile);
            return true;  // finished
        }
        return false;  // not finished
    }
    return {
        animate,
        normalize,
    };
}

export default AnimateMoveUp;