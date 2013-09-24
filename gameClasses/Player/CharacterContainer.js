// Define our player character container classes
var CharacterContainer = IgeEntity.extend({
    classId: 'CharacterContainer',

    init: function (data) {
        var self = this;
        IgeEntity.prototype.init.call(this);
        this._data = data;

        console.log('client id: ' + this._data);

        if (ige.isServer) {
            this._characterType = Math.floor(Math.random() * 6 + 1);
        }

        if (!ige.isServer) {
            // Setup the entity 3d bounds
            self.size3d(20, 20, 40)
                .drawBounds(true)
                .drawBoundsData(true);

            // Create a character entity as a child of this container
            self.character = new Character()
                .id(self.id() + '_character')
                .setType(4)
                .mount(self);

            // Set the co-ordinate system as isometric
            this.isometric(true);
        }

        if (ige.isServer) {
            this.addComponent(IgePathComponent);
        }

        // Define the data sections that will be included in the stream
        this.streamSections(['transform', 'direction' , 'characterType']);

    },
    roomId: function (roomId) {
        this._roomId = roomId;
        return this;
    },

    streamSectionData: function (sectionId, data) {
    // Check if the section is one that we are handling
    if (sectionId === 'direction') {
        // Check if the server sent us data, if not we are supposed
        // to return the data instead of set it
        if (!ige.isServer) {
            if (data) {
                // We have been given new data!
                this._streamDir = data;
            } else {
                this._streamDir = 'stop';
            }
        } else {
            // Return current data
            return this._streamDir;
        }
    }else if (sectionId === 'characterType') {
        if (!ige.isServer) {
            if (data) {
                // We have been given new data!
                this._streamCharacterType = data;
            } else {
                this._streamCharacterType = 'No Value';
            }
        } else {
            // Return current data
            return this._streamCharacterType;
        }

    }else {
        return IgeEntity.prototype.streamSectionData.call(this, sectionId, data);
    }
},

    update: function (ctx) {
        if (!ige.isServer) {

            var tiles = this.overTiles(), playerReachDoor = false;

            if((tiles[0].x === 1) && (tiles[0].y === 1)){
                playerReachDoor = true;
                if(playerReachDoor === true){
                    ige.network.send('goToDoor' , {id: this.id() , map:2});
                    playerReachDoor = false;
                }

                this.break;
            }
            if((tiles[0].x === 0) && (tiles[0].y === 0)){
                playerReachDoor = true;
                if(playerReachDoor === true){
                    ige.network.send('goToDoor' , {id: this.id() , map:1});
                    playerReachDoor = false;
                }

                this.break;
            }

        }

        if (ige.isServer)  {
            // Make sure the character is animating in the correct
            // direction - this variable is actually streamed to the client
            // when it's value changes!
            this._streamDir = this.path.currentDirection();
            this._streamCharacterType = this._characterType;
        } else {
            if (this._streamCharacterType) {

            }

            // Set the depth to the y co-ordinate which basically
            // makes the entity appear further in the foreground
            // the closer they become to the bottom of the screen
            this.depth(this._translate.y);

            if (this._streamDir) {
                if ((this._streamDir !== this._currentDir || !this.character.animation.playing())) {
                    this._currentDir = this._streamDir;

                    var dir = this._streamDir;
                    // The characters we are using only have four directions
                    // so convert the NW, SE, NE, SW to N, S, E, W
                    switch (this._streamDir) {
                        case 'S':
                            dir = 'W';
                            break;

                        case 'E':
                            dir = 'E';
                            break;

                        case 'N':
                            dir = 'E';
                            break;

                        case 'W':
                            dir = 'W';
                            break;
                    }

                    if (dir && dir !== 'stop') {
                        this.character.animation.start(dir);
                    } else {
                        this.character.animation.stop();
                    }
                }
            } else {
                console.log('NO CHARACTER ANIMATION');
                this.character.animation.stop();
            }
        }

        IgeEntity.prototype.update.call(this, ctx);
    }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = CharacterContainer; }