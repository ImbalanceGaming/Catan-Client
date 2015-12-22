/// <reference path="../definitions/app.d.ts" />

module Catan {

    export class Boot extends Phaser.State {

        preload() {

            this.load.image('preloadBar', 'assets/images/loader.png');

        }

        create() {

            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                //this.stage.scale.pageAlignHorizontally = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.minWidth = 320;
                this.scale.minHeight = 480;
                this.scale.maxWidth = 1024;
                this.scale.maxHeight = 1152;
                this.game.scale.refresh();
            }

            this.game.state.start('Preloader', true, false);

        }

    }

}
