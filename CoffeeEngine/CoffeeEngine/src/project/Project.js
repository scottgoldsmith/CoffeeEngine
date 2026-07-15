/**
 * CoffeeEngine
 * Alpha 0.2.0
 *
 * Project.js
 *
 * Represents a single CoffeeEngine project.
 *
 * Responsibilities:
 *  - Store project metadata
 *  - Store project assets
 *  - Store project settings
 *  - Serialize / deserialize project data
 *
 * This class does NOT:
 *  - Run the game
 *  - Draw graphics
 *  - Edit assets
 *  - Access the DOM
 */

export default class Project {

    constructor() {

        this.version = "0.2.0";

        this.name = "New Project";

        this.author = "";

        this.description = "";

        this.created = new Date().toISOString();

        this.modified = this.created;

        this.entry = "main.js";

        this.settings = {

            width: 256,
            height: 256,
            fps: 60,
            palette: "coffee16"

        };

        this.assets = {

            sprites: [],
            maps: [],
            sounds: [],
            music: [],
            fonts: []

        };

    }

    /**
     * Update modification timestamp.
     */
    touch() {

        this.modified = new Date().toISOString();

    }

    /**
     * Serialize project.
     */
    toJSON() {

        return {

            version: this.version,

            name: this.name,

            author: this.author,

            description: this.description,

            created: this.created,

            modified: this.modified,

            entry: this.entry,

            settings: structuredClone(this.settings),

            assets: structuredClone(this.assets)

        };

    }

    /**
     * Serialize as formatted JSON.
     */
    serialize() {

        return JSON.stringify(

            this.toJSON(),

            null,

            2

        );

    }

    /**
     * Load project from object.
     */
    load(data = {}) {

        this.version =
            data.version ?? this.version;

        this.name =
            data.name ?? this.name;

        this.author =
            data.author ?? this.author;

        this.description =
            data.description ?? this.description;

        this.created =
            data.created ?? this.created;

        this.modified =
            data.modified ?? this.modified;

        this.entry =
            data.entry ?? this.entry;

        this.settings = {

            ...this.settings,

            ...(data.settings ?? {})

        };

        this.assets = {

            ...this.assets,

            ...(data.assets ?? {})

        };

    }

    /**
     * Create a Project from JSON.
     */
    static fromJSON(json) {

        const project = new Project();

        const data =
            typeof json === "string"

                ? JSON.parse(json)

                : json;

        project.load(data);

        return project;

    }

}