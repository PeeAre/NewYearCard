// Вершинный шейдер (Noise.vertex.fx)
precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 world;
uniform mat4 view;
uniform mat4 projection;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

void main(void) {
    vPosition = position;
    vNormal = normal;
    vUV = uv;
    gl_Position = projection * view * world * vec4(position, 1.0);
}