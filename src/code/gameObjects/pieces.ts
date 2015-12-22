/// <reference path="../../definitions/app.d.ts" />

module Catan {

    export class Pieces {

        private _roads: Array<Piece>;
        private _settlements: Array<Piece>;
        private _cities: Array<Piece>;

        constructor() {
            this._roads = [];
            this._settlements = [];
            this._cities = [];
        }

        get roads():Array<Piece> {
            return this._roads;
        }

        set roads(value:Array<Piece>) {
            this._roads = value;
        }

        get settlements():Array<Piece> {
            return this._settlements;
        }

        set settlements(value:Array<Piece>) {
            this._settlements = value;
        }

        get cities():Array<Piece> {
            return this._cities;
        }

        set cities(value:Array<Piece>) {
            this._cities = value;
        }

        addPiece(id: number, type:string, state: string) {

            switch(type) {
                case 'road':
                    this._roads.push(new Piece(id, type, state));
                    break;
                case 'settlement':
                    this._settlements.push(new Piece(id, type, state));
                    break;
                case 'city':
                    this._cities.push(new Piece(id, type, state));
                    break;
            }

        }

        getPieces() {

            var pieces = {
                roads: [],
                settlements: [],
                cities: []
            };

            this._roads.forEach(function(piece:Piece) {
                pieces.roads.push(piece.getPiece());
            });

            this._settlements.forEach(function(piece:Piece) {
                pieces.settlements.push(piece.getPiece());
            });

            this._cities.forEach(function(piece:Piece) {
                pieces.cities.push(piece.getPiece());
            });

        }

        //setPieceIndex(id:number, gridIndex:number) {
        //
        //    this._pieces.forEach(function(piece:Piece, index) {
        //        if (piece.id == id) {
        //            piece.gridIndex = gridIndex;
        //            this._pieces[index] = piece;
        //        }
        //    }, this)
        //
        //}

    }

}

