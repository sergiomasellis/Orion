attribute vec2 position;

uniform mat4 mVMatrix;
uniform mat4 pMatrix;

void main(void) {
    gl_Position = pMatrix * mVMatrix * vec4(position, 0.0, 1.0);
}
