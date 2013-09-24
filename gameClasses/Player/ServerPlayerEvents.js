/**
 * The client-side player events component. Handles all client-side
 *  methods and events.
 */
var ServerPlayerEvents = {

    _onPlayerConnect: function (socket) {
        // Don't reject the client connection
        return false;
    },

    _onPlayerDisconnect: function (clientId) {

    },

    _onPlayerEntity: function (data, clientId) {
        var self = ige.playerNetworkEvents;

        if(!ige.server.players[clientId]){
            ige.server.players[clientId] = new CharacterContainer(clientId)
                .addComponent(PlayerComponent)
                .streamMode(1)
                .mount(ige.server.foregroundMap);
        }

        // Tell the client to track their player entity
        ige.network.send('playerEntity', ige.server.players[clientId].id(), clientId );
    },

    _onGoToDoor: function (data, clientId) {
        //console.log('map:--', data.map);
        if(data.map === 2){
            ige.network.send('goToDoor', {map: 'map2'}, clientId);
        }

        if(data.map === 1){
            ige.network.send('goToDoor', {map: 'map1'}, clientId);
        }

    }
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ServerPlayerEvents; }