import { convertDateToFirstPartIso } from '../util/date.util';

describe("Test Date Converter ISO String", () => {
    it("should work as expected", () => {
        expect(convertDateToFirstPartIso('Jan 18, 95')).toBe('1995-01-17');
    });

    it("should not work as expected", () => {
        try {
            convertDateToFirstPartIso('Jan');
        } catch (error) {
            expect(error.message).toBe('Invalid Date');
        }
    });
});