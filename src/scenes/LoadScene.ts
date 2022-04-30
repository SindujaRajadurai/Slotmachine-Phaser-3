import  config  from "../main"

export default class LoadScene extends Phaser.Scene
{

    bg !: Phaser.GameObjects.Image;


	constructor()
	{
        super({
			key: 'loader',
			pack: {
				files: [
				]
			}
		});
	}

    preload() {	
		 this.load.image("bg", "assets/bg.png");	
		 this.load.atlas('symbols', 'assets/symbols.png', 'assets/symbols.json');
		 this.load.image('slotMachine','assets/slotmachine.png');

		 this.load.image("SpinBtn","assets/Spin.png")

		 this.load.image("bigWin","assets/Win.png")

		 this.load.image("debugBtn","assets/CheatToolInput.png")


		 this.loadProgressBar();


    }

    loadProgressBar() {
     
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.1);
		progressBox.fillRect(
			config.scale.width / 2 - 150,
			config.scale.height / 2 - 30,
			320,
			50
		)

		this.load.on("progress", function (value) {
			progressBar.clear();
			progressBar.fillStyle(0x48beff, 1);
			progressBar.fillRect(
				config.scale.width / 2 - 140,
				config.scale.height / 2 - 20,
				300 * value,
				30
			)
			//percentText.setText(parseInt(value * 100) + " %");
		});

		this.load.on("fileprogress", function (file) { });
		var _self = this;
		this.load.on("complete", function () {
			 progressBar.destroy();
			 progressBox.destroy();
		});
	}

    create() {
        this.scene.start("MainScene");
    }



}


