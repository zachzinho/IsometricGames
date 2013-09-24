var ClientNetworkEvents = {
    /**
     * The server sent us a login packet which carries either
     * success or failure.
     * @param data
     * @private
     */
    _login: function (data) {
        if (data.success) {
            // Our login was successful!
            ige.client.log('Server accepted our login request...');
            ige.client.startClient();
        } else {
            ige.client.log('Server rejected our login request!');
        }
    },

    /**
     * The server sent us our map data so loop it and create
     * the appropriate buildings.
     * @param data
     * @private
     */
    _getMap: function (data) {
        ige.client.log('Map data received...');

    }
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = ClientNetworkEvents; }