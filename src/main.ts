import Phaser from 'phaser'
import MainScene from './scenes/MainScene';
import LoadScene from './scenes/LoadScene';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.WEBGL,
	width: 1080,
	height: 2100,
    transparent: true,
	antialias: true,
	scale: {
		 mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
		 autoCenter: Phaser.Scale.CENTER_BOTH,
		 width: 1080,
		 height: 2100
	}, 
	loader: {
		crossOrigin: undefined
	},
	scene: [LoadScene,    
			MainScene],
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 0 }
		}
	}
}

export default new Phaser.Game(config)


