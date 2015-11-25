import WebGLObject from 'Orion/WebGLObject';
import Models from 'Orion/Model';

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
        
        super.init({model: 'primativePlane', color: [1,1,0,1]});
    }
}

export default Plane;