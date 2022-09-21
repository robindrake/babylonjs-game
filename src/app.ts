import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

class App {
    constructor() {
        //set up canvas
        var canvas = document.createElement("canvas");
        canvas.style.width = "1024px";
        canvas.style.height = "768px";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        //Initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);
        
        //Set up Camera and Light
        var camera: ArcRotateCamera = new ArcRotateCamera(
            "Camera",
            Math.PI / 2,
            Math.PI / 2,
            2,
            Vector3.Zero(),
            scene
        );
        camera.attachControl(canvas, true);

        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

        //Add a sphere
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 0.5 }, scene);

        //Hide / show the inspector
        window.addEventListener("keydown", (ev) => {
            if(ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 72) {
                if(scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        //The main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}

new App();