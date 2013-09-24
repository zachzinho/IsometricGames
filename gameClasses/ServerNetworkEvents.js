var ServerNetworkEvents = {
    _clientStore: {},

    _login: function (data, clientId) {
        var self = ige.server;

        // TODO: Actually create a login system... at the moment we just accept the login from bob123
        console.log('Login request received', data);
        if (data.username === 'username' && data.password === 'password') {
            // Store the username in the client store
            self._clientStore[clientId] = self._clientStore[clientId] || {};
            self._clientStore[clientId].username = data.username;

            console.log('Sending login accepted...');
            ige.network.send('login', {success: true}, clientId);
        } else {
            console.log('Sending login denied...');
            ige.network.send('login', {success: false}, clientId);
        }
    },

    /**
     * Called when we receive a request from a client to load
     * the user's current map data and send it to them.
     * @param data
     * @param clientId
     * @private
     */
    _getMap: function (data, clientId) {
        // Grab all the data on the user's map
        var self = ige.server;

        console.log('Send Map to Client ' + clientId);
        ige.network.send('getMap', data);
    },

    _onPlayerConnect: function (socket) {
        // Don't reject the client connection
        return false;
    },

    _onPlayerDisconnect: function (clientId) {
        if (ige.server.players[clientId]) {
            // Remove the player from the game
            ige.server.players[clientId].destroy();

            // Remove the reference to the player entity
            // so that we don't leak memory
            delete ige.server.players[clientId];
        }
    },

    _onPlayerControlToTile: function (data, clientId) {
        if (ige.server.players[clientId]) {
            var playerEntity = ige.server.players[clientId],
                newPath,
                currentPosition = playerEntity._translate,
                startTile;

            console.log('Path to: ', data , 'From client: ', clientId);

            // Calculate the start tile from the current position by using the collision map
            // as a tile map (any map will do with the same tileWidth and height).
            startTile = playerEntity._parent.pointToTile(currentPosition.toIso());

            newPath = ige.server.pathFinder.aStar(ige.server.foregroundMap, startTile, new IgePoint(parseInt(data[0]), parseInt(data[1]), 0), function (tileData, tileX, tileY) {
                // If the map tile data is set to 1, don't allow a path along it
                // console.log('tileData', tileData);
                return tileData !== 1;
            }, true, false);

            playerEntity
                .path.clear()
                .path.add(newPath)
                .path.start();
        }
    }
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ServerNetworkEvents; }