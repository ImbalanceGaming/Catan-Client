/// <reference path="../../definitions/app.d.ts" />

module Catan {

    export class UiFactory {

        private _uiElements : Phaser.Group;
        private _game       : Game;

        constructor(game: Game) {
            this._game = game;
            this._uiElements = this._game.add.group();
        };

        setupUI() {

            this.addElement('resourceBar');
            this.addElement('sideBar');
            this.addElement('scoreBar');
            this.addElement('turnButton');
            this.addElement('diceBar');
            this.addElement('screenMessages');

        }

        updateElements() {

            this._uiElements.forEach(function(element) {
                element.updateText();
            }, this);

        }

        private addElement(elementType: string) {

            var element;

            switch (elementType) {
                case 'resourceBar':
                    element = new ResourceBar(this._game, elementType);
                    break;
                case 'sideBar':
                    element = new SideBar(this._game, elementType);
                    break;
                case 'scoreBar':
                    element = new ScoreBar(this._game, elementType);
                    break;
                case 'turnButton':
                    element = new TurnButton(this._game, elementType);
                    break;
                case 'diceBar':
                    element = new DiceBar(this._game, elementType);
                    break;
                case 'screenMessages':
                    element = new ScreenMessages(this._game);
                    break;
                default:
                    console.log('Error: Element not found');
            }

            element.setup();
            this._uiElements.add(element);

            this._game.world.bringToTop(this._uiElements);

        }

    }

}
