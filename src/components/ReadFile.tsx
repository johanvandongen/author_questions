import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';

export interface IReadFileProps {
    token: string
}

export function ReadFile ({ token }: IReadFileProps) {
    const [docBody, setDocBody] = useState<any>(null);

    function readFile(token: string) {
        const docId = '1JmQk0Gfto7J0Cax_S4Yz5X1_sEfZxAs1E5vbhf_cMK8'
        const link = `https://docs.googleapis.com/v1/documents/${docId}`
        axios.get(link, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then((response) => {
            console.log(response.data.body)
            setDocBody(response.data.body)
        }).catch((error)=>{
            console.log(error)
        })
    }

  return (
    <div>
        <button onClick={() => readFile(token)}>read file</button>
        {docBody !== null && docBody.content.map((el: any): JSX.Element | undefined => {
            if (el.hasOwnProperty('table') ) {
                console.log('table found', el.table.tableRows)
                return <div style={{backgroundColor: 'gray', margin: '1rem'}}>table {el.table.tableRows.map((row: any) => {
                    return <p>Table row{row.tableCells.map((cell: any) => {
                        const cellContent = cell.content[0].paragraph.elements[0].textRun
                        if (cellContent !== undefined) {
                            return <p>{JSON.stringify(cellContent.content)}</p>
                        }
                    })}</p>
                })}</div>
                // return <p style={{marginTop: 50}}>{JSON.stringify(el.table)}</p>
            }
            return <div style={{paddingTop: 20}}></div>
        })}
    </div>
  );
}
