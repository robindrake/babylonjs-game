import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

enum State { START = 0, GAME = 1, LOSE = 2, CUTSCENE = 3 }

class App {

    private _scene: Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _state: number = 0;

    constructor() {
        this._canvas = this._createCanvas();

        //initialize babylon scene and engine
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);
        
        var camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this._scene);
        camera.attachControl(this._canvas, true);
        var light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), this._scene);
        var sphere = MeshBuilder.CreateSphere("sphere", {diameter: 0.25}, this._scene);

        window.addEventListener("keydown", (ev) => {
            if(ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if(this._scene.debugLayer.isVisible())
                    this._scene.debugLayer.hide();
                else
                    this._scene.debugLayer.show();
            }
        });

        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
    }

    private _createCanvas(): HTMLCanvasElement {
        var canvas = document.createElement("canvas");
        canvas.style.width = "800px";
        canvas.style.height = "800px";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        return canvas;
    }
}

new App();
//It works!