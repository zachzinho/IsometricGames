var PlayerNetworkEvents = IgeEventingClass.extend({
    classId: 'PlayerNetworkEvents',
    componentId: 'playerNetworkEvents',

    init: function (entity, options) {
        this._entity = entity;
        this._options = options;

        /* CEXCLUDE */
        if (ige.isServer) {
            this.implement(ServerPlayerEvents);

            // Define the chat system network commands
            this._entity
                .network.define('playerEntity', this._onPlayerEntity)
                .network.define('goToDoor', this._onGoToDoor);
        }
        /* CEXCLUDE */

        if (!ige.isServer) {
            this.implement(ClientPlayerEvents);

            // Define the chat system network command listeners
            this._entity
                .network.define('playerEntity', this._onPlayerEntity)
                .network.define('goToDoor', this._onGoToDoor);

            //Create player character on connect to server
            this._entity.network.send('playerEntity');
        }

        this.log('Player network event initiated!');
    }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = PlayerNetworkEvents; }