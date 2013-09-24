var map2 = { "height":100,
    "layers":[
        {
            "data":[1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            "height":100,
            "name":"GrassLine",
            "opacity":1,
            "type":"tilelayer",
            "visible":true,
            "width":100,
            "x":0,
            "y":0
        },
        {
            "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "height":100,
            "name":"DirtLine",
            "opacity":1,
            "type":"tilelayer",
            "visible":true,
            "width":100,
            "x":0,
            "y":0
        }],
    "orientation":"isometric",
    "properties":
    {

    },
    "tileheight":50,
    "tilesets":[
        {
            "firstgid":1,
            "image":"..\/gaming\/assets\/textures\/tiles\/grassSheet.png",
            "imageheight":50,
            "imagewidth":400,
            "margin":0,
            "name":"grassMap",
            "properties":
            {

            },
            "spacing":0,
            "tileheight":50,
            "tilewidth":100
        },
        {
            "firstgid":5,
            "image":"..\/gaming\/assets\/textures\/tiles\/dirtSheet.png",
            "imageheight":50,
            "imagewidth":400,
            "margin":0,
            "name":"dirtMap",
            "properties":
            {

            },
            "spacing":0,
            "tileheight":50,
            "tilewidth":100
        }],
    "tilewidth":100,
    "version":1,
    "width":10
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = map2; }