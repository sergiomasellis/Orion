#version 300 es
precision mediump float;

uniform vec4 color;
uniform sampler2D uSampler;

in vec2 vUv;
in lowp vec3 vColor;
in vec3 vPosition;

out vec4 myOutputColor;

void main(void) {
	myOutputColor = vec4(vColor, 1.0) * color * texture(uSampler, vec2(vUv.x, 1.0-vUv.y));
}
