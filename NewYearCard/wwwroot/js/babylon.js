function loadBabylon(canvasId) {
    // Создаем сцену
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    // Creates and positions a free camera
    this.camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, BABYLON.Vector3.Zero(), this.scene);
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // Attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // Creates a light, aiming 0,1,0
    var light = new BABYLON.HemisphericLight("light",
        new BABYLON.Vector3(0, 1, 0),
        scene);
    // Dim the light a small amount 0 - 1
    light.intensity = 0.7;
    // Built-in 'sphere' shape.
    var box = BABYLON.Mesh.CreateBox("box", 2, scene);
    // Move sphere upward 1/2 its height
    box.position.y = 1;



    engine.runRenderLoop(() => {
        scene.render();
    });
}
