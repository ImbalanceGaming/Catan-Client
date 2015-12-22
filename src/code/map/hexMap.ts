/// <reference path="../../definitions/app.d.ts" />

module Catan {

    export class HexMap {
        //Private Variables
        private _game               : Game;
        private _grid               : Grid;
        private _hexagonGroup       : Phaser.Group;

        private _mapTiles           : Array<any>;
        private _hexagonWidth       : number;
        private _hexagonHeight      : number;
        private _mapWidth           : number;
        private _mapHeight          : number;
        private _tileCount          : number;
        private _scale              : number;

        private _backgroundColor    : string;

        //Public Variables
        mapScaledHeight             : number;
        mapScaledWidth              : number;

        constructor(game: Game, mapData: any, players:Array<Player>, player:Player) {

            this._game = game;
            this._grid = new Grid(game, this, players, player);
            this._mapTiles = mapData.mapTiles;

            this._hexagonWidth = mapData.hexagonWidth;
            this._hexagonHeight = mapData.hexagonHeight;
            this._tileCount = mapData.tileCount;
            this._scale = 0.5;
            this._mapHeight = mapData.mapHeight;
            this._mapWidth = mapData.mapWidth;
            this._backgroundColor = "#ffffff";
            
            this._hexagonGroup = this._game.add.group();

            this.create(mapData.grid)
            
        }

        // <editor-fold desc="Getters and setters">

        public get hexagonWidth():number {
            return this._hexagonWidth;
        }

        public set hexagonWidth(value:number) {
            this._hexagonWidth = value;
        }

        public get hexagonHeight():number {
            return this._hexagonHeight;
        }

        public set hexagonHeight(value:number) {
            this._hexagonHeight = value;
        }

        public get mapWidth():number {
            return this._mapWidth;
        }

        public set mapWidth(value:number) {
            this._mapWidth = value;
        }

        public get mapHeight():number {
            return this._mapHeight;
        }

        public set mapHeight(value:number) {
            this._mapHeight = value;
        }

        public get tileCount():number {
            return this._tileCount;
        }

        public set tileCount(value:number) {
            this._tileCount = value;
        }

        public get scale():number {
            return this._scale;
        }

        public set scale(value:number) {
            this._scale = value;
        }

        get grid():Catan.Grid {
            return this._grid;
        }

        set grid(value:Catan.Grid) {
            this._grid = value;
        }

        // </editor-fold>

        /**
         * Create a new map on the screen
         */
        private create(gridData?:any) {
            //Setup background color
            this._game.stage.backgroundColor = this._backgroundColor;

            this._mapTiles.forEach(function(tile) {
                var hexagonX = tile.x;
                var hexagonY = tile.y;

                var hexagon = this._game.add.image(hexagonX, hexagonY, "map");
                hexagon.frameName = tile.type;
                this._hexagonGroup.add(hexagon);

                //If the tile requires a number place it
                if (tile.number != null) {
                    hexagon = this._game.add.image(hexagonX, hexagonY, "map");
                    hexagon.frameName = tile.number;
                    hexagon.bringToTop();
                    this._hexagonGroup.add(hexagon);
                }

                //If the tile is a conversion tile place it and rotate to the correct angle
                //if (tile.conversion != null) {
                //    hexagon = this._game.add.image(hexagonX, hexagonY, "map");
                //    hexagon.frameName = tile.conversion;
                //    //Set the origin of the tile to be the center
                //    hexagon.anchor.set(tile.anchorX, tile.anchorY);
                //    //Move the tile so it is placed correctly
                //    hexagon.x += this._hexagonWidth/2;
                //    hexagon.y += this._hexagonHeight/2;
                //    hexagon.angle = tile.angle;
                //    hexagon.bringToTop();
                //    this._hexagonGroup.add(hexagon);
                //}
            }, this);

            this._grid.buildFromData(gridData);

            this.changeScale(this._scale);
        }

        /**
         * Scale the map to the correct size
         *
         * @param scale
         */
        changeScale(scale : number) {
            this._scale = scale;
            this._hexagonGroup.scale.set(scale, scale);
            this._grid.buildingObjects.scale.set(scale, scale);
            this._grid.roadObjects.scale.set(scale, scale);
            //The height and width property's of the map need to changed so that the camera can readjust
            this.mapScaledWidth = (this._mapWidth + this._hexagonWidth)*scale;
            this.mapScaledHeight = (this._mapHeight + this._hexagonHeight)*scale;
        }
    }

}
