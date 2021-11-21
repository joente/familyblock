const AnimateMerge = (state) => {
    const {tile, withCell, direction, unit} = state;

    let move = {
        target: 0,
        speed: 0,
    }

    const normalize = () => {
        switch (direction) {
        case "up":
            move.target = withCell.getYpos();
            break;
        case "right":
        case "left":
            move.target = withCell.getXpos();
            break;
        default:
            console.log("unknown direction: ", direction);
        }

        move.speed = 1*unit.size;  // normal speed; 1
        tile.width = 10*unit.size;
        tile.height = 10*unit.size;
    }

    normalize();

    const animate = () => {
        let done = false;

        switch (direction) {
        case "up":
            tile.container.position.y += move.speed;
            done = tile.container.position.y >= move.target;
            break;
        case "right":
            tile.container.position.x += move.speed;
            done = tile.container.position.x >= move.target;
            break;
        case "left":
            tile.container.position.x -= move.speed;
            done = tile.container.position.x <= move.target;
            break;
        default:
            console.log("unknown direction: ", direction);
        }
        if (done) {
            tile.remove();
            withCell.nextTile();
            return true;  // finished
        }
        return false;  // not finished
    }
    return {
        animate,
        normalize,
    };
}

export default AnimateMerge;