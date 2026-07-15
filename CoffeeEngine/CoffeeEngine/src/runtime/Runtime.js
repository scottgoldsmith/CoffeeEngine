/**
 * CoffeeEngine
 * Alpha 0.2.0
 *
 * Runtime.js
 *
 * Executes CoffeeEngine games.
 */

export default class Runtime {

    constructor() {

        this.app = null;

        this.game = null;

        this.graphics = null;
        this.input = null;

        this.initialized = false;

        this.time = {

            delta: 0,
            frame: 0,
            fps: 60

        };

    }

    async initialize() {

        this.graphics =
            this.app.get("graphics");

        this.input =
            this.app.get("input");

    }

    /**
     * Loads a game module.
     *
     * The module should export:
     *
     * init(game)
     * update(game, dt)
     * draw(game)
     */

    async load(module) {

        this.game = module;

        if (
            this.game &&
            typeof this.game.init === "function"
        ) {

            await this.game.init(
                this.createGameAPI()
            );

        }

        this.initialized = true;

    }

    /**
     * Called once every frame by Application.
     */

    tick(dt) {

        if (!this.initialized) {

            return;

        }

        this.time.delta = dt;
        this.time.frame++;

        if (dt > 0) {

            this.time.fps =
                Math.round(1 / dt);

        }

        this.input.beginFrame();

        const game =
            this.createGameAPI();

        if (
            typeof this.game.update ===
            "function"
        ) {

            this.game.update(

                game,

                dt

            );

        }

        this.graphics.beginFrame();

        if (
            typeof this.game.draw ===
            "function"
        ) {

            this.game.draw(

                game

            );

        }

        this.graphics.endFrame();

        this.input.endFrame();

    }

    /**
     * Creates the public API exposed to games.
     */

    createGameAPI() {

        return {

            graphics: this.graphics,

            input: this.input,

            time: this.time

        };

    }

}