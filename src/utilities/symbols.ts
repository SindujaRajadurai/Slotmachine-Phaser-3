export default class Symbols extends Phaser.GameObjects.Container {
    scene !: any;
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.add.existing(this);
        this.scene = scene;
        const symbols1 = scene.add.sprite(0, 0, 'symbols',  this.returnRandomSymbol() + '.png').setScale(0.75);
         const symbols2 = scene.add.sprite(0, - 200, 'symbols',  this.returnRandomSymbol() + '.png').setScale(0.75);
         const symbols3 = scene.add.sprite(0, - 200 * 2, 'symbols', + this.returnRandomSymbol() + '.png').setScale(0.75);
        this.add([symbols1,symbols2,symbols3]);
    }

    returnRandomSymbol(){
        var SymbStrArr = ["Banana","Blackberry","Cherry"]
        var randomNumber = Math.floor(Math.random()*SymbStrArr.length)
        return SymbStrArr[randomNumber];
    }


 

}

