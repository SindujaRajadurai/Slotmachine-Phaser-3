import EventsManager from "../utilities/EventsManager";
import {CONTAINER_Y_POS,FIRST_Y_POS,LAST_Y_POS,REEL_HEIGHT,NO_OF_REELS,SPIN_DURATION,STOP_DURATION} from "../utilities/Reelconfig";


export default class SpinClass {

    scene !: any;
    emitter !: any;

    columnTween1 !: any;
    columnTween2 !: any;
    columnTween3 !: any;

    container !: any;
    container2 !: any;
    container3 !: any;

    repeat !: Array<any>;
    mainContainer !: Array<any>;


    resultArrOne   !: Array<any>;
    resultArrTwo   !: Array<any>;
    resultArrThree !: Array<any>;

    isTriggerWin !: boolean;

    bigWin !: any;


    constructor(scene,containerOne,containerTwo,containerThree) {
            this.scene = scene;
            this.repeat = [15,5,500];
            this.mainContainer = ['Banana.png','Blackberry.png','Cherry.png'];

            this.resultArrOne = [];
            this.resultArrTwo = [];
            this.resultArrThree = [];

            this.emitter = EventsManager.getInstance();

            this.container = containerOne;
            this.container2 = containerTwo;
            this.container3 = containerThree;

            this.isTriggerWin = false;

            this.emitter.on("spinReels",this.resetContainerPosition.bind(this));
            this.emitter.on("stopSpinning",this.triggerWin.bind(this));
    }


    resetContainerPosition() {
        this.container.first.y = FIRST_Y_POS;
        this.container2.first.y = FIRST_Y_POS;
        this.container3.first.y = FIRST_Y_POS;

        this.container.last.y = LAST_Y_POS;
        this.container2.last.y = LAST_Y_POS;
        this.container3.last.y = LAST_Y_POS;

        this.container.y = CONTAINER_Y_POS;
        this.container2.y = CONTAINER_Y_POS;
        this.container3.y = CONTAINER_Y_POS;


        this.resultArrOne.length = 0;
        this.resultArrTwo.length = 0;
        this.resultArrThree.length = 0;


        this.isTriggerWin = false;


        this.startSpinning();
    }


    startSpinning() {
            var _self = this;
    
            this.columnTween1 = this.scene.tweens.add({
                targets: this.container,
                 y: "+=" + 80, 
                duration: SPIN_DURATION,
                repeat: this.repeat[0],
                onRepeat: function(){
                    _self.columnTween1.updateTo('y', _self.container.y + REEL_HEIGHT, true);
                    const randomNumber = Phaser.Math.RND.between(0, 2);
                    _self.container.first.y = _self.container.last.y - REEL_HEIGHT;
                    const symbol = _self.container.first;
                    const symbolsName = _self.mainContainer[randomNumber];
                    symbol.setVisible(true).setTexture('symbols', symbolsName);
                    _self.container.moveTo(symbol, 2);
                },
                onComplete: function() {
                    _self.playCompleteTweenOne();
                }
            });
    
    
            this.columnTween2 = this.scene.tweens.add({
                targets: this.container2,
                y: "+=" + 80, 
                duration: SPIN_DURATION ,
                repeat: this.repeat[0],
                onRepeat: function(){
                    _self.columnTween2.updateTo('y', _self.container2.y + REEL_HEIGHT, true);
                    _self.container2.first.y = _self.container2.last.y - REEL_HEIGHT;
                    const symbol = _self.container2.first;
                    const randomNumber = Phaser.Math.RND.between(0, 2);
                    const symbolsName = _self.mainContainer[randomNumber];
                    symbol.setVisible(true).setTexture('symbols', symbolsName);
                    _self.container2.moveTo(symbol, 2);
                }
            });
    
            this.columnTween3 = this.scene.tweens.add({
                targets: this.container3,
                y: "+=" + 80, 
                duration: SPIN_DURATION,
                repeat: this.repeat[0],
                onRepeat: function(){
                    _self.columnTween3.updateTo('y', _self.container3.y + REEL_HEIGHT, true);
                    _self.container3.first.y = _self.container3.last.y - REEL_HEIGHT;
                    const symbol = _self.container3.first;
                    const randomNumber = Phaser.Math.RND.between(0, 2);
                    const symbolsName = _self.mainContainer[randomNumber];
                    symbol.setVisible(true).setTexture('symbols', symbolsName);
                    _self.container3.moveTo(symbol, 2);
                }
            })
    }

    playCompleteTweenOne(){
		var _self = this;
		this.scene.tweens.add({
			targets: this.container,
			y: "-=" + 50,
			duration: STOP_DURATION,
			repeat: 1,
			onRepeat : function () {
				_self.columnTween1.updateTo('y', _self.container.y - 50, true);
			},
			onComplete : function() {
				_self.container.last.y =  _self.container.first.y - (REEL_HEIGHT * 2);
				const symbol = _self.container.last;
				_self.container.moveTo(symbol, 0);
				for (let i = 0; i < NO_OF_REELS; i++) {
					const randomNumber = Phaser.Math.RND.between(0, 2);
                    _self.resultArrOne.push(randomNumber);
					const symbolsName = _self.mainContainer[randomNumber] ;
					_self.container.list[i].setTexture('symbols', symbolsName);
				}
				_self.playCompleteTweenTwo();
			}
		})
	}

	playCompleteTweenTwo() {
		var _self = this;
		_self.scene.tweens.add({
			targets : _self.container2,
			y: "-=" + 80, 
			duration: STOP_DURATION,
			repeat : 1,
			onRepeat : function() {
				_self.columnTween2.updateTo('y', _self.container2.y - 50, true);
			},
			onComplete : function() {
                var randomNumber;
				_self.container2.last.y =  _self.container2.first.y - (REEL_HEIGHT * 2);
				const symbol = _self.container2.last;
				_self.container2.moveTo(symbol, 0);
				for (let i = 0; i < NO_OF_REELS; i++) {
                    if(i == 1) {
                    if(!_self.scene.triggerWin){
				     randomNumber = Phaser.Math.RND.between(0, 2);
                    } else {
                     randomNumber = _self.resultArrOne[i]
                    }
                } else {
                    randomNumber = Phaser.Math.RND.between(0, 2);
                }
                    _self.resultArrTwo.push(randomNumber);
					const symbolsName = _self.mainContainer[randomNumber] ;
					_self.container2.list[i].setTexture('symbols', symbolsName);
				}
                _self.playCompleteTweenThree();
			}
		});  
	}

    playCompleteTweenThree(){
        var _self  =this;
        this.scene.tweens.add({
            targets : this.container3,
            y: "-=" + STOP_DURATION, 
            duration: 200,
            repeat : 1,
            onRepeat : function() {
                _self.columnTween3.updateTo('y', _self.container3.y - 50, true);
            },
            onComplete : function() {
                var randomNumber;
                _self.container3.last.y = _self.container3.first.y  - (REEL_HEIGHT * 2);
                const symbol = _self.container3.last;
                _self.container3.moveTo(symbol, 0);
                //set texture symbols
                for (let i = 0; i < NO_OF_REELS; i++) {
                    if(i == 1) {
                        if(!_self.scene.triggerWin){
                         randomNumber = Phaser.Math.RND.between(0, 2);
                        } else {
                         randomNumber = _self.resultArrOne[i]
                        }

                    } else {
                        randomNumber = Phaser.Math.RND.between(0, 2);
                    }
                    _self.resultArrThree.push(randomNumber);
                    const symbolsName = _self.mainContainer[randomNumber];
                    _self.container3.list[i].setTexture('symbols', symbolsName);
                }

                _self.emitter.emit("stopSpinning")
            }
        }); 

        
    }


    triggerWin() {

        this.scene.triggerWin = false;

        for(let i =0;i<this.resultArrOne.length;i++) {
            if(this.resultArrOne[i] == this.resultArrTwo[i])  {
                 if( this.resultArrTwo[i] == this.resultArrThree[i]){
                this.isTriggerWin = true;
            }
        }
        }

        if(this.isTriggerWin) {
            var _self = this;
            this.bigWin = this.scene.add.image(this.scene.cameras.main.width * .5 ,this.scene.cameras.main.height * .5,"bigWin").setScale(0);
            var tweenPlayBtn = this.scene.tweens.add({
                targets: this.bigWin,
                scale: 1,
                ease: "power",
                duration: 500,
                delay: 1000,
                onComplete : function() {
                    _self.bigWin.destroy();
                }
            });
        }
    }

}

