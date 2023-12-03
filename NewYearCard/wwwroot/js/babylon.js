function loadBabylon(canvasId) {
    // Создаем сцену
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    // Creates and positions a free camera
    var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, BABYLON.Vector3.Zero(), this.scene);
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






    // Создание шейдерного материала
    var postProcessMaterial = new BABYLON.ShaderMaterial("noiseShader", scene, {
        vertex: "shaders/Noise.vertex",
        fragment: "shaders/Noise.fragment"
    }, {
        attributes: ["position", "normal", "uv"],
        uniforms: ["worldViewProjection", "vResolution", "iTime"],
        needAlphaBlending: true
    });

    // Создание PostProcess
    var postProcess = new BABYLON.PostProcess("Noise", "./shaders/Noise", ["worldViewProjection", "vResolution", "iTime"], null, 1.0, camera);

    // Привязка шейдерного материала к PostProcess
    postProcess.material = postProcessMaterial;

    // Передача дополнительных uniform-переменных
    postProcess.onApply = function (effect) {
        effect.setMatrix("worldViewProjection", scene.getTransformMatrix());
        effect.setVector2("vResolution", new BABYLON.Vector2(engine.getRenderWidth(), engine.getRenderHeight()));
        effect.setFloat("iTime", scene.getEngine().getDeltaTime() * 0.001);
    };

    // Вызов PostProcess
    scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("default", camera);







    engine.runRenderLoop(() => {
        scene.render();
    });
}
