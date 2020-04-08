import { Tuple } from './tuple';

export class MapWrapper<T, K> {
    private readonly _map: Map<T, K>

    constructor(map?: Map<T, K>) {
        this._map = !map ? new Map<T, K>() : map;
        if (!this.isMapType(this._map)) {
            throw new Error('Value provided must be instance of Map');
        }
    }

    public get(key: T): K {
        return this._map.get(key);
    }

    public set(key: T, value: K): void {
        this._map.set(key, value);
    }

    public has(key: T): boolean {
        return this._map.has(key);
    }

    public get size(): number {
        return this._map.size;
    }

    public entries(): IterableIterator<[T, K]> {
        return this._map.entries();
    }

    public keys(): IterableIterator<T> {
        return this._map.keys();
    }

    public values(): IterableIterator<K> {
        return this._map.values();
    }

    public delete(key: T): void {
        this._map.delete(key);
    }

    public clear(): void {
        this._map.clear();
    }

    public toMap(): Map<T, K> {
        return this._map;
    }

    public forEach(callbackFn: (value: K, key: T, mapWrapper: MapWrapper<T, K>) => void): void {
        this._map.forEach((value, key) => {
            callbackFn(value, key, this);
        });
    }

    public find(callbackFn: (value: K, key: T, mapWrapper: MapWrapper<T, K>) => boolean): Tuple<T, K> {
        let tuple: Tuple<T, K> = null;
        this._map.forEach((value, key) => {
            if (callbackFn(value, key, this) === true) {
                tuple = new Tuple(key, value);
                return tuple;
            }
        });

        return tuple;
    }

    public filter(callbackFn: (value: K, key: T, mapWrapper: MapWrapper<T, K>) => boolean): MapWrapper<T, K> {
        const newMap = new MapWrapper<T, K>();
        this._map.forEach((value, key) => {
            if (callbackFn(value, key, this) === true) {
                newMap.set(key, value);
            }
        });

        return newMap;
    }

    public map<M>(callbackFn: (value: K, key: T, mapWrapper: MapWrapper<T, K>) => M): M[] {
        const collection: M[] = [];

        this._map.forEach((value, key) => {
            collection.push(callbackFn(value, key, this));
        });

        return collection;
    }

    private isMapType(obj: any): obj is Map<T, K> {
        return obj && obj instanceof Map;
    }
}