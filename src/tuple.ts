export class Tuple<T, K> {
    constructor(public readonly key: T, public readonly value: K){}

    public toNativeTuple(): [T, K] {
        return [this.key, this.value];
    }
}