function loadBabylon(canvasId) {
    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    var box = BABYLON.Mesh.CreateBox("box", 2, scene);
    box.position.y = 1;

    var postProcess = new BABYLON.PostProcess("Glitch", "./shaders/Noise", ["time"], null, 1.0, camera);
    postProcess.onApply = function (effect) {
        effect.setFloat("time", performance.now() * 0.001);
    };
    var pipeline = new BABYLON.DefaultRenderingPipeline("glitchPipeline", true, scene, [camera]);
    pipeline.imageProcessingEnabled = false;
    postProcess.onError = function (effect, errors) {
        console.error("Shader compilation errors: ", errors);
    };
    scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("glitchPipeline", camera);
    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
}