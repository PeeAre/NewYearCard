// wwwroot/js/babylon-setup.js

function loadBabylon(canvasId) {
    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    BABYLON.SceneLoader.ImportMesh("", "", "https://dl.dropboxusercontent.com/scl/fi/dx5m9e3ngq61ueylzf38u/TEST1.glb?rlkey=6uow6y7v8iktapb1bru4vhtey&dl=0", scene);

    var camera = new BABYLON.FreeCamera("camera1",
        new BABYLON.Vector3(0, 5, -10),
        scene);
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // Attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // Creates a light, aiming 0,1,0
    var light = new BABYLON.HemisphericLight("light",
        new BABYLON.Vector3(0, 1, 0),
        scene);
    // Dim the light a small amount 0 - 1
    light.intensity = 1.8;
    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener("resize", function () {
        engine.resize();
    });

}

function createScene(canvas, engine) {

    // Creates a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);
    // Creates and positions a free camera
    
    // Built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere",
        { diameter: 2, segments: 32 },
        scene);
    // Move sphere upward 1/2 its height
    sphere.position.y = 1;
    // Built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground",
        { width: 6, height: 6 },
        scene);
    return scene;
};