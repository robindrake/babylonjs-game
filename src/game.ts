import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, 
    Color4, FreeCamera } from "@babylonjs/core";
import {AdvancedDynamicTexture, Button, Control} from "@babylonjs/gui";

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

    private async _goToStart() {
        this._engine.displayLoadingUI();
        this._scene.detachControl();
        let scene = new Scene(this._engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        let camera = new FreeCamera("camera1", new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());

        //... Gui related Stuff
        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        guiMenu.idealHeight = 720;

        //create a simple button
        const startBtn = Button.CreateSimpleButton("Start", "Play");
        startBtn.width = 0.2;
        startBtn.height = "40px";
        startBtn.color = "white";
        startBtn.top = "-14px";
        startBtn.thickness = 0;
        startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        guiMenu.addControl(startBtn);

        //this handles interactions with the start button attached to the scene
        startBtn.onPointerDownObservable.add(() => {
            this._goToCutScene();
            scene.detachControl();  //observables disables
        });

        //--Scene Finished Loading--
        await scene.whenReadyAsync();
        this._engine.hideLoadingUI();
        //Lastly, set the current state to the start state, and set the scene to the start scene
        this._scene.dispose();
        this._scene = scene;
        this._state = State.START;
    }

    private _goToCutScene() {
        
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