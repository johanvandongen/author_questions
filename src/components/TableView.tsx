import * as React from 'react';
import { type ITable } from '../models/ITable';
import { Table } from './Table';

export interface ITableViewProps {
    tables: ITable[];
}

export function TableView({ tables }: ITableViewProps): JSX.Element {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {tables.map((table: ITable) => (
                <Table key={table.date + table.answer + table.tableId} table={table} />
            ))}
        </div>
    );
}
