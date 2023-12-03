void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 st = fragCoord.xy / iResolution.xy;
    st.x *= iResolution.x / 32.0;

    vec2 grid = vec2(128.0, 16.0);
    st *= grid;

    vec2 ipos = floor(st);
    vec2 fpos = fract(st);

    vec2 vel = vec2(iTime * max(grid.x, grid.y));
    vel *= vec2(-1.0, 0.4) * fract(sin(ipos.y + 4.0));

    vec2 offset = vec2(0.8, 0.0);

    float frequency = 0.32; // Измените это значение по вашему усмотрению

    vec3 color = vec3(0.0);
    color.r = step(0.96, fract(sin(dot(st + offset + vel, vec2(12.9898, 78.233))) * 43758.5453 + cos(iTime * frequency) * sin(iTime * frequency)));
    color.g = step(0.96, fract(sin(dot(st + vel, vec2(12.9898, 78.233))) * 43758.5453 + cos(iTime * frequency) * sin(iTime * frequency)));
    color.b = step(0.96, fract(sin(dot(st - offset + vel, vec2(12.9898, 78.233))) * 43758.5453 + cos(iTime * frequency) * sin(iTime * frequency)));

    color *= step(0.8, fpos.y);

    vec3 combinedPattern = vec3(
        color.r,
        color.g,
        color.b
    );

    fragColor = vec4(combinedPattern, 0.8);
}
