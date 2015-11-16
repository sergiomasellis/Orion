precision mediump float;

uniform vec4 color;
uniform sampler2D uSampler;

varying vec2 vUv;
varying lowp vec3 vColor;
varying lowp vec3 vNormals;

void main(void) {
	vec2 tempUv = vec2(vUv.x, 1.0-vUv.y);
    gl_FragColor = vec4(vColor, 1.0) * color * texture2D(uSampler, tempUv);
    // gl_FragColor = vec4(vNormals, 1.0);
}
