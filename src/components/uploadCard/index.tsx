import React from 'react';
import { TableRowInterface } from '../../interfaces/row.interface';
import { parseCsv } from '../../util/csv.util';
import { convertDateToFirstPartIso } from '../../util/date.util';
import { Props, State } from './types';
import './uploader.css';

class Uploader extends React.Component<Props> {
    public state: State = {
        fileName: '',
        uploadError: false
    }

    /**
     * Converts the CSV string into an TableRowInterface array.
     * @param { string } csvData ParsedCSV data
     * @returns { TableRowInterface[] } TableRows
     */
    private convertCsvToTableRow(csvData: string): TableRowInterface[] {
        const ROWS: TableRowInterface[] = [];

        // Split rows by \n this is the seperator in csv's
        const SPLITTED_DATA = csvData.split('\n');

        // Remove first line, because of csv header
        SPLITTED_DATA.shift();

        // Loop through items from the CSV and push them into the ROWS variable
        for (let index = 0; index < SPLITTED_DATA.length; index++) {
            try {
                const [
                    firstName, 
                    lastName, 
                    issueCount, 
                    birthdate
                ] = SPLITTED_DATA[index].split(';');

                const BIRTHDATE = convertDateToFirstPartIso(birthdate);
    
                ROWS.push({
                    firstName,
                    lastName,
                    issueCount,
                    birthdate: BIRTHDATE
                });
            } catch (error) {
                // Continue with the row generation. Maybe add a log here.
                continue;
            }
        }

        return ROWS;
    }

    /**
     * Gets file from event.
     * @param event 
     * @returns { File | undefined } the uploaded file
     */
    private getCsvFromEvent(event: any): File | undefined {
        return event.target.files[0];
    }

    /**
     * Sets filename inside label button
     * @param event 
     */
    private setFileName(event: string): void {
        this.setState({ fileName: event });
    }

    /**
     * Handles the event onchange from the input, parses the data, 
     * converts it to an array and updates the above component with the array.
     * @param event 
     */
    private async handleUpload(event: any): Promise<void> {
        // Resets the upload error.
        this.setState({ uploadError: false });

        // Find the file from event.
        const FILE = this.getCsvFromEvent(event);

        if (FILE) {
            // Sets filename inside label button.
            this.setFileName(FILE.name);

            try {
                // Parse CSV from file to string
                const PARSED = await parseCsv(FILE);
                
                // Parse string to array
                const CSV_ARRAY = this.convertCsvToTableRow(PARSED);

                // Check Array and update if correct.
                if (CSV_ARRAY.length !== 0 && Array.isArray(CSV_ARRAY)) {
                    this.props.onUpdate(CSV_ARRAY);
                }
            } catch (error) {
                this.props.onError(error);
            }
        } else {
            // Cannot find file
            this.setState({ uploadError: true });
            this.setState({ fileName: '' });
        }
    }

    public render() {
        return (
            <>
                <div className='upload-container'>
                    <h1>Upload hier je CSV</h1>
                    <label 
                        htmlFor="csv" 
                        className='btn btn-primary mb-2'
                    >
                        { this.state.fileName ? this.state.fileName : 'Upload bestand' }
                    </label>
                    <input 
                        type="file" 
                        className='d-none'
                        onChange={this.handleUpload.bind(this)} 
                        id="csv" 
                        data-testid="csv"
                        accept=".csv" 
                    />
                    { 
                        this.state.uploadError &&
                        <div className='error'>
                            Oeps... Er ging iets mis tijdens het uploaden. Probeer het opnieuw!
                        </div> 
                    }
                </div>
            </>
        );
    }
}

export default Uploader;