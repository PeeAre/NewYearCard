// Вершинный шейдер
precision highp float;

varying vec2 vUV;

void main(void) {
    gl_Position = vec4(position, 1.0);
    vUV = uv;
}