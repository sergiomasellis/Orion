precision mediump float;

uniform vec4 color;
uniform sampler2D uSampler;

varying vec2 vUv;

void main(void) {
	vec2 tempUv = vec2(vUv.x, 1.0-vUv.y);
    gl_FragColor = color * texture2D(uSampler, tempUv);
}
