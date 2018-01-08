class Utils {

    constructor() {
        this.fillArrayWith();
    }

    fillArrayWith(arr, size) {
        // [1,2,3], [1,2,3] 2
        let nArray = [];

        for (var i = 0; i < size; i++) {
            for (var j = 0; j < arr.length; j++) {
                nArray.push(arr[j]);
            }
        }

        return nArray;
    }

    deepExtend(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj)
                continue;

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        extend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }

        return out;
    }

    extend(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }

        return out;
    }

    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    lerp(A, B, t) {
        return (A * t) + ((1.0 - t) * B);
    }

    randomInt(range) {
        return Math.floor(Math.random() * range);
    }
}

export default new Utils;