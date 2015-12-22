/// <reference path="../definitions/app.d.ts" />

module Catan {

    export class Catan extends Phaser.Game {

        constructor() {

            super(1024, 768, Phaser.AUTO, 'content');

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Game', Game, false);

            this.state.start('Boot');

        }

    }

}