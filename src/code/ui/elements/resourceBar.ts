/// <reference path="../../../definitions/app.d.ts" />

module Catan {

    export class ResourceBar extends UiElementAbstract {

        private _woodText:Phaser.Text;
        private _stoneText:Phaser.Text;
        private _oreText:Phaser.Text;
        private _sheepText:Phaser.Text;
        private _wheatText:Phaser.Text;

        setup() {
            this.fixedToCamera = true;
            this.anchor.set(0.5, 1);
            this.cameraOffset.setTo(this.gameObject.camera.width / 2, this.gameObject.camera.height);
            this.gameObject.add.existing(this);
            this.addElements();
            this.updateText();
        }

        addElements() {

            var playerResources = this.gameObject.player.resources;
            var x = this.x - (this.width / 2) + 160;
            var y = this.y - (this.height / 2) + 10;

            Object.keys(playerResources).forEach(function (resourceName) {
                switch (resourceName) {
                    case 'wood':
                        this._woodText = this.addText(x, y, this.style, playerResources.wood, {x: 0, y: 0.5});
                        break;
                    case 'stone':
                        this._stoneText = this.addText(x + 371, y, this.style, playerResources.stone, {x: 0, y: 0.5});
                        break;
                    case 'ore':
                        this._oreText = this.addText(x + 92, y, this.style, playerResources.ore, {x: 0, y: 0.5});
                        break;
                    case 'sheep':
                        this._sheepText = this.addText(x + 278, y, this.style, playerResources.sheep, {x: 0, y: 0.5});
                        break;
                    case 'wheat':
                        this._wheatText = this.addText(x + 185, y, this.style, playerResources.wheat, {x: 0, y: 0.5});
                        break;
                }
            }, this);

        }

        updateText() {

            var playerResources = this.gameObject.player.resources;

            this._woodText.setText(playerResources.wood);
            this._stoneText.setText(playerResources.stone);
            this._oreText.setText(playerResources.ore);
            this._sheepText.setText(playerResources.sheep);
            this._wheatText.setText(playerResources.wheat);

        }

    }

}