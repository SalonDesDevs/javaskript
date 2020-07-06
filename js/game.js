
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
        score : 0,
        lost: false
	},

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, {wrapper : "screen", scale : "auto", scaleMethod : "flex-width"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },



    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.GAME_END, new game.WonScreen());
        me.state.set(me.state.GAMEOVER, new game.LostScreen());

        me.state.transition("fade", "#FFFFFF", 250);

		// add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("CoinEntity", game.CoinEntity);

		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,		"left");
		me.input.bindKey(me.input.KEY.RIGHT,	"right");
		// map X, Up Arrow and Space for jump1
		me.input.bindKey(me.input.KEY.X,		"jump", true);
		me.input.bindKey(me.input.KEY.UP,		"jump", true);
		me.input.bindKey(me.input.KEY.SPACE,	"jump", true);

        me.state.change(me.state.MENU);
    }
};