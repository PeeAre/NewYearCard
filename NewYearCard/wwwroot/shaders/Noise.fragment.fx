// Фрагментный шейдер (Noise.fragment.fx)
precision highp float;

uniform sampler2D textureSampler;
uniform float time;
varying vec2 vUV;

// Функция для генерации псевдослучайного числа
float random(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main(void) {
    vec2 uv = vUV;

    // Генерируем случайное значение на основе координаты текстуры и времени
    float random_value = random(uv + floor(time));

    // Порог для определения, где применять помехи
    float threshold = 0.05;

    if (random_value < threshold) {
        // Если случайное значение меньше порога, применяем помехи
        // Увеличиваем значение шума для более резких изменений
        float distortionX = sin(uv.y * 100.0 + time) * 10.0;

        // Используем цвета соседних пикселей для создания фрагментированных помех
        vec4 color = vec4(
            texture2D(textureSampler, uv).r,
            texture2D(textureSampler, uv).g,
            texture2D(textureSampler, uv).b,
            1.0
        );
        gl_FragColor = color;
    }
    else {
        // Если случайное значение не меньше порога, применяем ваш код
        float random_value = random(vec2(floor(uv.y * 4.0), time * 0.01));

        if (random_value < 0.04) {
            gl_FragColor = texture2D(textureSampler, vec2(uv.x + random_value * 0.4, uv.y - random_value * 0.2));
        } else {
            gl_FragColor = texture2D(textureSampler, uv);
        }
    }
}
