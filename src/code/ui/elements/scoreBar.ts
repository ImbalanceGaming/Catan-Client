/// <reference path="../../../definitions/app.d.ts" />

module Catan {

    export class ScoreBar extends UiElementAbstract {

        private _player1Score:Phaser.Text;
        private _player2Score:Phaser.Text;
        private _player3Score:Phaser.Text;
        private _player4Score:Phaser.Text;
        private _lastAddedElement: any;

        setup() {
            this.fixedToCamera = true;
            this.cameraOffset.setTo(0, 0);
            this.gameObject.add.existing(this);
            this.addElements();
        }

        addElements() {

            this._lastAddedElement = this.addText(this.width / 2, this.y + 10, this.style, 'Score', {x:0.5, y:0});

            this._lastAddedElement = this.addPlayerScore(this._lastAddedElement, this.gameObject.player, this.style);

            this.gameObject.players.forEach(function (player:Player) {
                if (player.number != this.gameObject.player.number) {
                    this._lastAddedElement = this.addPlayerScore(this._lastAddedElement, player, this.style);
                }
            }, this);

        }

        private addPlayerScore(lastAddedElement, player:Player, style: {}) {

            var playerName;

            if (this.gameObject.player.number == player.number) {
                playerName = 'You';
            } else {
                playerName = 'Player ' + player.number;
            }

            switch (player.color) {
                case 'blue':
                    lastAddedElement = this.addSprite(this.x + 10, lastAddedElement.y + lastAddedElement.height + 5, 'buildings', 'blueVillage');
                    break;
                case 'red':
                    lastAddedElement = this.addSprite(this.x + 10, lastAddedElement.y + lastAddedElement.height + 5, 'buildings', 'redVillage');
                    break;
                case 'green':
                    lastAddedElement = this.addSprite(this.x + 10, lastAddedElement.y + lastAddedElement.height + 5, 'buildings', 'greenVillage');
                    break;
                case 'yellow':
                    lastAddedElement = this.addSprite(this.x + 10, lastAddedElement.y + lastAddedElement.height + 5, 'buildings', 'yellowVillage');
                    break;
            }

            var playerScore = this.addText(lastAddedElement.x + lastAddedElement.width + 5, lastAddedElement.y, style, playerName + ' = ' + player.points);

            switch (player.number) {
                case 1:
                    this._player1Score = playerScore;
                    break;
                case 2:
                    this._player2Score = playerScore;
                    break;
                case 3:
                    this._player3Score = playerScore;
                    break;
                case 4:
                    this._player4Score = playerScore;
                    break;
            }

            return lastAddedElement;

        }

        updateText() {

            var playerName;

            this.gameObject.players.forEach(function (player:Player) {
                if (this.gameObject.player.number == player.number) {
                    playerName = 'You';
                } else {
                    playerName = 'Player ' + player.number;
                }

                switch (player.number) {
                    case 1:
                        this._player1Score.setText(playerName + ' = ' + player.points);
                        break;
                    case 2:
                        if (typeof this._player2Score == 'undefined') {
                            this._lastAddedElement = this.addPlayerScore(this._lastAddedElement, player, this.style);
                        }
                        this._player2Score.setText(playerName + ' = ' + player.points);
                        break;
                    case 3:
                        if (typeof this._player3Score == 'undefined') {
                            this._lastAddedElement = this.addPlayerScore(this._lastAddedElement, player, this.style);
                        }
                        this._player3Score.setText(playerName + ' = ' + player.points);
                        break;
                    case 4:
                        if (typeof this._player4Score == 'undefined') {
                            this._lastAddedElement = this.addPlayerScore(this._lastAddedElement, player, this.style);
                        }
                        this._player4Score.setText(playerName + ' = ' + player.points);
                        break;
                }
            }, this);


        }

    }

}
