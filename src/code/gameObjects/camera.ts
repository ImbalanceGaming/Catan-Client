/// <reference path="../../definitions/app.d.ts" />

module Catan {

    export class Camera extends Phaser.Camera {

        private _map:HexMap;

        constructor(camera: Phaser.Camera, map:HexMap) {
            super(camera.game, camera.id, camera.x, camera.y, camera.width, camera.height);
            this._map = map;
        }

        setupCamera() {
            this.world.setBounds(0, 0, this._map.mapScaledWidth, this._map.mapScaledHeight);
            //this.game.world.setBounds(0, 0, this.map.mapWidth, this.map.mapHeight);

            this.game.camera.setPosition(((this._map.mapScaledWidth / 2) - (this.game.canvas.width / 2)), ((this._map.mapScaledHeight / 2) - (this.game.canvas.height / 2)));
            //this.game.camera.setPosition(0, 0);
        }

        cameraPan() {
            var mouseX = this.game.input.mousePointer.x;
            var mouseY = this.game.input.mousePointer.y;
            var screenCenterX = this.game.canvas.width / 2;
            var screenCenterY = this.game.canvas.height / 2;

            if (mouseX < screenCenterX && mouseY < screenCenterY) {
                this.game.camera.x -= 3;
                this.game.camera.y -= 3;
            } else if (mouseX < screenCenterX && mouseY > screenCenterY) {
                this.game.camera.x -= 3;
                this.game.camera.y += 3;
            } else if (mouseX > screenCenterX && mouseY < screenCenterY) {
                this.game.camera.x += 3;
                this.game.camera.y -= 3;
            } else if (mouseX > screenCenterX && mouseY > screenCenterY) {
                this.game.camera.x += 3;
                this.game.camera.y += 3;
            }
        }

        changeScale() {
            var scaleDirection = this.game.input.mouse.wheelDelta;
            var scale = this._map.scale;
            var map = this._map;

            if (scaleDirection < 0) {
                if (scale > 0.5) {
                    scale -= 0.1;
                }
            } else {
                if (scale < 1) {
                    scale += 0.1;
                }
            }

            map.changeScale(scale);

            this.game.world.setBounds(0, 0, this._map.mapScaledWidth, this._map.mapScaledHeight);
        }

    }

}

