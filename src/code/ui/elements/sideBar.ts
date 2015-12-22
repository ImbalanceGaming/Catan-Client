/// <reference path="../../../definitions/app.d.ts" />

module Catan {

    export class SideBar extends UiElementAbstract {

        private _roadsTotal         : number;
        private _settlementsTotal   : number;
        private _citiesTotal        : number;
        private _roadsBought        : number;
        private _settlementsBought  : number;
        private _citiesBought       : number;

        private _roadText           : Phaser.Text;
        private _settlementText     : Phaser.Text;
        private _cityText           : Phaser.Text;

        setup() {
            //this._roadsTotal = 15;
            //this._settlementsTotal = 5;
            //this._citiesTotal = 4;
            //this._roadsBought = 0;
            //this._settlementsBought = 0;
            //this._citiesBought = 0;

            this._roadText = null;
            this._settlementText = null;
            this._cityText = null;

            this.fixedToCamera = true;
            this.anchor.set(1, 0.5);
            this.cameraOffset.setTo(this.gameObject.camera.width, this.gameObject.camera.height / 2);
            this.gameObject.add.existing(this);
            this.setupPieceInfo();
            this.addElements();
        }

        addElements() {

            this.style.font = "24px Arial";

            var fistOfRowAdded;
            var lastAdded;
            var x = this.x - this.width;
            var y = this.y - (this.height / 2);

            this._roadText = fistOfRowAdded = this.addText(x + 20, y + 20, this.style, 'Roads ' + this._roadsBought + '/' + this._roadsTotal);

            fistOfRowAdded = this.addSprite(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'resources', 'wood');
            lastAdded = this.addText(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, this.style, 'x1');
            lastAdded = this.addSprite(lastAdded.x + lastAdded.width + 5, lastAdded.y, 'resources', 'stone');
            lastAdded = this.addText(lastAdded.x + lastAdded.width + 5, lastAdded.y, this.style, 'x1');

            fistOfRowAdded = this.addButton(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'buyButton', this.buyRoad);
            this.addButton(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, 'placeButton', this.placeRoad);

            this._settlementText = fistOfRowAdded = this.addText(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 10, this.style, 'Settlements ' + this._settlementsBought + '/' + this._settlementsTotal);

            fistOfRowAdded = this.addSprite(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'resources', 'wood');
            lastAdded = this.addText(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, this.style, 'x1');
            lastAdded = this.addSprite(lastAdded.x + lastAdded.width + 5, lastAdded.y, 'resources', 'stone');
            lastAdded = this.addText(lastAdded.x + lastAdded.width + 5, lastAdded.y, this.style, 'x1');

            fistOfRowAdded = this.addSprite(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'resources', 'wheat');
            lastAdded = this.addText(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, this.style, 'x1');
            lastAdded = this.addSprite(lastAdded.x + lastAdded.width + 5, lastAdded.y, 'resources', 'sheep');
            lastAdded = this.addText(lastAdded.x + lastAdded.width + 5, lastAdded.y, this.style, 'x1');

            fistOfRowAdded = this.addButton(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'buyButton', this.buySettlement);
            this.addButton(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, 'placeButton', this.placeSettlement);

            this._cityText = fistOfRowAdded = this.addText(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 10, this.style, 'Cities ' + this._citiesBought + '/' + this._citiesTotal);

            fistOfRowAdded = this.addSprite(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'resources', 'ore');
            lastAdded = this.addText(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, this.style, 'x3');
            lastAdded = this.addSprite(lastAdded.x + lastAdded.width + 5, lastAdded.y, 'resources', 'wheat');
            lastAdded = this.addText(lastAdded.x + lastAdded.width + 5, lastAdded.y, this.style, 'x2');

            fistOfRowAdded = this.addButton(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'buyButton', this.buyCity);
            this.addButton(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, 'placeButton', this.placeCity);

        }

        updateText(){

            this.visible = !!(this.gameObject.gameState == 'mainPhase' && this.gameObject.player.playerTurn && this.gameObject.player.diceRolled);

            this.setupPieceInfo();

            this._roadText.setText('Roads ' + this._roadsBought + '/' + this._roadsTotal);
            this._settlementText.setText('Settlements ' + this._settlementsBought + '/' + this._settlementsTotal);
            this._cityText.setText('Cities ' + this._citiesBought + '/' + this._citiesTotal);

        }

        private setupPieceInfo() {

            this._roadsTotal = 15;
            this._settlementsTotal = 5;
            this._citiesTotal = 4;
            this._roadsBought = 0;
            this._settlementsBought = 0;
            this._citiesBought = 0;

            this.gameObject.player.pieces.roads.forEach(function(piece: Piece) {
                if (piece.state == 'bought') {
                    this._roadsBought++;
                    this._roadsTotal--;
                } else if (piece.state == 'placed') {
                    this._roadsTotal--;
                }
            }, this);

            this.gameObject.player.pieces.settlements.forEach(function(piece: Piece) {
                if (piece.state == 'bought') {
                    this._settlementsBought++;
                    this._settlementsTotal--;
                } else if (piece.state == 'placed') {
                    this._settlementsTotal--;
                }
            }, this);

            this.gameObject.player.pieces.cities.forEach(function(piece: Piece) {
                if (piece.state == 'bought') {
                    this._citiesBought++;
                    this._citiesTotal--;
                } else if (piece.state == 'placed') {
                    this._citiesTotal--;
                }
            }, this);

        }

        private buyRoad() {

            if (this._roadsTotal == 0) {
                alert('You can not buy any more roads');
            } else {
                this.gameObject.socket.emit('hasResourcesToBuyPiece', 'road', function (data) {
                    if (data) {
                        Game.gameObject.socket.emit('buyPiece', 'road');
                    } else {
                        alert('You do not have the resources to buy a road.');
                    }
                });
            }

        }

        private placeRoad() {

            this.gameObject.socket.emit('hasPieceToPlace', 'road', function (data) {
                if (data) {
                    Game.gameObject.placementAllowed = true;
                    Game.gameObject.placementType = 'road';
                } else {
                    alert('You cannot place a road without first buying one.');
                }
            });

        }

        private buySettlement() {

            if (this._settlementsTotal == 0) {
                alert('You can not buy any more settlements');
            } else {
                this.gameObject.socket.emit('hasResourcesToBuyPiece', 'settlement', function (data) {
                    if (data) {
                        Game.gameObject.socket.emit('buyPiece', 'settlement');
                    } else {
                        alert('You do not have the resources to buy a settlement.');
                    }
                });
            }

        }

        private placeSettlement() {

            this.gameObject.socket.emit('hasPieceToPlace', 'settlement', function (data) {
                if (data) {
                    Game.gameObject.placementAllowed = true;
                    Game.gameObject.placementType = 'settlement';
                } else {
                    alert('You cannot place a settlement without first buying one.');
                }
            });

        }

        private buyCity() {

            if (this._citiesTotal == 0) {
                alert('You can not buy any more citys');
            } else {
                this.gameObject.socket.emit('hasResourcesToBuyPiece', 'city', function (data) {
                    if (data) {
                        Game.gameObject.socket.emit('buyPiece', 'city');
                    } else {
                        alert('You do not have the resources to buy a city.');
                    }
                });
            }

        }

        private placeCity() {

            this.gameObject.socket.emit('hasPieceToPlace', 'city', function (data) {
                if (data) {
                    Game.gameObject.placementAllowed = true;
                    Game.gameObject.placementType = 'city';
                } else {
                    alert('You cannot place a city without first buying one.');
                }
            });

        }

    }

}
