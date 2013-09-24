var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		ige.showStats(1);
        ige.globalSmoothing(true);

		var self = this;

        // Define an object to hold references to our player entities
        this.players = {};

		// Create the HTML canvas
		ige.createFrontBuffer(true);

        // Enable networking
        ige.addComponent(IgeNetIoComponent);

        // Implement our game methods
        this.implement(ClientNetworkEvents);
        this.gameTexture = [];
        this.gameTexture[0] = new IgeCellSheet('../gaming/assets/textures/tiles/grassSheet.png', 4, 1);
        this.gameTexture[1] = new IgeCellSheet('../gaming/assets/textures/tiles/dirtSheet.png', 4, 1);

        // Ask the engine to start
        ige.start(function (success) {
            // Check if the engine started successfully
            if (success) {
                self.connectToServer();
            }
        });

	},
    /**
     * Called by the server sending us a successful login
     * packet. See ClientNetworkEvents.js
     */
    startClient: function () {
        this.log('Starting game...');

        // Create the basic scene, viewport etc
        ige.client.setupScene();

        // Ask the server for our map data
        ige.network.send('getMap');

        //ige.client.loadTileMap();

        ige.client.loadTileMapTest();
    },
    //Connect to server
    connectToServer: function () {
        this.log('Start Game');
        ige.network.start('http://localhost:1000', function () {
            ige.addComponent(PlayerNetworkEvents);
            ige.addComponent(IgeChatComponent);

            ige.chat.joinRoom(112233);

            ige.network.define('login', ige.client._login);
            ige.network.define('getMap', ige.client._getMap);

            ige.client.getLoginInput();

            ige.network.send('login', {
                username : 'username',
                password : 'password'
            });

            // Setup the network stream handler
                ige.network.addComponent(IgeStreamComponent)
                .stream.renderLatency(160) // Render the simulation 160 milliseconds in the past
                .stream.on('entityCreated', function (entity) {
                    ige.client.log('Stream entity created with ID: ' + entity.id());
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
            .drawBounds(false)
            .drawBoundsData(false)
            .mount(this.mainScene);

        this.foregroundScene = new IgeScene2d()
            .id('foregroundScene')
            .layer(1)
            .drawBounds(false)
            .drawBoundsData(false)
            .mount(this.mainScene);

        this.foregroundMap = new IgeTileMap2d()
            .id('foregroundMap')
            .isometricMounts(true)
            .tileWidth(40)
            .tileHeight(40)
            .drawGrid(10)
            .drawMouse(true)
            .depthSortMode(0)
            .drawBounds(false)
            .drawBoundsData(false)
            .hoverColor('#BFE01B')
            .mount(this.foregroundScene);

        this.vp1 = new IgeViewport()
            .id('vp1')
            .autoSize(true)
            .addComponent(IgeMousePanComponent)
            .mousePan.enabled(true)
            .scene(this.mainScene)
            .drawBounds(true) // Switch this to true to draw all bounding boxes
            .drawBoundsData(true) // Switch to true (and flag above) to see bounds data
            .mount(ige);
    },

    getLoginInput: function (){
        $( "form" ).submit(function( event ) {
            var text = $( "input:first" ).val()
            ige.chat.sendToRoom(112233, text);
            $("input:first").val("");

            event.preventDefault();
        });
    },
    /**
     * Load the Tiled map data and handle the return data
     */
    loadTileMapTest: function () {
        ige.addComponent(IgeTiledComponent);
        ige.tiled.loadJson(tiledExample1, function (layerArray, layersById){
            console.log('Map Loaded....');
            for (i = 0; i < layerArray.length; i++) {
                layerArray[i]
                    .tileWidth(40)
                    .tileHeight(40)
                    .autoSection(20)
                    //.isometricMounts(false)
                    .drawBounds(false)
                    .drawBoundsData(false)
                    .mount(ige.client.backgroundScene);
            }
        });
    },
    /**
     * Load the Tiled map data and handle the return data
     */
    loadTileMap: function () {
        this.textureMap2 = new IgeTextureMap()
            .depth(1)
            .tileWidth(40)
            .tileHeight(40)
            .drawMouse(true)
            .autoSection(10)
            .drawBounds(false)
            .isometricMounts(true)
            .mount(ige.client.mainScene);

        var texIndex = this.textureMap2.addTexture(this.gameTexture[0]);

        this.textureMap2.loadMap(map1);
        //console.log(this.textureMap2.map.mapDataString());

    },
    /**
     * Load the Tiled map data and handle the return data
     */
    loadTileMap1: function () {
        this.textureMap1 = new IgeTextureMap()
            .depth(1)
            .tileWidth(40)
            .tileHeight(40)
            .drawMouse(true)
            .autoSection(10)
            .drawBounds(false)
            .isometricMounts(true)
            .mount(ige.client.mainScene);

        var texIndex = this.textureMap1.addTexture(this.gameTexture[1]);

        this.textureMap1.loadMap(map1);
        //console.log(this.textureMap1.map.mapDataString());

    }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }