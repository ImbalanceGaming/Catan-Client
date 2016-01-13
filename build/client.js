/// <reference path="../definitions/app.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Catan;
(function (Catan_1) {
    var Catan = (function (_super) {
        __extends(Catan, _super);
        function Catan() {
            _super.call(this, 1024, 768, Phaser.AUTO, 'content');
            this.state.add('Boot', Catan_1.Boot, false);
            this.state.add('Preloader', Catan_1.Preloader, false);
            this.state.add('MainMenu', Catan_1.MainMenu, false);
            this.state.add('Game', Catan_1.Game, false);
            this.state.start('Boot');
        }
        return Catan;
    })(Phaser.Game);
    Catan_1.Catan = Catan;
})(Catan || (Catan = {}));
/// <reference path="../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/images/loader.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
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
        };
        return Boot;
    })(Phaser.State);
    Catan.Boot = Boot;
})(Catan || (Catan = {}));
/// <reference path="../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
            this.preloadBar.anchor.set(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.load.atlas('map', 'assets/images/tileSet.png', 'assets/images/tileSet.json');
            this.load.atlas('menuButtons', 'assets/images/menus/buttonSheet.png', 'assets/images/menus/buttonSheet.json');
            this.load.atlas('buildings', 'assets/images/objects/buildings.png', 'assets/images/objects/buildings.json');
            this.load.atlas('resources', 'assets/images/objects/resources.png', 'assets/images/objects/resources.json');
            this.load.atlas('roads', 'assets/images/objects/roads.png', 'assets/images/objects/roads.json');
            this.load.image('circle', 'assets/images/circle.png');
            this.load.image('road', 'assets/images/road.png');
            this.load.image('menuBackground', 'assets/images/menus/gameMenuBackground.png');
            this.load.image('resourceBar', 'assets/images/ui/resourceBar.png');
            this.load.image('sideBar', 'assets/images/ui/sideBar.png');
            this.load.image('scoreBar', 'assets/images/ui/scoreBar.png');
            this.load.image('buyButton', 'assets/images/ui/buyButton.png');
            this.load.image('placeButton', 'assets/images/ui/placeButton.png');
            this.load.image('turnButton', 'assets/images/ui/turnButton.png');
            this.load.image('diceBar', 'assets/images/ui/diceBar.png');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
            //this.game.state.start('Game', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Catan.Preloader = Preloader;
})(Catan || (Catan = {}));
/// <reference path="../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            //this.socket = io.connect('http://localhost:3000');
            this.socket = io.connect('http://catan.imbalancegaming.com:3000');
            this.background = this.add.sprite(0, 0, 'menuBackground');
            this.background.alpha = 0;
            this.newGameButton = this.add.sprite(0, 0, 'menuButtons');
            this.newGameButton.frameName = 'createGameUp';
            this.newGameButton.anchor.set(0.5, 0.5);
            this.newGameButton.position.set(this.game.world.centerX + 28, this.game.world.centerY + 150);
            this.newGameButton.alpha = 0;
            this.joinGameButton = this.add.sprite(0, 0, 'menuButtons');
            this.joinGameButton.frameName = 'joinGameUp';
            this.joinGameButton.anchor.set(0.5, 0.5);
            this.joinGameButton.position.set(this.newGameButton.x, this.newGameButton.y + this.joinGameButton.height + 5);
            this.joinGameButton.alpha = 0;
            var backgroundTween = this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            backgroundTween.onComplete.add(function () {
                this.newGameButton.alpha = 1;
                this.joinGameButton.alpha = 1;
                this.newGameButton.events.onInputUp.add(this.newGame, this);
                this.newGameButton.inputEnabled = true;
                this.newGameButton.input.useHandCursor = true;
                this.joinGameButton.events.onInputUp.add(this.joinGame, this);
                this.joinGameButton.inputEnabled = true;
                this.joinGameButton.input.useHandCursor = true;
            }, this);
            this.game.input.mouse.capture = true;
        };
        MainMenu.prototype.update = function () {
            this.newGameButton.events.onInputDown.add(function () {
                this.newGameButton.frameName = 'createGameDown';
            }, this);
            this.newGameButton.events.onInputUp.add(function () {
                this.newGameButton.frameName = 'createGameUp';
            }, this);
            this.newGameButton.events.onInputOut.add(function () {
                this.newGameButton.frameName = 'createGameUp';
            }, this);
            this.joinGameButton.events.onInputDown.add(function () {
                this.joinGameButton.frameName = 'joinGameDown';
            }, this);
            this.joinGameButton.events.onInputUp.add(function () {
                this.joinGameButton.frameName = 'joinGameUp';
            }, this);
            this.joinGameButton.events.onInputOut.add(function () {
                this.joinGameButton.frameName = 'joinGameUp';
            }, this);
        };
        MainMenu.prototype.fadeOut = function () {
            var tween = this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            this.newGameButton.alpha = 0;
            this.newGameButton.inputEnabled = false;
            this.newGameButton.input.useHandCursor = false;
            this.joinGameButton.alpha = 0;
            this.joinGameButton.inputEnabled = false;
            this.joinGameButton.input.useHandCursor = false;
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.newGame = function () {
            var mainMenu = this;
            this.socket.emit('newGame', function (data) {
                if (data == 'Already in active game') {
                    alert('Already in an active game please use join game.');
                }
                else {
                    mainMenu.serverData = data.serverData;
                    mainMenu.playerNo = data.playerNo;
                    mainMenu.fadeOut();
                }
            });
        };
        MainMenu.prototype.joinGame = function () {
            var mainMenu = this;
            this.socket.emit('joinGame', function (data) {
                if (data == 'No Games') {
                    alert(data);
                }
                else {
                    mainMenu.serverData = data.serverData;
                    mainMenu.playerNo = data.playerNo;
                    mainMenu.fadeOut();
                }
            });
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Game', true, false, this.socket, this.serverData, this.playerNo);
        };
        return MainMenu;
    })(Phaser.State);
    Catan.MainMenu = MainMenu;
})(Catan || (Catan = {}));
/// <reference path="../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.apply(this, arguments);
        }
        Game.prototype.init = function (socket, serverData, playerNo) {
            this.socket = socket;
            this.serverData = serverData;
            this.gameState = serverData.gameState;
            this.gameName = serverData.gameName;
            this.players = [];
            this.dice = serverData.dice;
            this.placementAllowed = false;
            this.placementType = null;
            this.serverData.players.forEach(function (player) {
                var playerObject = new Catan.Player(player.name, player.color, player.number, player.points, player.playerTurn, player.diceRolled, player.resources);
                if (playerObject.number == playerNo) {
                    this.player = playerObject;
                    player.pieces.roads.forEach(function (piece) {
                        this.player.pieces.addPiece(piece.id, piece.type, piece.state);
                    }, this);
                    player.pieces.settlements.forEach(function (piece) {
                        this.player.pieces.addPiece(piece.id, piece.type, piece.state);
                    }, this);
                    player.pieces.cities.forEach(function (piece) {
                        this.player.pieces.addPiece(piece.id, piece.type, piece.state);
                    }, this);
                }
                this.players.push(playerObject);
            }, this);
        };
        Game.prototype.create = function () {
            this.map = new Catan.HexMap(this, this.serverData.mapData, this.players, this.player);
            this.camera = new Catan.Camera(this.camera, this.map);
            this.ui = new Catan.UiFactory(this);
            this.socketFunctions = new Catan.SocketFunctions(this);
            this.camera.setupCamera();
            this.game.input.mouse.capture = true;
            this.game.input.mouse.mouseWheelCallback = Game.mouseWheelHandler;
            this.ui.setupUI();
            this.socketFunctions.registerEvents();
        };
        Game.prototype.update = function () {
            Game.gameObject = this;
            if (this.game.input.mousePointer.middleButton.isDown) {
                this.camera.cameraPan();
            }
            this.ui.updateElements();
            if (this.gameState == 'placementPhase' && this.player.playerTurn) {
                this.map.grid.placementPhase();
            }
            else if (this.gameState == 'mainPhase' && this.player.playerTurn && this.placementAllowed) {
                switch (this.placementType) {
                    case 'road':
                        this.map.grid.roadPlacement();
                        this.map.grid.placementType = this.placementType;
                        break;
                    case 'settlement':
                        this.map.grid.townPlacement();
                        this.map.grid.placementType = this.placementType;
                        break;
                    case 'city':
                        this.map.grid.cityPlacement();
                        this.map.grid.placementType = this.placementType;
                        break;
                }
            }
            else {
                this.map.grid.hidePlacementTiles();
            }
            if (this.gameState == 'endPhase') {
            }
        };
        Game.mouseWheelHandler = function (event) {
            Game.gameObject.camera.changeScale();
        };
        Game.prototype.updatePlayers = function (players) {
            players.forEach(function (playerData) {
                var indexToUpdate = null;
                var playerObject = null;
                this.players.forEach(function (player, index) {
                    if (playerData.number == player.number) {
                        indexToUpdate = index;
                        playerObject = player;
                        playerObject.name = playerData.name;
                        playerObject.color = playerData.color;
                        playerObject.number = playerData.number;
                        playerObject.points = playerData.points;
                        playerObject.playerTurn = playerData.playerTurn;
                        playerObject.diceRolled = playerData.diceRolled;
                        playerObject.resources = playerData.resources;
                        if (playerData.number == this.player.number) {
                            var pieceFound = false;
                            playerData.pieces.roads.forEach(function (pieceData) {
                                pieceFound = false;
                                player.pieces.roads.forEach(function (piece, roadIndex) {
                                    if (piece.id == pieceData.id) {
                                        pieceFound = true;
                                        player.pieces.roads[roadIndex].state = pieceData.state;
                                    }
                                }, this);
                                if (!pieceFound) {
                                    this.player.pieces.addPiece(pieceData.id, pieceData.type, pieceData.state);
                                }
                            }, this);
                            playerData.pieces.settlements.forEach(function (pieceData) {
                                pieceFound = false;
                                player.pieces.settlements.forEach(function (piece, settlementIndex) {
                                    if (piece.id == pieceData.id) {
                                        pieceFound = true;
                                        player.pieces.settlements[settlementIndex].state = pieceData.state;
                                    }
                                }, this);
                                if (!pieceFound) {
                                    this.player.pieces.addPiece(pieceData.id, pieceData.type, pieceData.state);
                                }
                            }, this);
                            if (player.pieces.settlements.length > playerData.pieces.settlements.length) {
                                player.pieces.settlements.splice(0, 1);
                            }
                            playerData.pieces.cities.forEach(function (pieceData) {
                                pieceFound = false;
                                player.pieces.cities.forEach(function (piece, cityIndex) {
                                    if (piece.id == pieceData.id) {
                                        pieceFound = true;
                                        player.pieces.cities[cityIndex].state = pieceData.state;
                                    }
                                }, this);
                                if (!pieceFound) {
                                    this.player.pieces.addPiece(pieceData.id, pieceData.type, pieceData.state);
                                }
                            }, this);
                            this.player = playerObject;
                        }
                        this.players[index] = playerObject;
                    }
                }, this);
            }, this);
        };
        Game.prototype.getPlayer = function (playerNumber) {
            var playerObject = null;
            this.players.forEach(function (player) {
                if (playerNumber == player.number) {
                    playerObject = player;
                }
            }, this);
            return (playerObject != null) ? playerObject : null;
        };
        return Game;
    })(Phaser.State);
    Catan.Game = Game;
})(Catan || (Catan = {}));
/// <reference path="../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var SocketFunctions = (function () {
        function SocketFunctions(game) {
            this._gameObject = game;
            this._socket = game.socket;
        }
        SocketFunctions.prototype.registerEvents = function () {
            this.startGame();
            this.newPlayer();
            this.diceRolled();
            this.objectPlaced();
            this.pieceBought();
            this.turnEnded();
        };
        SocketFunctions.prototype.startGame = function () {
            this._socket.on('startGame', function (data) {
                Catan.Game.gameObject.gameState = data;
            });
        };
        SocketFunctions.prototype.newPlayer = function () {
            this._socket.on('newPlayer', function (playerData) {
                var player = new Catan.Player(playerData[0].name, playerData[0].color, playerData[0].number, playerData[0].points, playerData[0].playerTurn, playerData[0].diceRolled, playerData[0].resources);
                Catan.Game.gameObject.players.push(player);
            });
        };
        SocketFunctions.prototype.diceRolled = function () {
            this._socket.on('diceRolled', function (data) {
                Catan.Game.gameObject.dice = data[0].dice;
                Catan.Game.gameObject.gameState = data[0].gameState;
                Catan.Game.gameObject.updatePlayers(data[1]);
            });
        };
        SocketFunctions.prototype.objectPlaced = function () {
            this._socket.on('objectPlaced', function (data) {
                Catan.Game.gameObject.map.grid.updateGrid(data[0]);
                Catan.Game.gameObject.updatePlayers(data[1]);
                Catan.Game.gameObject.gameState = data[2].gameState;
            });
        };
        SocketFunctions.prototype.pieceBought = function () {
            this._socket.on('pieceBought', function (data) {
                Catan.Game.gameObject.updatePlayers(data);
            });
        };
        SocketFunctions.prototype.turnEnded = function () {
            this._socket.on('turnEnded', function (data) {
                Catan.Game.gameObject.gameState = data[0].gameState;
                Catan.Game.gameObject.updatePlayers(data[1]);
            });
        };
        return SocketFunctions;
    })();
    Catan.SocketFunctions = SocketFunctions;
})(Catan || (Catan = {}));
/// <reference path="../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(camera, map) {
            _super.call(this, camera.game, camera.id, camera.x, camera.y, camera.width, camera.height);
            this._map = map;
        }
        Camera.prototype.setupCamera = function () {
            this.world.setBounds(0, 0, this._map.mapScaledWidth, this._map.mapScaledHeight);
            //this.game.world.setBounds(0, 0, this.map.mapWidth, this.map.mapHeight);
            this.game.camera.setPosition(((this._map.mapScaledWidth / 2) - (this.game.canvas.width / 2)), ((this._map.mapScaledHeight / 2) - (this.game.canvas.height / 2)));
            //this.game.camera.setPosition(0, 0);
        };
        Camera.prototype.cameraPan = function () {
            var mouseX = this.game.input.mousePointer.x;
            var mouseY = this.game.input.mousePointer.y;
            var screenCenterX = this.game.canvas.width / 2;
            var screenCenterY = this.game.canvas.height / 2;
            if (mouseX < screenCenterX && mouseY < screenCenterY) {
                this.game.camera.x -= 3;
                this.game.camera.y -= 3;
            }
            else if (mouseX < screenCenterX && mouseY > screenCenterY) {
                this.game.camera.x -= 3;
                this.game.camera.y += 3;
            }
            else if (mouseX > screenCenterX && mouseY < screenCenterY) {
                this.game.camera.x += 3;
                this.game.camera.y -= 3;
            }
            else if (mouseX > screenCenterX && mouseY > screenCenterY) {
                this.game.camera.x += 3;
                this.game.camera.y += 3;
            }
        };
        Camera.prototype.changeScale = function () {
            var scaleDirection = this.game.input.mouse.wheelDelta;
            var scale = this._map.scale;
            var map = this._map;
            if (scaleDirection < 0) {
                if (scale > 0.5) {
                    scale -= 0.1;
                }
            }
            else {
                if (scale < 1) {
                    scale += 0.1;
                }
            }
            map.changeScale(scale);
            this.game.world.setBounds(0, 0, this._map.mapScaledWidth, this._map.mapScaledHeight);
        };
        return Camera;
    })(Phaser.Camera);
    Catan.Camera = Camera;
})(Catan || (Catan = {}));
/// <reference path="../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var Piece = (function () {
        function Piece(id, type, state) {
            this._id = id;
            this._name = type;
            this._state = state;
        }
        Object.defineProperty(Piece.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Piece.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Piece.prototype, "state", {
            get: function () {
                return this._state;
            },
            set: function (value) {
                this._state = value;
            },
            enumerable: true,
            configurable: true
        });
        Piece.prototype.getPiece = function () {
            return {
                id: this._id,
                type: this._name,
                state: this._state
            };
        };
        return Piece;
    })();
    Catan.Piece = Piece;
})(Catan || (Catan = {}));
/// <reference path="../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var Pieces = (function () {
        function Pieces() {
            this._roads = [];
            this._settlements = [];
            this._cities = [];
        }
        Object.defineProperty(Pieces.prototype, "roads", {
            get: function () {
                return this._roads;
            },
            set: function (value) {
                this._roads = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pieces.prototype, "settlements", {
            get: function () {
                return this._settlements;
            },
            set: function (value) {
                this._settlements = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pieces.prototype, "cities", {
            get: function () {
                return this._cities;
            },
            set: function (value) {
                this._cities = value;
            },
            enumerable: true,
            configurable: true
        });
        Pieces.prototype.addPiece = function (id, type, state) {
            switch (type) {
                case 'road':
                    this._roads.push(new Catan.Piece(id, type, state));
                    break;
                case 'settlement':
                    this._settlements.push(new Catan.Piece(id, type, state));
                    break;
                case 'city':
                    this._cities.push(new Catan.Piece(id, type, state));
                    break;
            }
        };
        Pieces.prototype.getPieces = function () {
            var pieces = {
                roads: [],
                settlements: [],
                cities: []
            };
            this._roads.forEach(function (piece) {
                pieces.roads.push(piece.getPiece());
            });
            this._settlements.forEach(function (piece) {
                pieces.settlements.push(piece.getPiece());
            });
            this._cities.forEach(function (piece) {
                pieces.cities.push(piece.getPiece());
            });
        };
        return Pieces;
    })();
    Catan.Pieces = Pieces;
})(Catan || (Catan = {}));
/// <reference path="../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var Player = (function () {
        function Player(name, color, number, points, playerTurn, diceRolled, resources) {
            this._name = name;
            this._color = color;
            this._number = number;
            this._points = points;
            this._playerTurn = playerTurn;
            this._diceRolled = diceRolled;
            this._pieces = new Catan.Pieces();
            this._resources = resources;
        }
        Object.defineProperty(Player.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._color = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "number", {
            get: function () {
                return this._number;
            },
            set: function (value) {
                this._number = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "points", {
            get: function () {
                return this._points;
            },
            set: function (value) {
                this._points = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "playerTurn", {
            get: function () {
                return this._playerTurn;
            },
            set: function (value) {
                this._playerTurn = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "pieces", {
            get: function () {
                return this._pieces;
            },
            set: function (value) {
                this._pieces = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "resources", {
            get: function () {
                return this._resources;
            },
            set: function (value) {
                this._resources = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "diceRolled", {
            get: function () {
                return this._diceRolled;
            },
            set: function (value) {
                this._diceRolled = value;
            },
            enumerable: true,
            configurable: true
        });
        return Player;
    })();
    Catan.Player = Player;
})(Catan || (Catan = {}));
/// <reference path="../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var HexMap = (function () {
        function HexMap(game, mapData, players, player) {
            this._game = game;
            this._grid = new Catan.Grid(game, this, players, player);
            this._mapTiles = mapData.mapTiles;
            this._hexagonWidth = mapData.hexagonWidth;
            this._hexagonHeight = mapData.hexagonHeight;
            this._tileCount = mapData.tileCount;
            this._scale = 0.5;
            this._mapHeight = mapData.mapHeight;
            this._mapWidth = mapData.mapWidth;
            this._backgroundColor = "#ffffff";
            this._hexagonGroup = this._game.add.group();
            this.create(mapData.grid);
        }
        Object.defineProperty(HexMap.prototype, "hexagonWidth", {
            // <editor-fold desc="Getters and setters">
            get: function () {
                return this._hexagonWidth;
            },
            set: function (value) {
                this._hexagonWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HexMap.prototype, "hexagonHeight", {
            get: function () {
                return this._hexagonHeight;
            },
            set: function (value) {
                this._hexagonHeight = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HexMap.prototype, "mapWidth", {
            get: function () {
                return this._mapWidth;
            },
            set: function (value) {
                this._mapWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HexMap.prototype, "mapHeight", {
            get: function () {
                return this._mapHeight;
            },
            set: function (value) {
                this._mapHeight = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HexMap.prototype, "tileCount", {
            get: function () {
                return this._tileCount;
            },
            set: function (value) {
                this._tileCount = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HexMap.prototype, "scale", {
            get: function () {
                return this._scale;
            },
            set: function (value) {
                this._scale = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HexMap.prototype, "grid", {
            get: function () {
                return this._grid;
            },
            set: function (value) {
                this._grid = value;
            },
            enumerable: true,
            configurable: true
        });
        // </editor-fold>
        /**
         * Create a new map on the screen
         */
        HexMap.prototype.create = function (gridData) {
            //Setup background color
            this._game.stage.backgroundColor = this._backgroundColor;
            this._mapTiles.forEach(function (tile) {
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
        };
        /**
         * Scale the map to the correct size
         *
         * @param scale
         */
        HexMap.prototype.changeScale = function (scale) {
            this._scale = scale;
            this._hexagonGroup.scale.set(scale, scale);
            this._grid.buildingObjects.scale.set(scale, scale);
            this._grid.roadObjects.scale.set(scale, scale);
            //The height and width property's of the map need to changed so that the camera can readjust
            this.mapScaledWidth = (this._mapWidth + this._hexagonWidth) * scale;
            this.mapScaledHeight = (this._mapHeight + this._hexagonHeight) * scale;
        };
        return HexMap;
    })();
    Catan.HexMap = HexMap;
})(Catan || (Catan = {}));
/// <reference path="../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var Grid = (function () {
        function Grid(game, map, players, player) {
            this._game = game;
            this._map = map;
            this._gridObjects = [];
            this._buildingObjects = game.add.group();
            this._roadObjects = game.add.group();
            this._players = players;
            this._player = player;
            this._placementType = null;
        }
        Object.defineProperty(Grid.prototype, "buildingObjects", {
            get: function () {
                return this._buildingObjects;
            },
            set: function (value) {
                this._buildingObjects = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "roadObjects", {
            get: function () {
                return this._roadObjects;
            },
            set: function (value) {
                this._roadObjects = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "gridObjects", {
            get: function () {
                return this._gridObjects;
            },
            set: function (value) {
                this._gridObjects = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "placementType", {
            get: function () {
                return this._placementType;
            },
            set: function (value) {
                this._placementType = value;
            },
            enumerable: true,
            configurable: true
        });
        Grid.prototype.buildFromData = function (gridData) {
            gridData.forEach(function (gridObject) {
                this.addGraphicElement(gridObject);
            }, this);
            this._game.world.bringToTop(this._roadObjects);
            this._game.world.bringToTop(this._buildingObjects);
            this.hidePlacementTiles();
        };
        Grid.prototype.placementPhase = function () {
            if (this._game.player.pieces.settlements.length == 0) {
                this.townPlacement(true);
                this._placementType = 'settlement';
            }
            else if (this._game.player.pieces.settlements.length == 1 && this._game.player.pieces.roads.length == 0) {
                this.roadPlacement();
                this._placementType = 'road';
            }
            else if (this._game.player.pieces.settlements.length == 1 && this._game.player.pieces.roads.length == 1) {
                this.townPlacement(true);
                this._placementType = 'settlement';
            }
            else {
                this.roadPlacement();
                this._placementType = 'road';
            }
        };
        Grid.prototype.hidePlacementTiles = function () {
            this._gridObjects.forEach(function (gridElement, index) {
                if (gridElement.owningPlayer == null) {
                    gridElement.sprite.visible = false;
                    this._gridObjects[index] = gridElement;
                }
                else {
                    gridElement.sprite.visible = true;
                    this._gridObjects[index] = gridElement;
                }
            }, this);
        };
        Grid.prototype.updateGrid = function (gridData) {
            gridData.forEach(function (gridObject) {
                this.gridObjects.forEach(function (gridElement, index) {
                    if (gridObject.serverIndex == gridElement.serverIndex) {
                        if (gridElement.playerPieceType != gridObject.playerPieceType) {
                            this.updateSpriteGraphics(gridElement.sprite, gridObject.playerPieceType, gridObject.owningPlayer);
                        }
                        if (gridObject.owningPlayer != null) {
                            gridElement.sprite.visible = true;
                        }
                        gridElement.sprite.x = gridObject.x;
                        gridElement.sprite.y = gridObject.y;
                        gridElement.type = gridObject.type;
                        gridElement.sprite.angle = gridObject.angle;
                        gridElement.sprite.anchor.set(gridObject.anchorX, gridObject.anchorY);
                        gridElement.owningPlayer = gridObject.owningPlayer;
                        gridElement.playerPieceType = gridObject.playerPieceType;
                        gridElement.links = gridObject.links;
                        gridElement.resources = gridObject.resources;
                        this.gridObjects[index] = gridElement;
                    }
                }, this);
            }, this);
        };
        Grid.prototype.roadPlacement = function () {
            this._gridObjects.forEach(function (gridElement) {
                if (gridElement.owningPlayer == this._game.player.number && gridElement.type == 'building') {
                    gridElement.links.forEach(function (link) {
                        var linkedGridElement = this.gridObjects[link];
                        if (linkedGridElement.owningPlayer == null) {
                            linkedGridElement.sprite.visible = true;
                            this._gridObjects[link] = linkedGridElement;
                        }
                    }, this);
                }
            }, this);
        };
        Grid.prototype.townPlacement = function (showAll) {
            if (showAll === void 0) { showAll = false; }
            if (showAll) {
                this._gridObjects.forEach(function (gridElement, index) {
                    if (gridElement.owningPlayer == null && gridElement.type == 'building') {
                        gridElement.sprite.visible = true;
                        this._gridObjects[index] = gridElement;
                    }
                }, this);
            }
            else {
                this._gridObjects.forEach(function (gridElement, index) {
                    if (gridElement.owningPlayer == this._game.player.number && gridElement.type == 'road') {
                        gridElement.links.forEach(function (link) {
                            var linkedGridElement = this.gridObjects[link];
                            if (!this.isPlacementBlocked(linkedGridElement)) {
                                linkedGridElement.sprite.visible = true;
                                this._gridObjects[link] = linkedGridElement;
                            }
                        }, this);
                    }
                }, this);
            }
        };
        Grid.prototype.cityPlacement = function () {
            this._gridObjects.forEach(function (gridElement) {
                if (gridElement.owningPlayer == this._game.player.number && gridElement.type == 'building' && gridElement.playerPieceType == 'settlement') {
                    gridElement.sprite.inputEnabled = true;
                    gridElement.sprite.input.useHandCursor = true;
                    gridElement.sprite.events.onInputDown.add(this.mouseClick, this, 0, gridElement.type);
                }
            }, this);
        };
        Grid.prototype.updateSpriteGraphics = function (sprite, playerPieceType, playerNumber) {
            var player = this._game.getPlayer(playerNumber);
            switch (playerPieceType) {
                case 'road':
                    sprite.loadTexture('roads', player.color + 'Road');
                    break;
                case 'settlement':
                    sprite.loadTexture('buildings', player.color + 'Village');
                    break;
                case 'city':
                    sprite.loadTexture('buildings', player.color + 'City');
                    break;
                default:
                    break;
            }
        };
        Grid.prototype.isPlacementBlocked = function (elementToCheck) {
            elementToCheck.links.forEach(function (link) {
                var linkedGridElement = this.gridObjects[link];
                if (linkedGridElement.owningPlayer != this._game.player.number) {
                    return true;
                }
                else if (linkedGridElement.owningPlayer == null) {
                    return false;
                }
                else {
                    return false;
                }
            }, this);
        };
        Grid.prototype.addGraphicElement = function (gridObject) {
            var element;
            var gridElement = new Catan.GridElement();
            var playerObject = null;
            if (gridObject.owningPlayer != null) {
                this._players.forEach(function (player) {
                    if (player.number == gridObject.owningPlayer) {
                        playerObject = player;
                    }
                });
            }
            gridElement.type = gridObject.type;
            gridElement.links = gridObject.links;
            gridElement.serverIndex = gridObject.serverIndex;
            gridElement.playerPieceType = gridObject.playerPieceType;
            gridElement.owningPlayer = gridObject.owningPlayer;
            if (gridObject.type == "building") {
                if (playerObject != null) {
                    var pieceType = null;
                    if (gridElement.playerPieceType == 'settlement') {
                        pieceType = 'Village';
                    }
                    else {
                        pieceType = 'City';
                    }
                    switch (playerObject.color) {
                        case 'blue':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "buildings", "blue" + pieceType);
                            break;
                        case 'red':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "buildings", "red" + pieceType);
                            break;
                        case 'green':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "buildings", "green" + pieceType);
                            break;
                        case 'yellow':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "buildings", "yellow" + pieceType);
                            break;
                    }
                }
                else {
                    element = this._game.add.sprite(gridObject.x, gridObject.y, "circle");
                }
                element.anchor.set(gridObject.anchorX, gridObject.anchorY);
                gridElement.resources = gridObject.resources;
                this._buildingObjects.add(element);
            }
            else {
                if (playerObject != null) {
                    switch (playerObject.color) {
                        case 'blue':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "roads", "blueRoad");
                            break;
                        case 'red':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "roads", "redRoad");
                            break;
                        case 'green':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "roads", "greenRoad");
                            break;
                        case 'yellow':
                            element = this._game.add.sprite(gridObject.x, gridObject.y, "roads", "yellowRoad");
                            break;
                    }
                }
                else {
                    element = this._game.add.sprite(gridObject.x, gridObject.y, "road");
                }
                element.anchor.set(gridObject.anchorX, gridObject.anchorY);
                element.angle = gridObject.angle;
                if (gridElement.serverIndex == 49) {
                    console.log(gridElement);
                }
                this._roadObjects.add(element);
            }
            if (gridElement.owningPlayer == null) {
                element.inputEnabled = true;
                element.input.useHandCursor = true;
                element.events.onInputDown.add(this.mouseClick, this, 0, gridElement.type);
            }
            gridElement.sprite = element;
            this._gridObjects.push(gridElement);
        };
        Grid.prototype.mouseClick = function (sprite, event, type) {
            var placementValid = null;
            this.gridObjects.forEach(function (gridElement) {
                if (sprite.z == gridElement.sprite.z &&
                    type == gridElement.type &&
                    (gridElement.owningPlayer == null ||
                        gridElement.owningPlayer == this._game.player.number) &&
                    sprite.visible == true) {
                    this._game.socket.emit('placeObject', [gridElement.serverIndex, this._game.player.number, this._placementType], function (data) {
                        placementValid = data;
                        if (!placementValid) {
                            alert('You cannot place a ' + type + ' here');
                        }
                        else {
                            if (Catan.Game.gameObject.map.grid.placementType == 'city') {
                                Catan.Game.gameObject.map.grid.gridObjects.forEach(function (gridElementInner) {
                                    if (gridElementInner.playerPieceType == 'settlement') {
                                        gridElementInner.sprite.events.onInputDown.removeAll();
                                        gridElementInner.sprite.inputEnabled = false;
                                        gridElementInner.sprite.input.useHandCursor = false;
                                    }
                                });
                            }
                            gridElement.sprite.events.onInputDown.removeAll();
                            gridElement.sprite.inputEnabled = false;
                            gridElement.sprite.input.useHandCursor = false;
                            Catan.Game.gameObject.map.grid.hidePlacementTiles();
                            Catan.Game.gameObject.placementAllowed = false;
                            if (Catan.Game.gameObject.gameState == 'placementPhase') {
                                if (Catan.Game.gameObject.player.pieces.settlements.length == 1 && Catan.Game.gameObject.player.pieces.roads.length == 1) {
                                    Catan.Game.gameObject.socket.emit('endTurn');
                                }
                                else if (Catan.Game.gameObject.player.pieces.settlements.length == 2 && Catan.Game.gameObject.player.pieces.roads.length == 2) {
                                    Catan.Game.gameObject.socket.emit('endTurn');
                                }
                            }
                        }
                    });
                }
            }, this);
        };
        return Grid;
    })();
    Catan.Grid = Grid;
})(Catan || (Catan = {}));
/// <reference path="../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var GridElement = (function () {
        function GridElement() {
            this._sprite = null;
            this._type = null;
            this._owningPlayer = null;
            this._links = [];
            this._resources = [];
            this._serverIndex = null;
        }
        Object.defineProperty(GridElement.prototype, "sprite", {
            get: function () {
                return this._sprite;
            },
            set: function (value) {
                this._sprite = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridElement.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridElement.prototype, "owningPlayer", {
            get: function () {
                return this._owningPlayer;
            },
            set: function (value) {
                this._owningPlayer = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridElement.prototype, "links", {
            get: function () {
                return this._links;
            },
            set: function (value) {
                this._links = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridElement.prototype, "resources", {
            get: function () {
                return this._resources;
            },
            set: function (value) {
                this._resources = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridElement.prototype, "serverIndex", {
            get: function () {
                return this._serverIndex;
            },
            set: function (value) {
                this._serverIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridElement.prototype, "playerPieceType", {
            get: function () {
                return this._playerPieceType;
            },
            set: function (value) {
                this._playerPieceType = value;
            },
            enumerable: true,
            configurable: true
        });
        return GridElement;
    })();
    Catan.GridElement = GridElement;
})(Catan || (Catan = {}));
/// <reference path="../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var UiFactory = (function () {
        function UiFactory(game) {
            this._game = game;
            this._uiElements = this._game.add.group();
        }
        ;
        UiFactory.prototype.setupUI = function () {
            this.addElement('resourceBar');
            this.addElement('sideBar');
            this.addElement('scoreBar');
            this.addElement('turnButton');
            this.addElement('diceBar');
            this.addElement('screenMessages');
        };
        UiFactory.prototype.updateElements = function () {
            this._uiElements.forEach(function (element) {
                element.updateText();
            }, this);
        };
        UiFactory.prototype.addElement = function (elementType) {
            var element;
            switch (elementType) {
                case 'resourceBar':
                    element = new Catan.ResourceBar(this._game, elementType);
                    break;
                case 'sideBar':
                    element = new Catan.SideBar(this._game, elementType);
                    break;
                case 'scoreBar':
                    element = new Catan.ScoreBar(this._game, elementType);
                    break;
                case 'turnButton':
                    element = new Catan.TurnButton(this._game, elementType);
                    break;
                case 'diceBar':
                    element = new Catan.DiceBar(this._game, elementType);
                    break;
                case 'screenMessages':
                    element = new Catan.ScreenMessages(this._game);
                    break;
                default:
                    console.log('Error: Element not found');
            }
            element.setup();
            this._uiElements.add(element);
            this._game.world.bringToTop(this._uiElements);
        };
        return UiFactory;
    })();
    Catan.UiFactory = UiFactory;
})(Catan || (Catan = {}));
/// <reference path="../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var UiElementAbstract = (function (_super) {
        __extends(UiElementAbstract, _super);
        function UiElementAbstract(game, key, frame) {
            _super.call(this, game.game, 0, 0, key, frame);
            this._gameObject = game;
            this._elements = this._gameObject.add.group(this);
            this._style = {
                font: '25px Arial',
                fill: '#ffffff',
                align: 'center'
            };
        }
        Object.defineProperty(UiElementAbstract.prototype, "elements", {
            get: function () {
                return this._elements;
            },
            set: function (value) {
                this._elements = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UiElementAbstract.prototype, "gameObject", {
            get: function () {
                return this._gameObject;
            },
            set: function (value) {
                this._gameObject = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UiElementAbstract.prototype, "style", {
            get: function () {
                return this._style;
            },
            set: function (value) {
                this._style = value;
            },
            enumerable: true,
            configurable: true
        });
        UiElementAbstract.prototype.addSprite = function (x, y, key, frame) {
            var element = this._gameObject.add.sprite(x, y, key, frame);
            this._elements.add(element);
            return element;
        };
        UiElementAbstract.prototype.addText = function (x, y, style, textString, anchor) {
            if (anchor === void 0) { anchor = { x: 0, y: 0 }; }
            var text = this._gameObject.add.text(x, y, textString, style);
            text.anchor.set(anchor.x, anchor.y);
            this._elements.add(text);
            return text;
        };
        UiElementAbstract.prototype.addButton = function (x, y, key, callback) {
            var button = this._gameObject.add.button(x, y, key, callback, this);
            this._elements.add(button);
            return button;
        };
        return UiElementAbstract;
    })(Phaser.Sprite);
    Catan.UiElementAbstract = UiElementAbstract;
})(Catan || (Catan = {}));
/// <reference path="../../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var ResourceBar = (function (_super) {
        __extends(ResourceBar, _super);
        function ResourceBar() {
            _super.apply(this, arguments);
        }
        ResourceBar.prototype.setup = function () {
            this.fixedToCamera = true;
            this.anchor.set(0.5, 1);
            this.cameraOffset.setTo(this.gameObject.camera.width / 2, this.gameObject.camera.height);
            this.gameObject.add.existing(this);
            this.addElements();
            this.updateText();
        };
        ResourceBar.prototype.addElements = function () {
            var playerResources = this.gameObject.player.resources;
            var x = this.x - (this.width / 2) + 160;
            var y = this.y - (this.height / 2) + 10;
            Object.keys(playerResources).forEach(function (resourceName) {
                switch (resourceName) {
                    case 'wood':
                        this._woodText = this.addText(x, y, this.style, playerResources.wood, { x: 0, y: 0.5 });
                        break;
                    case 'stone':
                        this._stoneText = this.addText(x + 371, y, this.style, playerResources.stone, { x: 0, y: 0.5 });
                        break;
                    case 'ore':
                        this._oreText = this.addText(x + 92, y, this.style, playerResources.ore, { x: 0, y: 0.5 });
                        break;
                    case 'sheep':
                        this._sheepText = this.addText(x + 278, y, this.style, playerResources.sheep, { x: 0, y: 0.5 });
                        break;
                    case 'wheat':
                        this._wheatText = this.addText(x + 185, y, this.style, playerResources.wheat, { x: 0, y: 0.5 });
                        break;
                }
            }, this);
        };
        ResourceBar.prototype.updateText = function () {
            var playerResources = this.gameObject.player.resources;
            this._woodText.setText(playerResources.wood);
            this._stoneText.setText(playerResources.stone);
            this._oreText.setText(playerResources.ore);
            this._sheepText.setText(playerResources.sheep);
            this._wheatText.setText(playerResources.wheat);
        };
        return ResourceBar;
    })(Catan.UiElementAbstract);
    Catan.ResourceBar = ResourceBar;
})(Catan || (Catan = {}));
/// <reference path="../../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var SideBar = (function (_super) {
        __extends(SideBar, _super);
        function SideBar() {
            _super.apply(this, arguments);
        }
        SideBar.prototype.setup = function () {
            //this._roadsTotal = 15;
            //this._settlementsTotal = 5;
            //this._citiesTotal = 4;
            //this._roadsBought = 0;
            //this._settlementsBought = 0;
            //this._citiesBought = 0;
            this._roadText = null;
            this._settlementText = null;
            this._cityText = null;
            this.fixedToCamera = true;
            this.anchor.set(1, 0.5);
            this.cameraOffset.setTo(this.gameObject.camera.width, this.gameObject.camera.height / 2);
            this.gameObject.add.existing(this);
            this.setupPieceInfo();
            this.addElements();
        };
        SideBar.prototype.addElements = function () {
            this.style.font = "24px Arial";
            var fistOfRowAdded;
            var lastAdded;
            var x = this.x - this.width;
            var y = this.y - (this.height / 2);
            this._roadText = fistOfRowAdded = this.addText(x + 20, y + 20, this.style, 'Roads ' + this._roadsBought + '/' + this._roadsTotal);
            fistOfRowAdded = this.addSprite(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'resources', 'wood');
            lastAdded = this.addText(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, this.style, 'x1');
            lastAdded = this.addSprite(lastAdded.x + lastAdded.width + 5, lastAdded.y, 'resources', 'stone');
            lastAdded = this.addText(lastAdded.x + lastAdded.width + 5, lastAdded.y, this.style, 'x1');
            fistOfRowAdded = this.addButton(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'buyButton', this.buyRoad);
            this.addButton(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, 'placeButton', this.placeRoad);
            this._settlementText = fistOfRowAdded = this.addText(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 10, this.style, 'Settlements ' + this._settlementsBought + '/' + this._settlementsTotal);
            fistOfRowAdded = this.addSprite(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'resources', 'wood');
            lastAdded = this.addText(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, this.style, 'x1');
            lastAdded = this.addSprite(lastAdded.x + lastAdded.width + 5, lastAdded.y, 'resources', 'stone');
            lastAdded = this.addText(lastAdded.x + lastAdded.width + 5, lastAdded.y, this.style, 'x1');
            fistOfRowAdded = this.addSprite(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'resources', 'wheat');
            lastAdded = this.addText(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, this.style, 'x1');
            lastAdded = this.addSprite(lastAdded.x + lastAdded.width + 5, lastAdded.y, 'resources', 'sheep');
            lastAdded = this.addText(lastAdded.x + lastAdded.width + 5, lastAdded.y, this.style, 'x1');
            fistOfRowAdded = this.addButton(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'buyButton', this.buySettlement);
            this.addButton(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, 'placeButton', this.placeSettlement);
            this._cityText = fistOfRowAdded = this.addText(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 10, this.style, 'Cities ' + this._citiesBought + '/' + this._citiesTotal);
            fistOfRowAdded = this.addSprite(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'resources', 'ore');
            lastAdded = this.addText(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, this.style, 'x3');
            lastAdded = this.addSprite(lastAdded.x + lastAdded.width + 5, lastAdded.y, 'resources', 'wheat');
            lastAdded = this.addText(lastAdded.x + lastAdded.width + 5, lastAdded.y, this.style, 'x2');
            fistOfRowAdded = this.addButton(fistOfRowAdded.x, fistOfRowAdded.y + fistOfRowAdded.height + 5, 'buyButton', this.buyCity);
            this.addButton(fistOfRowAdded.x + fistOfRowAdded.width + 5, fistOfRowAdded.y, 'placeButton', this.placeCity);
        };
        SideBar.prototype.updateText = function () {
            this.visible = !!(this.gameObject.gameState == 'mainPhase' && this.gameObject.player.playerTurn && this.gameObject.player.diceRolled);
            this.setupPieceInfo();
            this._roadText.setText('Roads ' + this._roadsBought + '/' + this._roadsTotal);
            this._settlementText.setText('Settlements ' + this._settlementsBought + '/' + this._settlementsTotal);
            this._cityText.setText('Cities ' + this._citiesBought + '/' + this._citiesTotal);
        };
        SideBar.prototype.setupPieceInfo = function () {
            this._roadsTotal = 15;
            this._settlementsTotal = 5;
            this._citiesTotal = 4;
            this._roadsBought = 0;
            this._settlementsBought = 0;
            this._citiesBought = 0;
            this.gameObject.player.pieces.roads.forEach(function (piece) {
                if (piece.state == 'bought') {
                    this._roadsBought++;
                    this._roadsTotal--;
                }
                else if (piece.state == 'placed') {
                    this._roadsTotal--;
                }
            }, this);
            this.gameObject.player.pieces.settlements.forEach(function (piece) {
                if (piece.state == 'bought') {
                    this._settlementsBought++;
                    this._settlementsTotal--;
                }
                else if (piece.state == 'placed') {
                    this._settlementsTotal--;
                }
            }, this);
            this.gameObject.player.pieces.cities.forEach(function (piece) {
                if (piece.state == 'bought') {
                    this._citiesBought++;
                    this._citiesTotal--;
                }
                else if (piece.state == 'placed') {
                    this._citiesTotal--;
                }
            }, this);
        };
        SideBar.prototype.buyRoad = function () {
            if (this._roadsTotal == 0) {
                alert('You can not buy any more roads');
            }
            else {
                this.gameObject.socket.emit('hasResourcesToBuyPiece', 'road', function (data) {
                    if (data) {
                        Catan.Game.gameObject.socket.emit('buyPiece', 'road');
                    }
                    else {
                        alert('You do not have the resources to buy a road.');
                    }
                });
            }
        };
        SideBar.prototype.placeRoad = function () {
            this.gameObject.socket.emit('hasPieceToPlace', 'road', function (data) {
                if (data) {
                    Catan.Game.gameObject.placementAllowed = true;
                    Catan.Game.gameObject.placementType = 'road';
                }
                else {
                    alert('You cannot place a road without first buying one.');
                }
            });
        };
        SideBar.prototype.buySettlement = function () {
            if (this._settlementsTotal == 0) {
                alert('You can not buy any more settlements');
            }
            else {
                this.gameObject.socket.emit('hasResourcesToBuyPiece', 'settlement', function (data) {
                    if (data) {
                        Catan.Game.gameObject.socket.emit('buyPiece', 'settlement');
                    }
                    else {
                        alert('You do not have the resources to buy a settlement.');
                    }
                });
            }
        };
        SideBar.prototype.placeSettlement = function () {
            this.gameObject.socket.emit('hasPieceToPlace', 'settlement', function (data) {
                if (data) {
                    Catan.Game.gameObject.placementAllowed = true;
                    Catan.Game.gameObject.placementType = 'settlement';
                }
                else {
                    alert('You cannot place a settlement without first buying one.');
                }
            });
        };
        SideBar.prototype.buyCity = function () {
            if (this._citiesTotal == 0) {
                alert('You can not buy any more citys');
            }
            else {
                this.gameObject.socket.emit('hasResourcesToBuyPiece', 'city', function (data) {
                    if (data) {
                        Catan.Game.gameObject.socket.emit('buyPiece', 'city');
                    }
                    else {
                        alert('You do not have the resources to buy a city.');
                    }
                });
            }
        };
        SideBar.prototype.placeCity = function () {
            this.gameObject.socket.emit('hasPieceToPlace', 'city', function (data) {
                if (data) {
                    Catan.Game.gameObject.placementAllowed = true;
                    Catan.Game.gameObject.placementType = 'city';
                }
                else {
                    alert('You cannot place a city without first buying one.');
                }
            });
        };
        return SideBar;
    })(Catan.UiElementAbstract);
    Catan.SideBar = SideBar;
})(Catan || (Catan = {}));
/// <reference path="../../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var ScoreBar = (function (_super) {
        __extends(ScoreBar, _super);
        function ScoreBar() {
            _super.apply(this, arguments);
        }
        ScoreBar.prototype.setup = function () {
            this.fixedToCamera = true;
            this.cameraOffset.setTo(0, 0);
            this.gameObject.add.existing(this);
            this.addElements();
        };
        ScoreBar.prototype.addElements = function () {
            this._lastAddedElement = this.addText(this.width / 2, this.y + 10, this.style, 'Score', { x: 0.5, y: 0 });
            this._lastAddedElement = this.addPlayerScore(this._lastAddedElement, this.gameObject.player, this.style);
            this.gameObject.players.forEach(function (player) {
                if (player.number != this.gameObject.player.number) {
                    this._lastAddedElement = this.addPlayerScore(this._lastAddedElement, player, this.style);
                }
            }, this);
        };
        ScoreBar.prototype.addPlayerScore = function (lastAddedElement, player, style) {
            var playerName;
            if (this.gameObject.player.number == player.number) {
                playerName = 'You';
            }
            else {
                playerName = 'Player ' + player.number;
            }
            switch (player.color) {
                case 'blue':
                    lastAddedElement = this.addSprite(this.x + 10, lastAddedElement.y + lastAddedElement.height + 5, 'buildings', 'blueVillage');
                    break;
                case 'red':
                    lastAddedElement = this.addSprite(this.x + 10, lastAddedElement.y + lastAddedElement.height + 5, 'buildings', 'redVillage');
                    break;
                case 'green':
                    lastAddedElement = this.addSprite(this.x + 10, lastAddedElement.y + lastAddedElement.height + 5, 'buildings', 'greenVillage');
                    break;
                case 'yellow':
                    lastAddedElement = this.addSprite(this.x + 10, lastAddedElement.y + lastAddedElement.height + 5, 'buildings', 'yellowVillage');
                    break;
            }
            var playerScore = this.addText(lastAddedElement.x + lastAddedElement.width + 5, lastAddedElement.y, style, playerName + ' = ' + player.points);
            switch (player.number) {
                case 1:
                    this._player1Score = playerScore;
                    break;
                case 2:
                    this._player2Score = playerScore;
                    break;
                case 3:
                    this._player3Score = playerScore;
                    break;
                case 4:
                    this._player4Score = playerScore;
                    break;
            }
            return lastAddedElement;
        };
        ScoreBar.prototype.updateText = function () {
            var playerName;
            this.gameObject.players.forEach(function (player) {
                if (this.gameObject.player.number == player.number) {
                    playerName = 'You';
                }
                else {
                    playerName = 'Player ' + player.number;
                }
                switch (player.number) {
                    case 1:
                        this._player1Score.setText(playerName + ' = ' + player.points);
                        break;
                    case 2:
                        if (typeof this._player2Score == 'undefined') {
                            this._lastAddedElement = this.addPlayerScore(this._lastAddedElement, player, this.style);
                        }
                        this._player2Score.setText(playerName + ' = ' + player.points);
                        break;
                    case 3:
                        if (typeof this._player3Score == 'undefined') {
                            this._lastAddedElement = this.addPlayerScore(this._lastAddedElement, player, this.style);
                        }
                        this._player3Score.setText(playerName + ' = ' + player.points);
                        break;
                    case 4:
                        if (typeof this._player4Score == 'undefined') {
                            this._lastAddedElement = this.addPlayerScore(this._lastAddedElement, player, this.style);
                        }
                        this._player4Score.setText(playerName + ' = ' + player.points);
                        break;
                }
            }, this);
        };
        return ScoreBar;
    })(Catan.UiElementAbstract);
    Catan.ScoreBar = ScoreBar;
})(Catan || (Catan = {}));
/// <reference path="../../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var TurnButton = (function (_super) {
        __extends(TurnButton, _super);
        function TurnButton() {
            _super.apply(this, arguments);
        }
        TurnButton.prototype.setup = function () {
            this.fixedToCamera = true;
            this.anchor.set(1, 1);
            this.cameraOffset.setTo(this.gameObject.camera.width - 5, this.gameObject.camera.height - 5);
            this.gameObject.add.existing(this);
            this.addElements();
            this.updateText();
        };
        TurnButton.prototype.addElements = function () {
            this.style.font = "22px Arial";
            var buttonElement = this.addButton(this.x, this.y, 'turnButton', this.processTurn);
            buttonElement.anchor.set(1, 1);
            this._buttonText = this.addText(this.x - this.width / 2, this.y - this.height / 2, this.style, 'Button', { x: 0.5, y: 0.5 });
        };
        TurnButton.prototype.updateText = function () {
            this.visible = true;
            if (this.gameObject.player.playerTurn) {
                if (this.gameObject.gameState == 'new') {
                    this._buttonText.setText('Start Game');
                }
                else if ((this.gameObject.gameState == 'turnOrderPhase' ||
                    this.gameObject.gameState == 'mainPhase') &&
                    !this.gameObject.player.diceRolled) {
                    this._buttonText.setText('Roll Dice');
                }
                else if (this.gameObject.gameState == 'mainPhase' && this.gameObject.player.diceRolled) {
                    this._buttonText.setText('End Turn');
                }
                else {
                    this.visible = false;
                }
            }
            else {
                this.visible = false;
            }
        };
        TurnButton.prototype.processTurn = function () {
            if (this.gameObject.players.length < 2) {
                alert('You need at least two players to start a game');
            }
            else if (this.gameObject.gameState == 'new') {
                this.gameObject.socket.emit('startGame');
            }
            else if (this.gameObject.gameState == 'turnOrderPhase') {
                this.gameObject.socket.emit('rollDice');
            }
            else if (this.gameObject.gameState == 'mainPhase' && this.gameObject.player.playerTurn && !this.gameObject.player.diceRolled) {
                this.gameObject.socket.emit('rollDice');
            }
            else if (this.gameObject.gameState == 'mainPhase' && this.gameObject.player.playerTurn && this.gameObject.player.diceRolled) {
                this.gameObject.socket.emit('endTurn');
            }
        };
        return TurnButton;
    })(Catan.UiElementAbstract);
    Catan.TurnButton = TurnButton;
})(Catan || (Catan = {}));
/// <reference path="../../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var DiceBar = (function (_super) {
        __extends(DiceBar, _super);
        function DiceBar() {
            _super.apply(this, arguments);
        }
        DiceBar.prototype.setup = function () {
            this.fixedToCamera = true;
            this.anchor.set(1, 0);
            this.cameraOffset.setTo(this.gameObject.camera.width, 0);
            this.gameObject.add.existing(this);
            this.addElements();
        };
        DiceBar.prototype.addElements = function () {
            var lastElement;
            lastElement = this.addText(this.x - this.width + 15, this.y + this.height / 2, this.style, 'Dice', { x: 0, y: 0.5 });
            if (this.gameObject.dice.one > 9) {
                this._dice1 = lastElement = this.addText(lastElement.x + lastElement.width + 22, lastElement.y, this.style, this.gameObject.dice.one, { x: 0, y: 0.5 });
                if (this.gameObject.dice.two > 9) {
                    this._dice2 = lastElement = this.addText(lastElement.x + lastElement.width + 22, lastElement.y, this.style, this.gameObject.dice.two, { x: 0, y: 0.5 });
                }
                else {
                    this._dice2 = lastElement = this.addText(lastElement.x + lastElement.width + 25, lastElement.y, this.style, this.gameObject.dice.two, { x: 0, y: 0.5 });
                }
            }
            else {
                this._dice1 = lastElement = this.addText(lastElement.x + lastElement.width + 30, lastElement.y, this.style, this.gameObject.dice.one, { x: 0, y: 0.5 });
                if (this.gameObject.dice.two > 9) {
                    this._dice2 = lastElement = this.addText(lastElement.x + lastElement.width + 22, lastElement.y, this.style, this.gameObject.dice.two, { x: 0, y: 0.5 });
                }
                else {
                    this._dice2 = lastElement = this.addText(lastElement.x + lastElement.width + 30, lastElement.y, this.style, this.gameObject.dice.two, { x: 0, y: 0.5 });
                }
            }
        };
        DiceBar.prototype.updateText = function () {
            this._dice1.setText(this.gameObject.dice.one);
            this._dice2.setText(this.gameObject.dice.two);
        };
        return DiceBar;
    })(Catan.UiElementAbstract);
    Catan.DiceBar = DiceBar;
})(Catan || (Catan = {}));
/// <reference path="../../../definitions/app.d.ts" />
var Catan;
(function (Catan) {
    var ScreenMessages = (function (_super) {
        __extends(ScreenMessages, _super);
        function ScreenMessages() {
            _super.apply(this, arguments);
        }
        ScreenMessages.prototype.setup = function () {
            this.fixedToCamera = true;
            this.cameraOffset.setTo(0, 0);
            this.gameObject.add.existing(this);
        };
        ScreenMessages.prototype.addElements = function () { };
        ScreenMessages.prototype.updateText = function () {
            this.style.font = "30px Arial";
            if (this.gameObject.gameState == 'endPhase') {
                this.gameObject.players.forEach(function (player) {
                    if (player.points == 10) {
                        if (player.number == this.gameObject.player.number) {
                            this.addText(this.gameObject.camera.width / 2, 20, this.style, 'You have won', { x: 0.5, y: 0 });
                        }
                        else {
                            this.addText(this.gameObject.camera.width / 2, 20, this.style, 'Player ' + player.number + ' has won', { x: 0.5, y: 0 });
                        }
                    }
                }, this);
            }
        };
        return ScreenMessages;
    })(Catan.UiElementAbstract);
    Catan.ScreenMessages = ScreenMessages;
})(Catan || (Catan = {}));
/// <reference path="../definitions/app.d.ts" />
window.onload = function () {
    var catan = new Catan.Catan();
};
