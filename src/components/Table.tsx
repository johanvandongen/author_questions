import React from 'react';
import { type ITable } from '../models/ITable';
// import '../App.css';
import '../App.css';
import Treated from './Treated';

interface ITableProps {
    table: ITable;
}

export default function Table({ table }: ITableProps): JSX.Element {
    return (
        <div className="table-container">
            <div className="table-header">
                <p>{table.date}</p>
                <p>{table.issue}</p>
                <Treated text={table.treated} />
            </div>

            <div className="table-row-horizontal">
                <span className="table-field">Author: </span> {table.author}
            </div>
            <div className="table-row">
                <p>
                    <span className="table-field">Question:</span>
                </p>
                <p>{table.question}</p>
            </div>
            <div className="table-row">
                <p>
                    <span className="table-field">Answer:</span>
                </p>
                <p>{table.answer}</p>
            </div>
        </div>
    );
}
