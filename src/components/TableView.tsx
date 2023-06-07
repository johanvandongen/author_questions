import * as React from 'react';
import { ITable } from '../models/ITable';
import { Table } from './Table';

export interface ITableViewProps {
    tables: ITable[];
}

export function TableView ({tables}: ITableViewProps) {
  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
        {tables.map((table:ITable) => <Table table={table}/>)}
    </div>
  );
}
