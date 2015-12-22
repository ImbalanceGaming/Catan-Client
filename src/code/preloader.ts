/// <reference path="../definitions/app.d.ts" />

module Catan {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
            this.preloadBar.anchor.set(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.atlas('map', 'assets/images/tileSet.png', 'assets/images/tileSet.json');
            this.load.atlas('menuButtons', 'assets/images/menus/buttonSheet.png', 'assets/images/menus/buttonSheet.json');
            this.load.atlas('buildings', 'assets/images/objects/buildings.png', 'assets/images/objects/buildings.json');
            this.load.atlas('resources', 'assets/images/objects/resources.png', 'assets/images/objects/resources.json');
            this.load.atlas('roads', 'assets/images/objects/roads.png', 'assets/images/objects/roads.json');

            this.load.image('circle', 'assets/images/circle.png');
            this.load.image('road', 'assets/images/road.png');
            this.load.image('menuBackground', 'assets/images/menus/gameMenuBackground.png');
            this.load.image('resourceBar', 'assets/images/ui/resourceBar.png');
            this.load.image('sideBar', 'assets/images/ui/sideBar.png');
            this.load.image('scoreBar', 'assets/images/ui/scoreBar.png');
            this.load.image('buyButton', 'assets/images/ui/buyButton.png');
            this.load.image('placeButton', 'assets/images/ui/placeButton.png');
            this.load.image('turnButton', 'assets/images/ui/turnButton.png');
            this.load.image('diceBar', 'assets/images/ui/diceBar.png');

        }

        create() {

            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);
            //this.game.state.start('Game', true, false);

        }

    }

}
