/// <reference path="../../../definitions/app.d.ts" />

module Catan {

    export class DiceBar extends UiElementAbstract {

        private _dice1 : Phaser.Text;
        private _dice2 : Phaser.Text;

        setup() {
            this.fixedToCamera = true;
            this.anchor.set(1, 0);
            this.cameraOffset.setTo(this.gameObject.camera.width, 0);
            this.gameObject.add.existing(this);
            this.addElements();
        }

        addElements() {

            var lastElement;

            lastElement = this.addText(this.x - this.width + 15, this.y + this.height / 2, this.style, 'Dice', {x:0, y:0.5});
            if (this.gameObject.dice.one > 9) {
                this._dice1 = lastElement = this.addText(lastElement.x + lastElement.width + 22, lastElement.y, this.style, this.gameObject.dice.one, {x:0, y:0.5});
                if (this.gameObject.dice.two > 9) {
                    this._dice2 = lastElement = this.addText(lastElement.x + lastElement.width + 22, lastElement.y, this.style, this.gameObject.dice.two, {x:0, y:0.5});
                } else {
                    this._dice2 = lastElement = this.addText(lastElement.x + lastElement.width + 25, lastElement.y, this.style, this.gameObject.dice.two, {x:0, y:0.5});
                }
            } else {
                this._dice1 = lastElement = this.addText(lastElement.x + lastElement.width + 30, lastElement.y, this.style, this.gameObject.dice.one, {x:0, y:0.5});
                if (this.gameObject.dice.two > 9) {
                    this._dice2 = lastElement = this.addText(lastElement.x + lastElement.width + 22, lastElement.y, this.style, this.gameObject.dice.two, {x:0, y:0.5});
                } else {
                    this._dice2 = lastElement = this.addText(lastElement.x + lastElement.width + 30, lastElement.y, this.style, this.gameObject.dice.two, {x:0, y:0.5});
                }

            }



        }

        updateText() {

            this._dice1.setText(this.gameObject.dice.one);
            this._dice2.setText(this.gameObject.dice.two);

        }

    }

}
