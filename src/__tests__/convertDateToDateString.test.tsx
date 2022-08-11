import { convertDateToDateString } from '../util/date.util';

describe("Test Date Converter DateString", () => {
    it("should work as expected", () => {
        expect(convertDateToDateString('Jan 18, 95')).toBe('Wed Jan 18 1995');
    });

    it("should not work as expected", () => {
        try {
            convertDateToDateString('Jan');
        } catch (error) {
            expect(error.message).toBe('Invalid Date');
        }
    });
});