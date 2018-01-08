precision mediump float;

uniform vec4 color;
uniform sampler2D uSampler;


varying vec3 vLightWeighting;


varying vec2 vUv;
varying lowp vec3 vColor;
varying vec3 vPosition;

#define PI 3.141592
#define iSteps 16
#define jSteps 8


void main(void) {
	vec2 tempUv = vec2(vUv.x, 1.0-vUv.y);
    // gl_FragColor = vec4(vNormals, 1.0);
	gl_FragColor = vec4(vColor * vLightWeighting, 1.0) * color * texture2D(uSampler, tempUv);
}
