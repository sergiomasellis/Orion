import Utils from './Utils';

let math = {
    "distance2D": function(point1, point2){
        let dx = point1.x - point2.x,
            dy = point1.y - point2.y;

        return Math.sqrt(dx * dx + dy * dy);
    }
};

// console.log("math created");

export default Utils.extend(Math, math);