precision highp float;

varying vec2 vUV;
uniform sampler2D maskSampler;
uniform vec2 vResolution;
uniform float iTime;

void main()
{
    vec2 st = gl_FragCoord.xy / vResolution.xy;
    st.x *= vResolution.x / 8.0;

    vec2 grid = vec2(100.0, 16.0);
    st *= grid;

    vec2 ipos = floor(st);
    vec2 fpos = fract(st);

    vec2 vel = vec2(iTime * max(grid.x, grid.y));
    vel *= vec2(1.0, -1.0) * fract(sin(ipos.y + 36.0));

    vec2 offset = vec2(0.8, 0.0);

    float frequency = 0.32;

    vec3 color = vec3(0.0);
    color.r = step(0.96, fract(sin(dot(st + offset + vel, vec2(12.9898, 78.233))) * 43758.5453 + cos(iTime * frequency) * sin(iTime * frequency)));
    color.g = step(0.96, fract(sin(dot(st + vel, vec2(12.9898, 78.233))) * 43758.5453 + cos(iTime * frequency) * sin(iTime * frequency)));
    color.b = step(0.96, fract(sin(dot(st - offset + vel, vec2(12.9898, 78.233))) * 43758.5453 + cos(iTime * frequency) * sin(iTime * frequency)));

    color *= step(0.5, fpos.y);

    vec4 combinedPattern = vec4(
        color.r,
        color.g,
        color.b,
        0.6
    );

    vec4 maskColor = texture2D(maskSampler, vUV);
    if (maskColor.a < 0.5) {
        // Инвертируем цвет, если пиксель вне маски
        gl_FragColor.rgb = vec3(1.0 - vec3(combinedPattern.r, combinedPattern.g, combinedPattern.b));
        gl_FragColor.a = 1.0 - combinedPattern.a;  // Инвертируем альфа-канал
    } else {
        // Иначе используем ваш обычный цвет
        gl_FragColor.rgb = vec3(combinedPattern.r, combinedPattern.g, combinedPattern.b);
        gl_FragColor.a = combinedPattern.a;
    }

// Используем clamp, чтобы убедиться, что значение альфа-канала остается в пределах [0, 1]
    gl_FragColor.a = clamp(gl_FragColor.a, 0.0, 1.0);

}
