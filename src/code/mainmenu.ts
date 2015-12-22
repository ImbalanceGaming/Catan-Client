/// <reference path="../definitions/app.d.ts" />

module Catan {

    export class MainMenu extends Phaser.State {

        background:Phaser.Sprite;
        newGameButton:Phaser.Sprite;
        joinGameButton:Phaser.Sprite;
        socket:SocketIOClient.Socket;
        serverData:any;
        playerNo:number;

        create() {

            this.socket = io.connect('http://localhost:3000');
            //this.socket = io.connect('http://192.168.0.15:3000');

            this.background = this.add.sprite(0, 0, 'menuBackground');
            this.background.alpha = 0;

            this.newGameButton = this.add.sprite(0, 0, 'menuButtons');
            this.newGameButton.frameName = 'createGameUp';
            this.newGameButton.anchor.set(0.5, 0.5);
            this.newGameButton.position.set(this.game.world.centerX + 28, this.game.world.centerY + 150);
            this.newGameButton.alpha = 0;

            this.joinGameButton = this.add.sprite(0, 0, 'menuButtons');
            this.joinGameButton.frameName = 'joinGameUp';
            this.joinGameButton.anchor.set(0.5, 0.5);
            this.joinGameButton.position.set(this.newGameButton.x, this.newGameButton.y + this.joinGameButton.height + 5);
            this.joinGameButton.alpha = 0;

            var backgroundTween = this.add.tween(this.background).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
            backgroundTween.onComplete.add(function () {
                this.newGameButton.alpha = 1;
                this.joinGameButton.alpha = 1;

                this.newGameButton.events.onInputUp.add(this.newGame, this);
                this.newGameButton.inputEnabled = true;
                this.newGameButton.input.useHandCursor = true;

                this.joinGameButton.events.onInputUp.add(this.joinGame, this);
                this.joinGameButton.inputEnabled = true;
                this.joinGameButton.input.useHandCursor = true;
            }, this);

            this.game.input.mouse.capture = true;

        }

        update() {

            this.newGameButton.events.onInputDown.add(function () {
                this.newGameButton.frameName = 'createGameDown';
            }, this);
            this.newGameButton.events.onInputUp.add(function () {
                this.newGameButton.frameName = 'createGameUp';
            }, this);
            this.newGameButton.events.onInputOut.add(function () {
                this.newGameButton.frameName = 'createGameUp';
            }, this);

            this.joinGameButton.events.onInputDown.add(function () {
                this.joinGameButton.frameName = 'joinGameDown';
            }, this);
            this.joinGameButton.events.onInputUp.add(function () {
                this.joinGameButton.frameName = 'joinGameUp';
            }, this);
            this.joinGameButton.events.onInputOut.add(function () {
                this.joinGameButton.frameName = 'joinGameUp';
            }, this);

        }

        fadeOut() {

            var tween = this.add.tween(this.background).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);

            this.newGameButton.alpha = 0;
            this.newGameButton.inputEnabled = false;
            this.newGameButton.input.useHandCursor = false;
            this.joinGameButton.alpha = 0;
            this.joinGameButton.inputEnabled = false;
            this.joinGameButton.input.useHandCursor = false;
            tween.onComplete.add(this.startGame, this);

        }

        newGame() {

            var mainMenu = this;
            this.socket.emit('newGame', function (data) {
                if (data == 'Already in active game') {
                    alert('Already in an active game please use join game.');
                } else {
                    mainMenu.serverData = data.serverData;
                    mainMenu.playerNo = data.playerNo;
                    mainMenu.fadeOut();
                }
            });

        }

        joinGame() {

            var mainMenu = this;
            this.socket.emit('joinGame', function (data) {
                if (data == 'No Games') {
                    alert(data);
                } else {
                    mainMenu.serverData = data.serverData;
                    mainMenu.playerNo = data.playerNo;
                    mainMenu.fadeOut();
                }
            });

        }

        startGame() {
            this.game.state.start('Game', true, false, this.socket, this.serverData, this.playerNo);
        }

    }

}
