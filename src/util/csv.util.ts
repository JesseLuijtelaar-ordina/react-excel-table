/**
 * Parse a CSV file from file to string
 * @param { File } csvFile 
 * @returns { Promise<string, any> }
 */
export function parseCsv(csvFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const READER = new FileReader();
        READER.onload = (event) => resolve(event?.target?.result as string);
        READER.onerror = reject;
        READER.readAsText(csvFile);
    });
}