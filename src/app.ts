import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

class App {
    // General Entire Application
    private _scene: Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _light: HemisphericLight;
    private _box: Mesh;
    
    constructor() {
        this._canvas = this._createCanvas();

        // initialize babylon scene and engine
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);

        this._light = new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            this._scene
        );



        // run the main render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
    }

    private _createCanvas(): HTMLCanvasElement {
        this._canvas = document.createElement("canvas");
        this._canvas.width = 1024;
        this._canvas.height = 768;
        this._canvas.id = "gameCanvas";
        document.body.appendChild(this._canvas);
        return this._canvas;

    }
}
new App();