`npm install voxel-walk --save`
Spreading the good word.  Using --save updates your package.json automatically.

A simple walk cycle animation for minecraft-skin characters (used in Voxel.js), using code ripped directly out of Daniel Hede's "[Minecraft Items](http://djazz.mine.nu/lab/minecraft_items/)", the same project that birthed the minecraft-skin module.

[Run this example.](http://danfinlay.com/projects/voxeljs/walk/)

In the options parameter you pass a minecraft-skin object (npm minecraft-skin).  For example, if you have a minecraft-skin named duck:

    var createWalk = require('voxel-walk')

    walk = createWalk(null, {skin: duck})

In your render loop you call walk.render():

    var render = function () {
	    walk.render()
    }

When called, the walk function automatically detects the velocity of the skin, and eases the stride to an appropriate magnitude.

Alternatively you can pass a voxel-engine instance and enable `bindGameEvents`, then `render()` will be automatically called on the game `tick` event:

    walk = createWalk(game, {skin: skin, bindGameEvents: true})

If you want to run the demo, just run:

    npm install beefy -g
    beefy demo.js:bundle.js
