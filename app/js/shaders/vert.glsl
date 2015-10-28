attribute vec3 position;

uniform mat4 mVMatrix;
uniform mat4 pMatrix;

void main(void) {
    gl_Position = pMatrix * mVMatrix * vec4(position, 1.0);
}
