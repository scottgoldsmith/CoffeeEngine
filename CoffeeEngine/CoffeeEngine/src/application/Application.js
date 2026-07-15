/**
 * CoffeeEngine
 * Alpha 0.2.0
 *
 * Application.js
 *
 * Root object for CoffeeEngine.
 *
 * Responsibilities:
 *  - Own every subsystem
 *  - Start the engine
 *  - Shut down the engine
 *  - Provide access to registered services
 */

export default class Application {

    constructor(config = {}) {

        this.config = {

            width: 256,
            height: 256,
            fps: 60,

            parent: document.body,

            ...config

        };

        this.services = new Map();

        this.running = false;

    }

    /**
     * Register a service.
     *
     * Example:
     *
     * app.register("graphics", graphics);
     */
    register(name, service) {

        if (this.services.has(name)) {

            throw new Error(
                `Service '${name}' already exists.`
            );

        }

        service.app = this;

        this.services.set(name, service);

        return service;

    }

    /**
     * Retrieve a registered service.
     */
    get(name) {

        if (!this.services.has(name)) {

            throw new Error(
                `Unknown service '${name}'.`
            );

        }

        return this.services.get(name);

    }

    /**
     * Initialize every registered service.
     */
    async initialize() {

        for (const service of this.services.values()) {

            if (typeof service.initialize === "function") {

                await service.initialize();

            }

        }

    }

    /**
     * Start the application.
     */
    async start() {

        if (this.running) {

            return;

        }

        this.running = true;

        const runtime = this.get("runtime");

        let previous = performance.now();

        const loop = (time) => {

            if (!this.running) {

                return;

            }

            const dt = (time - previous) / 1000;

            previous = time;

            runtime.tick(dt);

            requestAnimationFrame(loop);

        };

        requestAnimationFrame(loop);

    }

    /**
     * Stop execution.
     */
    stop() {

        this.running = false;

    }

}