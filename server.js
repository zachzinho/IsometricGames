var Server = IgeClass.extend({
    classId: 'Server',
    Server: true,

    init: function (options) {
        var self = this;

        this.players = {};

        // Add the server-side game methods / event handlers
        this.implement(ServerNetworkEvents);

        // Add the networking component
        ige.addComponent(IgeNetIoComponent);

        // Start the network server
        ige.network.start(1000, function () {
            // Networking has started so start the game engine
            ige.start(function (success) {
                // Check if the engine started successfully
                if (success) {
                    self.log('Server Start successfully');

                    ige.addComponent(PlayerNetworkEvents);
                    ige.addComponent(IgeChatComponent);

                    ige.chat.createRoom('testRoom', ' ', 112233);
                    ige.network.define('getMap', self._getMap);

                    ige.network.define('login', self._login);

                    ige.network.define('playerControlToTile', self._onPlayerControlToTile);

                    ige.network.on('connect', self._onPlayerConnect); // Defined in ./gameClasses/ServerNetworkEvents.js
                    ige.network.on('disconnect', self._onPlayerDisconnect); // Defined in ./gameClasses/ServerNetworkEvents.js

                    // Add the network stream component
                    ige.network.addComponent(IgeStreamComponent)
                        .stream.sendInterval(30)
                        // Send a stream update once every 30 milliseconds
                        .stream.start(); // Start the stream

                    // Accept incoming network connections
                    ige.network.acceptConnections(true);

                    // Create the basic scene, viewport etc
                    self.setupScene();

                    //Load the map
                    self.loadTileMap();

                    self.pathFinder = new IgePathFinder()
                        .neighbourLimit(1000); // Set a high limit because we are using a large map
                }
            });
        });

    },

    // Create the basic scene, viewport etc
    setupScene: function () {
        this.mainScene = new IgeScene2d()
            .id('mainScene');

        this.backgroundScene = new IgeScene2d()
            .id('backgroundScene')
            .layer(0)
            .mount(this.mainScene);

        this.foregroundScene = new IgeScene2d()
            .id('foregroundScene')
            .layer(1)
            .mount(this.mainScene);

        this.foregroundMap = new IgeTileMap2d()
            .id('foregroundMap')
            .isometricMounts(true)
            .tileWidth(40)
            .tileHeight(40)
            .depthSortMode(0)
            .drawBounds(true)
            .drawBoundsData(true)
            .mount(this.foregroundScene);

        this.vp1 = new IgeViewport()
            .id('vp1')
            .autoSize(true)
            //.addComponent(IgeMousePanComponent)
            //.mousePan.enabled(true)
            .scene(this.mainScene)
            .drawBounds(true) // Switch this to true to draw all bounding boxes
            //.drawBoundsData(true) // Switch to true (and flag above) to see bounds data
            .mount(ige);
    },

    /**
     * Load the Tiled map data and handle the return data
     */
    loadTileMap: function () {
        ige.addComponent(IgeTiledComponent);
        ige.tiled.loadJson(tiledExample1, function (layerArray, layersById){
            console.log('Map Loaded');
        });
    }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Server; }