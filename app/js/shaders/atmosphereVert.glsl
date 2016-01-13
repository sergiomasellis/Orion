attribute vec3 position;

// for atmosphere
varying vec3 vPosition;


void main(void) {
    vPosition = position;
    gl_Position = vec4(position, 1.0);
}
