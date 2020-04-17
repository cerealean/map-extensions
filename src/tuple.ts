import { MapWrapper } from './map-wrapper';
export class Tuple<K, V> {
    constructor(public readonly key: K, public readonly value: V){}

    /**
     * @description Returns this tuple in the native format
     */
    public toNativeTuple(): [K, V] {
        return [this.key, this.value];
    }

    /**
     * @description Returns a new Map instance with this tuple included within it
     */
    public toMap(): Map<K, V> {
        return new Map([this.toNativeTuple()]);
    }

    /**
     * @description Returns a new MapWrapper instance with this tuple located within it
     */
    public toMapWrapper(): MapWrapper<K, V> {
        return new MapWrapper<K, V>(this.toMap());
    }
}