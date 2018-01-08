attribute vec3 position;
attribute vec2 uv;
attribute vec3 normals;
attribute vec3 aVertexColor;

uniform mat4 mVMatrix;
uniform mat4 pMatrix;

// for atmosphere
varying vec3 vPosition;


// lights
uniform vec3 uAmbientColor;
uniform vec3 uLightingDirection;
uniform vec3 uDirectionalColor;
uniform bool uUseLighting;
uniform mat3 uNMatrix;

// varying uv
varying vec2 vUv;
varying lowp vec3 vColor;
varying lowp vec3 vNormals;

// lights
varying vec3 vLightWeighting;

void main(void) {
	vUv = uv;
	vColor = aVertexColor;
	vNormals = normals;
	vPosition = position;
    gl_Position = pMatrix * mVMatrix * vec4(position, 1.0);

	 if (!uUseLighting) {
      vLightWeighting = vec3(1.0, 1.0, 1.0);
    } else {
      vec3 transformedNormal = uNMatrix * vNormals;
      float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
      vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
    }
}
