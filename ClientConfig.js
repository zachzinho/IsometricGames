var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		'./gameClasses/ClientNetworkEvents.js',
        '../engine/components/chat/IgeChatClient.js',
        './maps/example.js',
        './maps/map2.js',
        './maps/map1.js',

        /* Player game scripts */
        './gameClasses/Player/PlayerNetworkEvents.js',
        './gameClasses/Player/ClientPlayerEvents.js',
        './gameClasses/Player/Character.js',
        './gameClasses/Player/CharacterContainer.js',
        './gameClasses/Player/PlayerComponent.js',

		/* Standard game scripts */
		'./client.js',
		'./index.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }