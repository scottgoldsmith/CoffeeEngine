/**
 * CoffeeEngine
 * Alpha 0.2.0
 *
 * Graphics.js
 *
 * Graphics subsystem.
 *
 * Owns the rendering canvas but NEVER inserts it into
 * the DOM. The Editor decides where the canvas lives.
 */

export default class Graphics {

    constructor(config = {}) {

        this.app = null;

        this.width = config.width ?? 256;
        this.height = config.height ?? 256;

        this.clearColor = "#000000";

        this.camera = {
            x: 0,
            y: 0
        };

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.ctx = this.canvas.getContext("2d", {
            alpha: false,
            desynchronized: true
        });

        this.ctx.imageSmoothingEnabled = false;

    }

    async initialize() {

        // Graphics prepares the canvas but does
        // not insert it into the DOM.

        this.resize();

        window.addEventListener(
            "resize",
            () => this.resize()
        );

    }

    resize() {

        const parent = this.app.config.parent;

        const availableWidth =
            parent.clientWidth || window.innerWidth;

        const availableHeight =
            parent.clientHeight || window.innerHeight;

        const scale = Math.max(
            1,
            Math.floor(
                Math.min(
                    availableWidth / this.width,
                    availableHeight / this.height
                )
            )
        );

        this.canvas.style.width =
            `${this.width * scale}px`;

        this.canvas.style.height =
            `${this.height * scale}px`;

        this.canvas.style.display = "block";
        this.canvas.style.imageRendering = "pixelated";

    }

    beginFrame() {

        this.ctx.fillStyle = this.clearColor;

        this.ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );

    }

    endFrame() {

        // Reserved for overlays and debug rendering.

    }

    clear(color = "#000000") {

        this.clearColor = color;

    }

    cameraTo(x, y) {

        this.camera.x = x;
        this.camera.y = y;

    }

    resetCamera() {

        this.camera.x = 0;
        this.camera.y = 0;

    }

    pixel(x, y, color) {

        this.ctx.fillStyle = color;

        this.ctx.fillRect(
            x - this.camera.x,
            y - this.camera.y,
            1,
            1
        );

    }

    line(x1, y1, x2, y2, color) {

        this.ctx.strokeStyle = color;

        this.ctx.beginPath();

        this.ctx.moveTo(
            x1 - this.camera.x,
            y1 - this.camera.y
        );

        this.ctx.lineTo(
            x2 - this.camera.x,
            y2 - this.camera.y
        );

        this.ctx.stroke();

    }

    rect(x, y, w, h, color) {

        this.ctx.strokeStyle = color;

        this.ctx.strokeRect(
            x - this.camera.x,
            y - this.camera.y,
            w,
            h
        );

    }

    fillRect(x, y, w, h, color) {

        this.ctx.fillStyle = color;

        this.ctx.fillRect(
            x - this.camera.x,
            y - this.camera.y,
            w,
            h
        );

    }

    circle(x, y, radius, color) {

        this.ctx.strokeStyle = color;

        this.ctx.beginPath();

        this.ctx.arc(
            x - this.camera.x,
            y - this.camera.y,
            radius,
            0,
            Math.PI * 2
        );

        this.ctx.stroke();

    }

    fillCircle(x, y, radius, color) {

        this.ctx.fillStyle = color;

        this.ctx.beginPath();

        this.ctx.arc(
            x - this.camera.x,
            y - this.camera.y,
            radius,
            0,
            Math.PI * 2
        );

        this.ctx.fill();

    }

    text(text, x, y, color = "#FFFFFF") {

        this.ctx.fillStyle = color;
        this.ctx.font = "8px monospace";

        this.ctx.fillText(
            text,
            x - this.camera.x,
            y - this.camera.y
        );

    }

}