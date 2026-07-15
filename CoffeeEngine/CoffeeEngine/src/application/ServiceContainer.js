/**
 * CoffeeEngine
 * Alpha 0.2.0
 *
 * ServiceContainer.js
 *
 * Registers and manages application services.
 *
 * Responsibilities:
 *  - Register services
 *  - Retrieve services
 *  - Initialize services
 *  - Shutdown services
 *
 * This class does NOT know anything about games,
 * graphics, projects, or the editor.
 */

export default class ServiceContainer {

    constructor(app) {

        this.app = app;

        this.services = new Map();

    }

    /**
     * Register a service.
     *
     * @param {string} name
     * @param {Object} service
     */
    register(name, service) {

        if (this.services.has(name)) {

            throw new Error(
                `Service '${name}' is already registered.`
            );

        }

        service.app = this.app;

        this.services.set(name, service);

        return service;

    }

    /**
     * Retrieve a registered service.
     *
     * @param {string} name
     */
    get(name) {

        const service = this.services.get(name);

        if (!service) {

            throw new Error(
                `Unknown service '${name}'.`
            );

        }

        return service;

    }

    /**
     * Returns true if the service exists.
     */
    has(name) {

        return this.services.has(name);

    }

    /**
     * Initialize every registered service
     * in registration order.
     */
    async initialize() {

        for (const service of this.services.values()) {

            if (
                typeof service.initialize ===
                "function"
            ) {

                await service.initialize();

            }

        }

    }

    /**
     * Shutdown every registered service
     * in reverse registration order.
     */
    async shutdown() {

        const services =
            Array.from(this.services.values());

        services.reverse();

        for (const service of services) {

            if (
                typeof service.shutdown ===
                "function"
            ) {

                await service.shutdown();

            }

        }

    }

    /**
     * Remove all registered services.
     */
    clear() {

        this.services.clear();

    }

    /**
     * Return the names of all services.
     */
    keys() {

        return Array.from(
            this.services.keys()
        );

    }

}