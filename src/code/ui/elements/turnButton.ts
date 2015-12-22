/// <reference path="../../../definitions/app.d.ts" />

module Catan {

    export class TurnButton extends UiElementAbstract {

        private _buttonText : Phaser.Text;

        setup() {
            this.fixedToCamera = true;
            this.anchor.set(1, 1);
            this.cameraOffset.setTo(this.gameObject.camera.width - 5, this.gameObject.camera.height - 5);
            this.gameObject.add.existing(this);
            this.addElements();
            this.updateText();
        }

        addElements() {

            this.style.font = "22px Arial";

            var buttonElement = this.addButton(this.x, this.y, 'turnButton', this.processTurn);
            buttonElement.anchor.set(1, 1);

            this._buttonText = this.addText(this.x - this.width / 2, this.y - this.height / 2, this.style, 'Button', {x: 0.5, y: 0.5});

        }

        updateText() {

            this.visible = true;

            if (this.gameObject.player.playerTurn) {
                if (this.gameObject.gameState == 'new') {
                    this._buttonText.setText('Start Game');
                } else if (
                    (
                        this.gameObject.gameState == 'turnOrderPhase' ||
                        this.gameObject.gameState == 'mainPhase'
                    ) &&
                    !this.gameObject.player.diceRolled
                ) {
                    this._buttonText.setText('Roll Dice');
                } else if (this.gameObject.gameState == 'mainPhase' && this.gameObject.player.diceRolled) {
                    this._buttonText.setText('End Turn');
                } else {
                    this.visible = false;
                }
            } else {
                this.visible = false;
            }

        }

        private processTurn() {

            if (this.gameObject.players.length < 1) {
                alert('You need at least two players to start a game');
            } else if (this.gameObject.gameState == 'new') {
                this.gameObject.socket.emit('startGame');
            } else if (this.gameObject.gameState == 'turnOrderPhase') {
                this.gameObject.socket.emit('rollDice');
            } else if (this.gameObject.gameState == 'mainPhase' && this.gameObject.player.playerTurn && !this.gameObject.player.diceRolled) {
                this.gameObject.socket.emit('rollDice');
            } else if (this.gameObject.gameState == 'mainPhase' && this.gameObject.player.playerTurn && this.gameObject.player.diceRolled) {
                this.gameObject.socket.emit('endTurn');
            }

        }

    }

}


