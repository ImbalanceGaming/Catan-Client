/// <reference path="../../../definitions/app.d.ts" />

module Catan {

    export class ScreenMessages extends UiElementAbstract {

        setup() {

            this.fixedToCamera = true;
            this.cameraOffset.setTo(0, 0);
            this.gameObject.add.existing(this);

        }

        addElements() {}

        updateText() {

            this.style.font = "30px Arial";

            if (this.gameObject.gameState == 'endPhase') {
                this.gameObject.players.forEach(function(player: Player) {
                   if (player.points == 10) {
                       if (player.number == this.gameObject.player.number) {
                           this.addText(this.gameObject.camera.width / 2, 20, this.style, 'You have won', {x:0.5, y:0});
                       } else {
                           this.addText(this.gameObject.camera.width / 2, 20, this.style, 'Player ' + player.number + ' has won', {x:0.5, y:0});
                       }
                   }
                }, this);

            }

        }

    }

}
