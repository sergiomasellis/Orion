import WebGLObject from './WebGLObject';
import Models from './Model';

class Plane extends WebGLObject {
    init(){

        Models.modelCache['primativePlane'] = {};
        Models.modelCache['primativePlane'].verts = [
            -1.0, 0.0, 1.0,
            1.0, 0.0, 1.0,
            1.0, 0.0, -1.0,
            -1.0, 0.0, 1.0,
            1.0, 0.0, -1.0,
            -1.0, 0.0, -1.0
        ];

        super.init({model: 'primativePlane', color: [1.0, 1.0, 1.0, 1.0]});
    }
}

export default Plane;