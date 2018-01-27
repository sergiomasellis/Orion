#version 300 es

// in
in vec3 position;
in vec2 uv;
in vec3 normals;
in vec3 aVertexColor;

uniform mat4 mVMatrix;
uniform mat4 pMatrix;

// for atmosphere
out vec3 vPosition;

// out uv
out vec2 vUv;
out lowp vec3 vColor;
out lowp vec3 vNormals;

void main(void) {
	vUv = uv;
	vColor = aVertexColor;
	vNormals = normals;
	vPosition = position;
  gl_Position = pMatrix * mVMatrix * vec4(position, 1.0);
}
