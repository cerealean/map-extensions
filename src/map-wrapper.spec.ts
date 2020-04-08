import { expect } from "chai";
import { MapWrapper } from './map-wrapper';

describe('Map Wrapper', () => {
    describe('on construct', () => {
        [null, undefined].forEach(testValue => {
            it('should error if given falsy value for map', () => {
                expect(() => new MapWrapper(testValue)).throws(Error);
            });
        });

        [new Object(), 'something', 1500, [1, 2, 3]].forEach(testValue => {
            it('should throw error if given non-map type: ' + typeof testValue, () => {
                expect(() => new MapWrapper(testValue as unknown as any)).throws(Error);
            });
        });
    });

    describe('find', () => {
        it('should return null if the provided map is empty', () => {
            const map = new Map();
            const wrapper = new MapWrapper(map);

            const actual = wrapper.find(value => !!value);

            expect(actual).to.be.null;
        });
    });
});