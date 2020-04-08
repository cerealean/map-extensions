import { MapWrapper } from './map-wrapper';
export class Tuple<T, K> {
    constructor(public readonly key: T, public readonly value: K){}

    public toNativeTuple(): [T, K] {
        return [this.key, this.value];
    }

    public toMap(): Map<T, K> {
        return new Map([this.toNativeTuple()]);
    }

    public toMapWrapper(): MapWrapper<T, K> {
        return new MapWrapper<T, K>(this.toMap());
    }
}