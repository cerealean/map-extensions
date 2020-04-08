import { expect } from "chai";
import { MapWrapper } from './map-wrapper';

describe('Map Wrapper', () => {
    describe('on construct', () => {
        [new Object(), 'something', 1500, [1, 2, 3]].forEach((testValue, index) => {
            it(`[${index}] should throw error if given non-map type: ${typeof testValue}`, () => {
                expect(() => new MapWrapper(testValue as unknown as any)).throws(Error);
            });
        });
    });

    describe('find', () => {
        it('should return empty map if the provided map is empty', () => {
            const map = new Map();
            const wrapper = new MapWrapper(map);

            const actual = wrapper.find(value => !!value);

            expect(actual).to.be.null;
        });

        it('should return one result that matches the given expression while searching in value', () => {
            const map = new Map([
                ['first', 'first value'],
                ['second', 'second value'],
                ['third', 'third value']
            ]);
            const wrapper = new MapWrapper(map);

            const actual = wrapper.find(value => value === 'second value');

            expect(actual!.value).to.equal('second value');
            expect(actual!.key).to.equal('second');
        });

        it('should return one result that matches the given expression while searching in key', () => {
            const map = new Map([
                ['first', 'first value'],
                ['second', 'second value'],
                ['third', 'third value']
            ]);
            const wrapper = new MapWrapper(map);

            const actual = wrapper.find((_value, key) => key === 'second');

            expect(actual!.value).to.equal('second value');
            expect(actual!.key).to.equal('second');
        });
    });

    describe('filter', () => {
        it('should return null if the provided map is empty', () => {
            const map = new Map();
            const wrapper = new MapWrapper(map);

            const actual = wrapper.filter(() => true);

            expect(actual.size).to.equal(0);
        });

        it('should return all tuples with values greater than 6', () => {
            const map = new Map<string, number>([
                ['uno', 1],
                ['dos', 2],
                ['tres', 3],
                ['quatro', 4],
                ['cinco', 5],
                ['seis', 6],
                ['siete', 7],
                ['ocho', 8],
                ['nueve', 9],
            ]);
            const wrapper = new MapWrapper(map);

            const actual = wrapper.filter(value => value > 6);

            expect(actual.get('uno')).to.be.undefined;
            expect(actual.get('dos')).to.be.undefined;
            expect(actual.get('tres')).to.be.undefined;
            expect(actual.get('quatro')).to.be.undefined;
            expect(actual.get('cinco')).to.be.undefined;
            expect(actual.get('seis')).to.be.undefined;
            expect(actual.get('siete')).to.equal(7);
            expect(actual.get('ocho')).to.equal(8);
            expect(actual.get('nueve')).to.equal(9);
        });
    });

    describe('map', () => {
        it('should return an empty collection of type if map is empty', () => {
            const map = new Map<string, number>();
            const wrapper = new MapWrapper(map);

            const actual = wrapper.map(value => value**value);

            expect(actual).to.be.empty;
        });

        it('should return collection of values, which are numbers, raised to the same power', () => {
            const map = new Map<string, number>([
                ['uno', 1],
                ['dos', 2],
                ['tres', 3],
                ['quatro', 4],
                ['cinco', 5],
                ['seis', 6],
                ['siete', 7],
                ['ocho', 8],
                ['nueve', 9],
            ]);
            const wrapper = new MapWrapper(map);

            const actual = wrapper.map(value => Math.pow(value, value));

            expect(actual[0]).to.equal(1 ** 1);
            expect(actual[1]).to.equal(2 ** 2);
            expect(actual[2]).to.equal(3 ** 3);
            expect(actual[3]).to.equal(4 ** 4);
            expect(actual[4]).to.equal(5 ** 5);
            expect(actual[5]).to.equal(6 ** 6);
            expect(actual[6]).to.equal(7 ** 7);
            expect(actual[7]).to.equal(8 ** 8);
            expect(actual[8]).to.equal(9 ** 9);
        });
    });
});