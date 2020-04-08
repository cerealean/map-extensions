import { Tuple } from './tuple';

export class MapWrapper<T, K> {

    constructor(private readonly map: Map<T, K>) {
        if(!map) {
            throw new Error('Invalid value passed for map parameter: ' + typeof map);
        }
        if(!(map instanceof Map)) {
            throw new Error('Value provided must be instance of Map');
        }
    }

    public find(callbackFn: (value: K, key: T) => boolean): Tuple<T, K> {
        let tuple: Tuple<T, K> = null;
        this.map.forEach((value, key) => {
            if (callbackFn(value, key) === true) {
                tuple = new Tuple(key, value);
                return tuple;
            }
        });

        return tuple;
    }

}