/// <reference path="../../definitions/app.d.ts" />

module Catan {

    export abstract class UiElementAbstract extends Phaser.Sprite {

        private _elements   : Phaser.Group;
        private _gameObject : Game;
        private _style      : any;

        constructor(game: Game, key?: string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame?: string|number) {
            super(game.game, 0, 0, key, frame);

            this._gameObject = game;
            this._elements = this._gameObject.add.group(this);
            this._style = {
                font: '25px Arial',
                fill: '#ffffff',
                align: 'center'
            };
        }

        get elements():Phaser.Group {
            return this._elements;
        }

        set elements(value:Phaser.Group) {
            this._elements = value;
        }

        get gameObject():Game {
            return this._gameObject;
        }

        set gameObject(value:Game) {
            this._gameObject = value;
        }

        get style():any {
            return this._style;
        }

        set style(value:any) {
            this._style = value;
        }

        abstract setup();

        abstract addElements();

        abstract updateText();

        addSprite(x: number, y: number, key?: string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame?: string|number) {

            var element = this._gameObject.add.sprite(x, y, key, frame);

            this._elements.add(element);

            return element;

        }

        addText(x: number, y: number, style: {}, textString: string, anchor: any = {x:0, y:0}) {

            var text = this._gameObject.add.text(x, y, textString, style);
            text.anchor.set(anchor.x, anchor.y);

            this._elements.add(text);

            return text;

        }

        addButton(x: number, y: number, key?: string, callback?: Function) {

            var button = this._gameObject.add.button(x, y , key, callback, this);

            this._elements.add(button);

            return button;

        }

    }

}
