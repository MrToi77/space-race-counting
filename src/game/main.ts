import Boot from './scenes/Boot';
import GameOver from './scenes/GameOver';
import MainGame from './scenes/Game';
import MainMenu from './scenes/MainMenu';
import Preloader from './scenes/Preloader';
import { AUTO, Game } from 'phaser';
import { YourScene } from './scenes/TestScene';
import ShapeScene from './scenes/TestSvg';
import PlayScene from './scenes/PlayScene';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 780,
    height: 700,
    parent: 'game-container',
    backgroundColor: '#ffffff',
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade", 
        arcade: {
            gravity: {x: 0, y: 0 }, 
            debug: false, 
        }
    },
    scene: [
        Boot,
        Preloader,
        PlayScene,
        MainMenu,
        MainGame,
        GameOver
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
