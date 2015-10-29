precision mediump float;

uniform vec4 color;
uniform sampler2D uSampler;

varying vec2 vUv;

void main(void) {
    gl_FragColor = texture2D(uSampler, vUv);
}
