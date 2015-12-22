/// <reference path="../../definitions/app.d.ts" />

module Catan {

    export class Grid {

        private _gridObjects:Array<GridElement>;
        private _buildingObjects:Phaser.Group;
        private _roadObjects:Phaser.Group;
        private _game:Game;
        private _map:HexMap;
        private _players:Array<Player>;
        private _player:Player;
        private _placementType:string;

        constructor(game:Game, map:HexMap, players:Array<Player>, player:Player) {

            this._game = game;
            this._map = map;
            this._gridObjects = [];
            this._buildingObjects = game.add.group();
            this._roadObjects = game.add.group();
            this._players = players;
            this._player = player;
            this._placementType = null;

        }

        public get buildingObjects():Phaser.Group {
            return this._buildingObjects;
        }

        public set buildingObjects(value:Phaser.Group) {
            this._buildingObjects = value;
        }

        public get roadObjects():Phaser.Group {
            return this._roadObjects;
        }

        public set roadObjects(value:Phaser.Group) {
            this._roadObjects = value;
        }

        public get gridObjects():Array<GridElement> {
            return this._gridObjects;
        }

        public set gridObjects(value:Array<GridElement>) {
            this._gridObjects = value;
        }

        get placementType():string {
            return this._placementType;
        }

        set placementType(value:string) {
            this._placementType = value;
        }

        buildFromData(gridData:Array<any>) {

            gridData.forEach(function (gridObject) {
                this.addGraphicElement(gridObject);
            }, this);

            this._game.world.bringToTop(this._roadObjects);
            this._game.world.bringToTop(this._buildingObjects);

            this.hidePlacementTiles();

        }

        placementPhase() {

            if (this._game.player.pieces.settlements.length == 0) {
                this.townPlacement(true);
                this._placementType = 'settlement';
            } else if (this._game.player.pieces.settlements.length == 1 && this._game.player.pieces.roads.length == 0) {
                this.roadPlacement();
                this._placementType = 'road';
            } else if (this._game.player.pieces.settlements.length == 1 && this._game.player.pieces.roads.length == 1) {
                this.townPlacement(true);
                this._placementType = 'settlement';
            } else {
                this.roadPlacement();
                this._placementType = 'road';
            }

        }

        hidePlacementTiles() {

            this._gridObjects.forEach(function (gridElement:GridElement, index) {
                if (gridElement.owningPlayer == null) {
                    gridElement.sprite.visible = false;
                    this._gridObjects[index] = gridElement;
                } else {
                    gridElement.sprite.visible = true;
                    this._gridObjects[index] = gridElement;
                }
            }, this);

        }

        updateGrid(gridData:Array<any>) {

            gridData.forEach(function (gridObject) {
                this.gridObjects.forEach(function (gridElement:GridElement, index) {
                    if (gridObject.serverIndex == gridElement.serverIndex) {

                        if (gridElement.playerPieceType != gridObject.playerPieceType) {
                            this.updateSpriteGraphics(gridElement.sprite, gridObject.playerPieceType, gridObject.owningPlayer);
                        }

                        if (gridObject.owningPlayer != null) {
                            gridElement.sprite.visible = true;
                        }

                        gridElement.sprite.x = gridObject.x;
                        gridElement.sprite.y = gridObject.y;
                        gridElement.type = gridObject.type;
                        gridElement.sprite.angle = gridObject.angle;
                        gridElement.sprite.anchor.set(gridObject.anchorX, gridObject.anchorY);
                        gridElement.owningPlayer = gridObject.owningPlayer;
                        gridElement.playerPieceType = gridObject.playerPieceType;
                        gridElement.links = gridObject.links;
                        gridElement.resources = gridObject.resources;

                        this.gridObjects[index] = gridElement;
                    }
                }, this);
            }, this);

        }

        roadPlacement() {

            this._gridObjects.forEach(function (gridElement:GridElement) {
                if (gridElement.owningPlayer == this._game.player.number && gridElement.type == 'building') {
                    gridElement.links.forEach(function (link) {
                        var linkedGridElement = this.gridObjects[link];

                        if (linkedGridElement.owningPlayer == null) {
                            linkedGridElement.sprite.visible = true;
                            this._gridObjects[link] = linkedGridElement;
                        }
                    }, this);
                }
            }, this);

        }

        townPlacement(showAll:boolean = false) {

            if (showAll) {
                this._gridObjects.forEach(function (gridElement:GridElement, index) {
                    if (gridElement.owningPlayer == null && gridElement.type == 'building') {
                        gridElement.sprite.visible = true;
                        this._gridObjects[index] = gridElement;
                    }
                }, this);
            } else {
                this._gridObjects.forEach(function (gridElement:GridElement, index) {
                    if (gridElement.owningPlayer == this._game.player.number && gridElement.type == 'road') {
                        gridElement.links.forEach(function (link) {
                            var linkedGridElement = this.gridObjects[link];

                            if (!this.isPlacementBlocked(linkedGridElement)) {
                                linkedGridElement.sprite.visible = true;
                                this._gridObjects[link] = linkedGridElement;
                            }
                        }, this);
                    }
                }, this);
            }

        }

        cityPlacement() {

            this._gridObjects.forEach(function (gridElement:GridElement) {
                if (gridElement.owningPlayer == this._game.player.number && gridElement.type == 'building' && gridElement.playerPieceType == 'settlement') {
                    gridElement.sprite.inputEnabled = true;
                    gridElement.sprite.input.useHandCursor = true;
                    gridElement.sprite.events.onInputDown.add(this.mouseClick, this, 0, gridElement.type);
                }
            }, this);

        }

        private updateSpriteGraphics(sprite:Phaser.Sprite, playerPieceType:string, playerNumber:number) {

            var player:Player = this._game.getPlayer(playerNumber);

            switch (playerPieceType) {
                case 'road':
                    sprite.loadTexture('roads', player.color + 'Road');
                    break;
                case 'settlement':
                    sprite.loadTexture('buildings', player.color + 'Village');
                    break;
                case 'city':
                    sprite.loadTexture('buildings', player.color + 'City');
                    break;
                default:
                    break;
            }

        }

        private isPlacementBlocked(elementToCheck:GridElement) {

            elementToCheck.links.forEach(function (link) {
                var linkedGridElement = this.gridObjects[link];

                if (linkedGridElement.owningPlayer != this._game.player.number) {
                    return true;
                } else if (linkedGridElement.owningPlayer == null) {
                    return false;
                } else {
                    return false;
                }

            }, this);

        }

        private addGraphicElement(gridObject) {

            var element;
            var gridElement = new GridElement();
            var playerObject = null;

            if (gridObject.owningPlayer != null) {
                this._players.forEach(function (player) {
                    if (player.number == gridObject.owningPlayer) {
                        playerObject = player;
                    }
                });
            }

            gridElement.type = gridObject.type;
            gridElement.links = gridObject.links;
            gridElement.serverIndex = gridObject.serverIndex;
            gridElement.playerPieceType = gridObject.playerPieceType;
            gridElement.owningPlayer = gridObject.owningPlayer;

            if (gridObject.type == "building") {
                if (playerObject != null) {
                    var pieceType = null;
                    if (gridElement.playerPieceType == 'settlement') {
                        pieceType = 'Village';
                    } else {
                        pieceType = 'City';
                    }
                    switch (playerObject.color) {
                        case 'blue':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "buildings", "blue" + pieceType);
                            break;
                        case 'red':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "buildings", "red" + pieceType);
                            break;
                        case 'green':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "buildings", "green" + pieceType);
                            break;
                        case 'yellow':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "buildings", "yellow" + pieceType);
                            break;
                    }
                } else {
                    element = this._game.add.sprite(gridObject.x, gridObject.y, "circle");
                }
                element.anchor.set(gridObject.anchorX, gridObject.anchorY);

                gridElement.resources = gridObject.resources;

                this._buildingObjects.add(element);
            } else {
                if (playerObject != null) {
                    switch (playerObject.color) {
                        case 'blue':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "roads", "blueRoad");
                            break;
                        case 'red':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "roads", "redRoad");
                            break;
                        case 'green':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "roads", "greenRoad");
                            break;
                        case 'yellow':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "roads", "yellowRoad");
                            break;
                    }
                } else {
                    element = this._game.add.sprite(gridObject.x, gridObject.y, "road");
                }
                element.anchor.set(gridObject.anchorX, gridObject.anchorY);
                element.angle = gridObject.angle;

                if (gridElement.serverIndex == 49) {
                    console.log(gridElement);
                }

                this._roadObjects.add(element);
            }

            if (gridElement.owningPlayer == null) {
                element.inputEnabled = true;
                element.input.useHandCursor = true;
                element.events.onInputDown.add(this.mouseClick, this, 0, gridElement.type);
            }

            gridElement.sprite = element;
            this._gridObjects.push(gridElement);
        }

        private mouseClick(sprite:Phaser.Sprite, event, type) {

            var placementValid = null;

            this.gridObjects.forEach(function (gridElement:GridElement) {
                if (
                    sprite.z == gridElement.sprite.z &&
                    type == gridElement.type &&
                    (
                        gridElement.owningPlayer == null ||
                        gridElement.owningPlayer == this._game.player.number
                    ) &&
                    sprite.visible == true
                ) {
                    this._game.socket.emit('placeObject', [gridElement.serverIndex, this._game.player.number, this._placementType], function (data) {
                        placementValid = data;

                        if (!placementValid) {
                            alert('You cannot place a ' + type + ' here');
                        } else {
                            if (Game.gameObject.map.grid.placementType == 'city') {
                                Game.gameObject.map.grid.gridObjects.forEach(function (gridElementInner:GridElement) {
                                    if (gridElementInner.playerPieceType == 'settlement') {
                                        gridElementInner.sprite.events.onInputDown.removeAll();
                                        gridElementInner.sprite.inputEnabled = false;
                                        gridElementInner.sprite.input.useHandCursor = false;
                                    }
                                });
                            }

                            gridElement.sprite.events.onInputDown.removeAll();
                            gridElement.sprite.inputEnabled = false;
                            gridElement.sprite.input.useHandCursor = false;

                            Game.gameObject.map.grid.hidePlacementTiles();

                            Game.gameObject.placementAllowed = false;

                            if (Game.gameObject.gameState == 'placementPhase') {
                                if (Game.gameObject.player.pieces.settlements.length == 1 && Game.gameObject.player.pieces.roads.length == 1) {
                                    Game.gameObject.socket.emit('endTurn');
                                } else if (Game.gameObject.player.pieces.settlements.length == 2 && Game.gameObject.player.pieces.roads.length == 2) {
                                    Game.gameObject.socket.emit('endTurn');
                                }
                            }

                        }
                    });
                }
            }, this);

        }

    }

}
