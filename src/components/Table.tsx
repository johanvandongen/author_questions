import * as React from 'react';
import { type ITable } from '../models/ITable';

export interface ITableProps {
    table: ITable;
}

export function Table({ table }: ITableProps): JSX.Element {
    return (
        <div
            style={{
                backgroundColor: '#DDDDDD',
                // margin: '1rem',
                textAlign: 'left',
                padding: 5,
                borderRadius: '1rem',
            }}
        >
            <div>
                {table.date} {table.issue} {table.treated}
            </div>
            <div>Author: {table.author}</div>
            <div style={rowStyle}>
                <p style={{ paddingBottom: 5 }}>Question:</p>
                <p>{table.question}</p>
            </div>
            <div style={rowStyle}>
                <p>Answer:</p>
                <p>{table.answer}</p>
            </div>
        </div>
    );
}

const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 5,
};
