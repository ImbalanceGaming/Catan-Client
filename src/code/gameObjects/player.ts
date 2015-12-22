/// <reference path="../../definitions/app.d.ts" />

module Catan {

    export class Player {

        private _name: string;
        private _color: string;

        private _number: number;
        private _points: number;

        private _playerTurn: boolean;
        private _diceRolled: boolean;

        private _pieces: Pieces;
        private _resources: any;

        constructor(name, color, number, points, playerTurn, diceRolled, resources) {
            this._name = name;
            this._color = color;
            this._number = number;
            this._points = points;
            this._playerTurn = playerTurn;
            this._diceRolled = diceRolled;
            this._pieces = new Pieces();
            this._resources = resources;
        }


        get name():string {
            return this._name;
        }

        set name(value:string) {
            this._name = value;
        }

        get color():string {
            return this._color;
        }

        set color(value:string) {
            this._color = value;
        }

        get number():number {
            return this._number;
        }

        set number(value:number) {
            this._number = value;
        }

        get points():number {
            return this._points;
        }

        set points(value:number) {
            this._points = value;
        }

        get playerTurn():boolean {
            return this._playerTurn;
        }

        set playerTurn(value:boolean) {
            this._playerTurn = value;
        }

        get pieces():Pieces {
            return this._pieces;
        }

        set pieces(value:Pieces) {
            this._pieces = value;
        }

        get resources():any {
            return this._resources;
        }

        set resources(value:any) {
            this._resources = value;
        }

        get diceRolled():boolean {
            return this._diceRolled;
        }

        set diceRolled(value:boolean) {
            this._diceRolled = value;
        }

    }

}

