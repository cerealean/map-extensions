import { Tuple } from './tuple';

export class MapWrapper<K, V> {
    private readonly _map: Map<K, V>;

    /**
     * 
     * @param map A map instance to wrap and provide additional functionality to. If not provided, one will be created for you.
     */
    constructor(map?: Map<K, V>) {
        this._map = !map ? new Map<K, V>() : map;
        if (!this.isMapType(this._map)) {
            throw new Error('Value provided must be instance of Map');
        }
    }

    /**
     * @description Returns the value specified by the given key, or undefined if the key is not found. This is the same as native Map functionality.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 
     * @param key 
     */
    public get(key: K): V | undefined {
        return this._map.get(key);
    }

    /**
     * @description Sets the specified key in the Map to the given value. This is the same as native Map functionality.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 
     * @param key
     * @param value 
     */
    public set(key: K, value: V): void {
        this._map.set(key, value);
    }

    /**
     * @description Returns whether the specified key can be found in the Map. This is the same as native Map functionality.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 
     * @param key 
     */
    public has(key: K): boolean {
        return this._map.has(key);
    }

    /**
     * @description Returns how many items are in the Map. This is the same as native Map functionality.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 
     */
    public get size(): number {
        return this._map.size;
    }

    /**
     * @description Returns an IterableIterator of native [key, value] pairs from within the Map. This is the same as native Map functionality.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 
     */
    public entries(): IterableIterator<[K, V]> {
        return this._map.entries();
    }

    /**
     * @description Returns a collection of Tuple objects from entries within the Map.
     */
    public tuples(): Tuple<K, V>[] {
        const tupleEntries: Tuple<K, V>[] = [];

        this._map.forEach((value, key) => {
            tupleEntries.push(new Tuple(key, value));
        });

        return tupleEntries;
    }

    /**
     * @description Returns a collection of the keys from within the Map. This is the same as native Map functionality.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 
     */
    public keys(): IterableIterator<K> {
        return this._map.keys();
    }

    /**
     * @description Returns a collection of values from within the Map. This is the same as native Map functionality.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 
     */
    public values(): IterableIterator<V> {
        return this._map.values();
    }

    /**
     * @description Deletes a tuple from the Map specified by the given key. This is the same as native Map functionality.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 
     * @param key 
     */
    public delete(key: K): void {
        this._map.delete(key);
    }

    /**
     * @description Clears all tuples in the Map. This is the same as native Map functionality.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map 
     */
    public clear(): void {
        this._map.clear();
    }

    /**
     * @description Returns the Map instance currently wrapped by this object
     */
    public toMap(): Map<K, V> {
        return this._map;
    }

    /**
     * @description Loops over tuples within the map, invoking the given function on each tuple. Works similarly to the native forEach function on arrays.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach 
     * @param callbackFn 
     */
    public forEach(callbackFn: (value: V, key: K, mapWrapper: MapWrapper<K, V>) => void): void {
        this._map.forEach((value, key) => {
            callbackFn(value, key, this);
        });
    }

    /**
     * @description Will return the first Tuple that evaluates as true by the given function. Works similarly to the native find function on arrays.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
     * @param callbackFn 
     */
    public find(callbackFn: (value: V, key: K, mapWrapper: MapWrapper<K, V>) => boolean): Tuple<K, V> | null {
        let tuple: Tuple<K, V> | null = null;
        this._map.forEach((value, key) => {
            if (callbackFn(value, key, this) === true) {
                tuple = new Tuple(key, value);
                return tuple;
            }
        });

        return tuple;
    }

    /**
     * @description Returns a new MapWrapper instance with data filtered by the given function. Works similarly to the native filter function on arrays.
     * @see https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/array/filter 
     * @param callbackFn 
     */
    public filter(callbackFn: (value: V, key: K, mapWrapper: MapWrapper<K, V>) => boolean): MapWrapper<K, V> {
        const newMap = new MapWrapper<K, V>();
        this._map.forEach((value, key) => {
            if (callbackFn(value, key, this) === true) {
                newMap.set(key, value);
            }
        });

        return newMap;
    }

    /**
     * @description Creates a new array of the type returned by the given function. Works similarly to the native map function on arrays.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map 
     * @param callbackFn 
     */
    public map<M>(callbackFn: (value: V, key: K, mapWrapper: MapWrapper<K, V>) => M): M[] {
        const collection: M[] = [];

        this._map.forEach((value, key) => {
            collection.push(callbackFn(value, key, this));
        });

        return collection;
    }

    /**
     * @description Returns true if the given function evaluates to true. Returns false otherwise. Works similarly to the native 'some' function on arrays.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
     * @param callbackFn 
     */
    public some(callbackFn: (value: V, key: K, mapWrapper: MapWrapper<K, V>) => boolean): boolean {
        let expMatch = false;

        this._map.forEach((value, key) => {
            if(callbackFn(value, key, this) === true) {
                expMatch = true;
                return;
            }
        });

        return expMatch;
    }

    private isMapType(obj: any): obj is Map<K, V> {
        return obj && obj instanceof Map;
    }
}