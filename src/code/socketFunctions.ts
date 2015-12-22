/// <reference path="../definitions/app.d.ts" />

module Catan {

    export class SocketFunctions {

        private _gameObject : Game;
        private _socket : SocketIOClient.Socket;

        constructor(game: Game) {

            this._gameObject = game;
            this._socket = game.socket;

        }

        registerEvents() {

            this.startGame();
            this.newPlayer();
            this.diceRolled();
            this.objectPlaced();
            this.pieceBought();
            this.turnEnded();

        }

        private startGame() {

            this._socket.on('startGame', function(data) {
                Game.gameObject.gameState = data;
            });

        }

        private newPlayer() {

            this._socket.on('newPlayer', function(playerData) {
                var player = new Player(
                    playerData[0].name, playerData[0].color, playerData[0].number, playerData[0].points,
                    playerData[0].playerTurn, playerData[0].diceRolled, playerData[0].resources
                );

                Game.gameObject.players.push(player);
            });

        }

        private diceRolled() {

            this._socket.on('diceRolled', function(data) {
                Game.gameObject.dice = data[0].dice;
                Game.gameObject.gameState = data[0].gameState;
                Game.gameObject.updatePlayers(data[1]);
            });

        }

        private objectPlaced() {

            this._socket.on('objectPlaced', function(data) {
                Game.gameObject.map.grid.updateGrid(data[0]);
                Game.gameObject.updatePlayers(data[1]);
                Game.gameObject.gameState = data[2].gameState;
            });

        }

        private pieceBought() {

            this._socket.on('pieceBought', function(data) {
                Game.gameObject.updatePlayers(data);
            });

        }

        private turnEnded() {

            this._socket.on('turnEnded', function(data) {
                Game.gameObject.gameState = data[0].gameState;
                Game.gameObject.updatePlayers(data[1]);
            });

        }

    }

}
