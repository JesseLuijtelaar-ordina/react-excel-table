/**
 * Converts a date into Date Class and checks if valid
 * if the date is valid it will make it into an ISO and split T 
 * and take the first index.
 * @param date date to convert
 * @returns { string | Error } Returns an correct date or an error.
 */
export function convertDateToFirstPartIso(date: string): string {
    const DATE = new Date(date);

    if (DATE.toString() === 'Invalid Date') {
        throw Error(DATE.toString());
    }
    
    return DATE.toISOString().split('T')[0];
}

/**
 * Converts a date into Date Class and checks if valid
 * if the date is valid it will make it into an DateString 
 * @param { string } date date to convert
 * @returns { string | Error } Returns an correct date or an error.
 */
export function convertDateToDateString(date: string): string {
    const DATE = new Date(date);

    if (DATE.toString() === 'Invalid Date') {
        throw Error(DATE.toString());
    }

    return DATE.toDateString();
}