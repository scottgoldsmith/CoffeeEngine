/**
 * CoffeeEngine
 * Alpha 0.2.0
 *
 * Editor.js
 *
 * Root editor workspace.
 *
 * Responsibilities:
 *  - Build the editor layout
 *  - Mount the runtime canvas
 *  - Create placeholder panels
 *  - Switch between desktop and mobile layouts
 *
 * Does NOT implement:
 *  - Sprite editing
 *  - Code editing
 *  - Tile editing
 *  - Audio editing
 */

export default class Editor {

    constructor() {

        this.app = null;

        this.root = document.createElement("div");

        this.root.id = "coffee-editor";

        this.toolbar = null;
        this.workspace = null;

        this.leftPanel = null;
        this.centerPanel = null;
        this.rightPanel = null;

        this.mobile = false;

    }

    async initialize() {

        this.build();

        this.installResizeHandler();

    }

    build() {

        this.root.innerHTML = "";

        this.mobile =
            window.innerWidth < 900;

        this.toolbar =
            this.createToolbar();

        this.workspace =
            this.createWorkspace();

        this.root.appendChild(
            this.toolbar
        );

        this.root.appendChild(
            this.workspace
        );

        this.app.config.parent.appendChild(
            this.root
        );

        this.mountRuntime();

    }

    createToolbar() {

        const bar =
            document.createElement("header");

        bar.className =
            "coffee-toolbar";

        bar.innerHTML = `

            <button>New</button>
            <button>Open</button>
            <button>Save</button>
            <button>Export</button>

            <div class="coffee-spacer"></div>

            <button>▶ Run</button>

        `;

        return bar;

    }

    createWorkspace() {

        const workspace =
            document.createElement("main");

        workspace.className =
            this.mobile

            ? "coffee-workspace-mobile"

            : "coffee-workspace";

        this.leftPanel =
            this.createPanel(
                "Sprites"
            );

        this.centerPanel =
            this.createPanel(
                "Game"
            );

        this.rightPanel =
            this.createPanel(
                "Inspector"
            );

        workspace.appendChild(
            this.leftPanel
        );

        workspace.appendChild(
            this.centerPanel
        );

        workspace.appendChild(
            this.rightPanel
        );

        return workspace;

    }

    createPanel(title) {

        const panel =
            document.createElement("section");

        panel.className =
            "coffee-panel";

        const header =
            document.createElement("h2");

        header.textContent =
            title;

        const body =
            document.createElement("div");

        body.className =
            "coffee-panel-body";

        panel.appendChild(header);

        panel.appendChild(body);

        return panel;

    }

    mountRuntime() {

        const graphics =
            this.app.get("graphics");

        const body =
            this.centerPanel.querySelector(
                ".coffee-panel-body"
            );

        body.appendChild(
            graphics.canvas
        );

    }

    installResizeHandler() {

        window.addEventListener(

            "resize",

            () => {

                const mobile =
                    window.innerWidth < 900;

                if (
                    mobile !== this.mobile
                ) {

                    this.build();

                }

            }

        );

    }

}