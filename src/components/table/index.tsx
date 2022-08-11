import React from 'react';
import { TableRowInterface } from '../../interfaces/row.interface';
import { HEADER_ROW_KEYS } from '../../models/table/rows.model';
import { NUMERIC_SORTING_KEYS } from '../../models/table/sorting.model';
import { Props, State } from './types';
import { convertDateToDateString } from '../../util/date.util';
import './table.css';

class Table extends React.Component<Props> {
    public state: State = {
        rows: [],
        sortKey: "lastName",
        sortDirection: 'asc'
    }

    constructor(props: Props) {
        super(props);
        this.state.rows = props.rows;
    }

    /**
     * Toggles direction from ascending to descending
     */
    private toggleDirection(): void {
        this.setState({ sortDirection: this.state.sortDirection === 'asc' ? 'desc' : 'asc' });
    }

    /**
     * Sets the sort key if it's new. If the sort key is the same
     * then toggle direction
     * @param { string } key Key to sort on 
     */
    private handleSorting(key: string): void {
        if (this.state.sortKey === key) {
            this.toggleDirection();
            return;
        }

        this.setState({ 
            sortKey: key, 
            sortDirection: 'asc' // reset to asc when new key is selected
        });
    } 

    /**
     * Gets the sort sorted by the configuration inside the state
     * 
     * This includes numeric sorting and string sorting
     * 
     * @returns { TableRowInterface[] } sorted rows
     */
    private get sortedRows(): TableRowInterface[] {
        return this.state.rows.sort((a: { [key: string]: any }, b: { [key: string]: any }) => {
            if (NUMERIC_SORTING_KEYS.includes(this.state.sortKey)) {
                if (this.state.sortDirection === 'asc') {
                    return Number(a[this.state.sortKey]) - Number(b[this.state.sortKey]);
                } else if (this.state.sortDirection === 'desc') {
                    return Number(b[this.state.sortKey]) - Number(a[this.state.sortKey]);
                }
            } else {
                if (this.state.sortDirection === 'asc') {
                    return a[this.state.sortKey].localeCompare(b[this.state.sortKey]);
                }
                
                if (this.state.sortDirection === 'desc') {
                    return b[this.state.sortKey].localeCompare(a[this.state.sortKey]);
                }
            }
        });
    }

    /**
     * Transforms date into DateString for more readability
     * @param date Date you want to transform.
     * @returns { string } Transformed string or empty string
     */
    private transformDate(date: string): string {
        try {
            return convertDateToDateString(date);
        } catch (error) {
            return '';
        }
    }

    /**
     * Gets the orderbutton with the order that are set from the state
     * @param { string } sortKey 
     * @returns Arrow up / down for sorting direction
     */
    private orderButton(sortKey: string) {
        if (this.state.sortKey === sortKey) {
            return this.state.sortDirection === 'asc' ? <i className="fa-solid fa-arrow-down"></i> : <i className="fa-solid fa-arrow-up"></i>;
        }
    }

    public render() {
        return (
            <div className="App">
                <table>
                    <thead>
                        <tr>
                            {
                                HEADER_ROW_KEYS.map(({ title, value }, index) => 
                                    <th 
                                        key={index.toString()} 
                                        onClick={() => this.handleSorting(value)}
                                    >
                                        { title } { this.orderButton(value) }
                                    </th>                            
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.sortedRows.map(({ firstName, lastName, issueCount, birthdate }, index) =>
                                <tr key={index.toString()}>
                                    <td>
                                        {firstName}
                                    </td>
                                    <td>
                                        {lastName}
                                    </td>
                                    <td>
                                        {issueCount}
                                    </td>
                                    <td>
                                        { this.transformDate(birthdate) }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
