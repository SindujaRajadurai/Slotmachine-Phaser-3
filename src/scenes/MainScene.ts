import Phaser from 'phaser';

import Symbols from "../utilities/symbols";
import SpinClass from '../utilities/SpinClass';

import EventsManager from "../utilities/EventsManager"

export default class MainScene extends Phaser.Scene
{
	emitter !: any;
	bg !: any;
	slotMachine !: any;

	spinBtn !: any;
	container !: any;
	container2 !: any;
	container3 !: any;

	debugBtn !: any;

	triggerWin !: any;

	constructor()
	{
		super('MainScene')
		this.emitter = EventsManager.getInstance();
		this.triggerWin = false;
	}


	create() 
	{ 
		var _self = this;
		this.bg = this.add.image(this.cameras.main.width * .5 ,this.cameras.main.height * .5,"bg");
		this.slotMachine = this.add.image(this.cameras.main.width * .5,this.cameras.main.height * .47,"slotMachine").setScale(0.85,1.7)

		var container  =  new Symbols(this, this.cameras.main.width * .22, this.cameras.main.height * .57);
        var container2 =  new Symbols(this, this.cameras.main.width * .5,this.cameras.main.height * .57);
        var container3 = new Symbols(this, this.cameras.main.width * .81, this.cameras.main.height * .57);

		new SpinClass(this,container,container2,container3);

		this.debugBtn = this.add.image(this.cameras.main.width * .5,this.cameras.main.height * .15,"debugBtn").setScale(3.5,1.5).setInteractive().on('pointerdown', () => {
			this.triggerWin = true;
			_self.debugBtn.disableInteractive().setAlpha(.5);
		});

		var btnText = this.add.text(this.cameras.main.width * .5, this.cameras.main.height * .15, "TRIGGER WIN").setColor("#FFFFFF").setFontSize(50).setOrigin(0.5);

		
		this.emitter.on("stopSpinning",this.enableSpinning.bind(this))


		this.addSpinBtn();

	}

	enableSpinning() {
		this.spinBtn.setInteractive().setAlpha(1);
		this.debugBtn.setInteractive().setAlpha(1);
	}

	addSpinBtn() {
		var  _self = this;
		this.spinBtn = this.add.image(this.cameras.main.width * .5 ,this.cameras.main.height * .75,"SpinBtn").setScale(1.2).setInteractive().on('pointerdown', () => {
			_self.spinBtn.disableInteractive();
			_self.spinBtn.setAlpha(0.25)
			_self.emitter.emit("spinReels")
		});
	}

}

