/// <reference path="../../definitions/app.d.ts" />

module Catan {

    export class Piece {

        private _id:number;
        private _name:string;
        private _state: string;

        constructor(id:number, type:string, state: string) {

            this._id = id;
            this._name = type;
            this._state = state;

        }

        get id():number {
            return this._id;
        }

        set id(value:number) {
            this._id = value;
        }

        get name():string {
            return this._name;
        }

        set name(value:string) {
            this._name = value;
        }

        get state():string {
            return this._state;
        }

        set state(value:string) {
            this._state = value;
        }

        getPiece() {

            return {
                id: this._id,
                type: this._name,
                state: this._state
            };

        }

    }

}


