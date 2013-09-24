/**
 * The client-side player events component. Handles all client-side
 *  methods and events.
 */
var ClientPlayerEvents = {
    _onPlayerEntity: function (data) {
        var self = ige.playerNetworkEvents;
        if (ige.$(data)) {
            // Add the player control component
            ige.$(data).addComponent(PlayerComponent);
            console.log('data already initiated');

            // Track our player with the camera
            ige.client.vp1.camera.trackTranslate(ige.$(data), 5);
        } else {
            self._eventListener = ige.network.stream.on('entityCreated', function (entity) {
                if (entity.id() === data) {
                    // Add the player control component
                    ige.$(data).addComponent(PlayerComponent);
                    console.log('data not initiated');

                    ige.client.players = ige.$(data);

                    // Tell the camera to track out player entity
                    ige.client.vp1.camera.trackTranslate(ige.$(data), 5);

                    // Turn off the listener for this event now that we
                    // have found and started tracking our player entity
                    ige.network.stream.off('entityCreated', self._eventListener, function (result) {
                        if (!result) {
                            this.log('Could not disable event listener!', 'warning');
                        }
                    });
                }
            });
        }
    },

    _onGoToDoor: function (data, clientId) {
        //console.log('Map instruction received' , data.map);
            if(data.map == 'map2'){
                ige.client.textureMap2.destroy();
                ige.client.loadTileMap1();
            }
            if(data.map == 'map1'){
                ige.client.textureMap1.destroy();
                ige.client.loadTileMap();
            }
    }
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ClientPlayerEvents; }