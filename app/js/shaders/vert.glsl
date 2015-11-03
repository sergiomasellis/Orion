attribute vec3 position;
attribute vec2 uv;
attribute vec3 normals;
attribute vec3 aVertexColor;

uniform mat4 mVMatrix;
uniform mat4 pMatrix;

// varying uv
varying vec2 vUv;
varying lowp vec3 vColor;
varying lowp vec3 vNormals;

void main(void) {
	vUv = uv;
	vColor = aVertexColor;
	vNormals = normals;
    gl_Position = pMatrix * mVMatrix * vec4(position, 1.0);
}
