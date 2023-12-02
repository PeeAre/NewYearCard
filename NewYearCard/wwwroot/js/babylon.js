// wwwroot/js/babylon-setup.js

function loadBabylon(canvasId) {
    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    BABYLON.SceneLoader.ImportMeshAsync("", "",
        "https://dl.dropboxusercontent.com/scl/fi/0jbcidmpg6gjp1l6kxuuc/TEST5.glb?rlkey=yw5fpbmyzrifvzctybstws94m&dl=0",
        scene)
        .then((result) => {
            var root = result.meshes;
            root.forEach((element) => element.rotate(BABYLON.Vector3.Up(), Math.PI));
            result.animationGroups.forEach((element) => {
                if (element.name === 'toolPickaxeAction') {
                    element.start(true);
                }
            });
            console.log({ result });
        });

    var camera = new BABYLON.FreeCamera("camera1",
        new BABYLON.Vector3(0, 5, -10),
        scene);
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // Attaches the camera to the canvas
    camera.attachControl(canvas, true);
    //// Creates a light, aiming 0,1,0
    //var light = new BABYLON.HemisphericLight("light",
    //    new BABYLON.Vector3(0, 1, 0),
    //    scene);
    //// Dim the light a small amount 0 - 1
    //light.intensity = 0.5;
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