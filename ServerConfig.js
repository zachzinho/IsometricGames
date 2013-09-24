var config = {
	include: [
		{name: 'ServerNetworkEvents', path: './gameClasses/ServerNetworkEvents'},

        /* Player game script*/
		{name: 'PlayerNetworkEvents', path: './gameClasses/Player/PlayerNetworkEvents'},
		{name: 'ServerPlayerEvents', path: './gameClasses/Player/ServerPlayerEvents'},
		{name: 'Character', path: './gameClasses/Player/Character'},
        {name: 'CharacterContainer', path: './gameClasses/Player/CharacterContainer'},
		{name: 'PlayerComponent', path: './gameClasses/Player/PlayerComponent'},
        {name: 'tiledExample1', path: './maps/example'},
        {name: 'map2', path: './maps/map2'}


	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = config; }