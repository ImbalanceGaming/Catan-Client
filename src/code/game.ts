/// <reference path="../definitions/app.d.ts" />

module Catan {

    export class Game extends Phaser.State {
        map:HexMap;
        camera:Camera;
        ui:UiFactory;

        socket:SocketIOClient.Socket;
        socketFunctions:SocketFunctions;
        serverData:any;

        players:Array<Player>;
        player:Player;

        gameName:string;
        gameState:string;
        dice:any;
        placementAllowed: boolean;
        placementType: string;

        static gameObject:Game;

        init(socket:SocketIOClient.Socket, serverData:any, playerNo:number) {
            this.socket = socket;
            this.serverData = serverData;
            this.gameState = serverData.gameState;
            this.gameName = serverData.gameName;
            this.players = [];
            this.dice = serverData.dice;
            this.placementAllowed = false;
            this.placementType = null;

            this.serverData.players.forEach(function (player) {
                var playerObject = new Player(
                    player.name, player.color, player.number, player.points,
                    player.playerTurn, player.diceRolled, player.resources
                );

                if (playerObject.number == playerNo) {
                    this.player = playerObject;
                    player.pieces.roads.forEach(function (piece) {
                        this.player.pieces.addPiece(piece.id, piece.type, piece.state);
                    }, this);

                    player.pieces.settlements.forEach(function (piece) {
                        this.player.pieces.addPiece(piece.id, piece.type, piece.state);
                    }, this);

                    player.pieces.cities.forEach(function (piece) {
                        this.player.pieces.addPiece(piece.id, piece.type, piece.state);
                    }, this);
                }
                this.players.push(playerObject);
            }, this);

        }

        create() {

            this.map = new HexMap(this, this.serverData.mapData, this.players, this.player);
            this.camera = new Camera(this.camera, this.map);
            this.ui = new UiFactory(this);
            this.socketFunctions = new SocketFunctions(this);

            this.camera.setupCamera();
            this.game.input.mouse.capture = true;

            this.game.input.mouse.mouseWheelCallback = Game.mouseWheelHandler;

            this.ui.setupUI();

            this.socketFunctions.registerEvents();

        }

        update() {

            Game.gameObject = this;

            if (this.game.input.mousePointer.middleButton.isDown) {
                this.camera.cameraPan();
            }

            this.ui.updateElements();

            if (this.gameState == 'placementPhase' && this.player.playerTurn) {
                this.map.grid.placementPhase();
            } else if (this.gameState == 'mainPhase' && this.player.playerTurn && this.placementAllowed) {
                switch (this.placementType) {
                    case 'road':
                        this.map.grid.roadPlacement();
                        this.map.grid.placementType = this.placementType;
                        break;
                    case 'settlement':
                        this.map.grid.townPlacement();
                        this.map.grid.placementType = this.placementType;
                        break;
                    case 'city':
                        this.map.grid.cityPlacement();
                        this.map.grid.placementType = this.placementType;
                        break;
                }
            } else {
                this.map.grid.hidePlacementTiles();
            }

            if (this.gameState == 'endPhase') {

            }

        }

        static mouseWheelHandler(event:MouseEvent) {
            Game.gameObject.camera.changeScale();
        }

        updatePlayers(players) {

            players.forEach(function (playerData) {
                var indexToUpdate = null;
                var playerObject = null;

                this.players.forEach(function (player, index) {

                    if (playerData.number == player.number) {
                        indexToUpdate = index;
                        playerObject = player;
                        playerObject.name = playerData.name;
                        playerObject.color = playerData.color;
                        playerObject.number = playerData.number;
                        playerObject.points = playerData.points;
                        playerObject.playerTurn = playerData.playerTurn;
                        playerObject.diceRolled = playerData.diceRolled;
                        playerObject.resources = playerData.resources;

                        if (playerData.number == this.player.number) {
                            var pieceFound = false;

                            playerData.pieces.roads.forEach(function (pieceData) {
                                pieceFound = false;
                                player.pieces.roads.forEach(function (piece, roadIndex) {
                                    if (piece.id == pieceData.id) {
                                        pieceFound = true;
                                        player.pieces.roads[roadIndex].state = pieceData.state;
                                    }
                                }, this);

                                if (!pieceFound) {
                                    this.player.pieces.addPiece(pieceData.id, pieceData.type, pieceData.state);
                                }
                            }, this);

                            playerData.pieces.settlements.forEach(function (pieceData) {
                                pieceFound = false;
                                player.pieces.settlements.forEach(function (piece, settlementIndex) {
                                    if (piece.id == pieceData.id) {
                                        pieceFound = true;
                                        player.pieces.settlements[settlementIndex].state = pieceData.state;
                                    }
                                }, this);

                                if (!pieceFound) {
                                    this.player.pieces.addPiece(pieceData.id, pieceData.type, pieceData.state);
                                }
                            }, this);

                            if (player.pieces.settlements.length > playerData.pieces.settlements.length) {
                                player.pieces.settlements.splice(0, 1);
                            }

                            playerData.pieces.cities.forEach(function (pieceData) {
                                pieceFound = false;
                                player.pieces.cities.forEach(function (piece, cityIndex) {
                                    if (piece.id == pieceData.id) {
                                        pieceFound = true;
                                        player.pieces.cities[cityIndex].state = pieceData.state;
                                    }
                                }, this);

                                if (!pieceFound) {
                                    this.player.pieces.addPiece(pieceData.id, pieceData.type, pieceData.state);
                                }
                            }, this);

                            this.player = playerObject;
                        }

                        this.players[index] = playerObject;
                    }
                }, this);

            }, this);

        }

        getPlayer(playerNumber:number) {

            var playerObject = null;

            this.players.forEach(function (player:Player) {
                if (playerNumber == player.number) {
                    playerObject = player;
                }
            }, this);

            return (playerObject != null)?playerObject:null;

        }

    }

}



