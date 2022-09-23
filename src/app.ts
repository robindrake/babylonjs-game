import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder } from "@babylonjs/core";

class App {
    constructor() {
        var canvas = document.createElement("canvas");
        canvas.style.width = 800;
        canvas.style.height = 600;
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);
    }
}