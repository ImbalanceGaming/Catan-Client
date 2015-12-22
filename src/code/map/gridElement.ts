/// <reference path="../../definitions/app.d.ts" />

module Catan {

    export class GridElement {

        private _sprite             : Phaser.Sprite;
        private _type               : string;
        private _owningPlayer       : number;
        private _playerPieceType    : string;
        private _links              : Array<number>;
        private _resources          : Array<any>;
        private _serverIndex        : number;

        constructor() {

            this._sprite = null;
            this._type = null;
            this._owningPlayer = null;
            this._links = [];
            this._resources = [];
            this._serverIndex = null;

        }

        public get sprite():Phaser.Sprite {
            return this._sprite;
        }

        public set sprite(value:Phaser.Sprite) {
            this._sprite = value;
        }

        public get type():string {
            return this._type;
        }

        public set type(value:string) {
            this._type = value;
        }

        public get owningPlayer():number {
            return this._owningPlayer;
        }

        public set owningPlayer(value:number) {
            this._owningPlayer = value;
        }

        public get links():Array<number> {
            return this._links;
        }

        public set links(value:Array<number>) {
            this._links = value;
        }

        public get resources():Array<any> {
            return this._resources;
        }

        public set resources(value:Array<any>) {
            this._resources = value;
        }

        get serverIndex():number {
            return this._serverIndex;
        }

        set serverIndex(value:number) {
            this._serverIndex = value;
        }

        get playerPieceType():string {
            return this._playerPieceType;
        }

        set playerPieceType(value:string) {
            this._playerPieceType = value;
        }

    }

}
