import './index.css';
import * as serviceWorker from './serviceWorker';
import Game from "./Game";

const game = Game({
    container: document.body
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


window.addEventListener('resize', game.resize);

game.animate();
