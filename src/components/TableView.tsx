import * as React from 'react';
import { Table } from '../models/Table';

export interface ITableViewProps {
    tables: Table[];
}

export function TableView ({tables}: ITableViewProps) {
  return (
    <div>
        {tables.map((table:Table) => 
                
            <div key={JSON.stringify(table)} style={{backgroundColor: 'gray', margin: '1rem', textAlign: 'left'}}>
                {(Object.entries(table).map(([key, value]) => (
                    <div key={key+value} style={{ display: 'flex', flexDirection: 'row', padding: '0.25rem'}}>
                        <div style={{color:'white', fontWeight: 'bold', minWidth: '10%'}}>{key}</div>
                        <div style={{color:'white'}}>{value}</div>
                    </div>
                )))}
            </div>
            )}
    </div>
  );
}
