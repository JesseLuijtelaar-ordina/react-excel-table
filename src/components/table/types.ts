import { TableRowInterface } from "../../interfaces/row.interface";

export type Props = {
    rows: TableRowInterface[];
}

export type State = {
    rows: TableRowInterface[];
    sortKey: 'firstName' | 'lastName' | 'issueCount' | 'birthdate';
    sortDirection: 'asc' | 'desc';
}