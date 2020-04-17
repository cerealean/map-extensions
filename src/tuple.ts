import { MapWrapper } from './map-wrapper';
export class Tuple<T, K> {
    constructor(public readonly key: T, public readonly value: K){}

    /**
     * @description Returns this tuple in the native format
     */
    public toNativeTuple(): [T, K] {
        return [this.key, this.value];
    }

    /**
     * @description Returns a new Map instance with this tuple included within it
     */
    public toMap(): Map<T, K> {
        return new Map([this.toNativeTuple()]);
    }

    /**
     * @description Returns a new MapWrapper instance with this tuple located within it
     */
    public toMapWrapper(): MapWrapper<T, K> {
        return new MapWrapper<T, K>(this.toMap());
    }
}