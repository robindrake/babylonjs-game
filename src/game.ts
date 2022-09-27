/*
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, 
    Color4, FreeCamera, GroundMesh, StandardMaterial } from "@babylonjs/core";
import {AdvancedDynamicTexture, Button, Control} from "@babylonjs/gui";
*/
enum State { START = 0, GAME = 1, LOSE = 2, CUTSCENE = 3 }

class App {

    private _scene: BABYLON.Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _state: number = 0;
    private _ground: BABYLON.GroundMesh;
    private _camera: BABYLON.FreeCamera;

    constructor() {
        this._canvas = this._createCanvas();
        this._engine = new BABYLON.Engine(this._canvas);
        this._scene = this._createScene();

        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
    }
    /*
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

    private async _goToLose(): Promise<void> {
        this._engine.displayLoadingUI();

        //Scene Setup
        this._scene.detachControl();
        let scene = new Scene(this._engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        let camera = new FreeCamera("camera1", new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());

        //GUI
        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        const mainBtn = Button.CreateSimpleButton("mainmenu", "Main Menu");
        mainBtn.width = 0.2
        mainBtn.height = "40px";
        mainBtn.color = "white";
        guiMenu.addControl(mainBtn);
        mainBtn.onPointerClickObservable.add(() => {
            this._goToStart();
        });

        //Scene Finished Loading
        await scene.whenReadyAsync();
        this._engine.hideLoadingUI();   //When the scene is ready, hide loading
        //lastly, set the current state to the loase state and set the scene to the lose scene
        this._scene.dispose();
        this._scene = scene;
        this._state = State.LOSE;
    }
    */
    private _createCanvas(): HTMLCanvasElement {
        var canvas = document.createElement("canvas");
        canvas.style.width = "800px";
        canvas.style.height = "800px";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
        return canvas;
    }

    private _createScene(): Scene {
        let scene = new BABYLON.Scene(this._engine);
        let skybox = BABYLON.Mesh.CreateBox("skybox", 100.0, scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skybox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        this._camera = BABYLON.FreeCamera("camera1",  new BABYLON.Vector3(0, 5, -10), scene);
        // Targets the camera to scene origin
        this._camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        this._camera.attachControl(this._canvas, true);

        return scene;
    }
}

new App();
