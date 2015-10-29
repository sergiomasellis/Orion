attribute vec3 position;
attribute vec2 uv;

uniform mat4 mVMatrix;
uniform mat4 pMatrix;

// varying uv
varying vec2 vUv;

void main(void) {
	vUv = uv;
    gl_Position = pMatrix * mVMatrix * vec4(position, 1.0);
}
