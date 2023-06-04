import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

    const [tables, setTables] = useState<any>([]);

    const getCellTextContent = (cell: any) => {
        const cellContent = cell.content[0].paragraph.elements[0].textRun
        if (cellContent !== undefined) {
            return cellContent.content
        }
        return 'none'
    }

    const parseDocument = (doc: any) => {
        console.log('start parsing')
        if (doc === null) {
            return;
        }

        const tempTables = []
        for (const element of docBody.content ) {

            if (!element.hasOwnProperty('table')) {
                continue   
            }
            
            // console.log('table found', element.table.tableRows)
            if (element.table.rows !== 9 || element.table.columns !== 2) {
                console.log(`Table not in right format. Expected 9 rows / 2 columns, got ${element.table.rows} / ${element.table.columns}`)
            }
            
            const table = {id: null, date: null, issue: null, akitId: null, screenshot: null, question: null, chapter: null, treated: null, answer: null, authorReply: null}
            const rows: any[] = element.table.tableRows
            table.date = getCellTextContent(rows[0].tableCells[1])
            table.issue = getCellTextContent(rows[1].tableCells[1])
            table.akitId = getCellTextContent(rows[2].tableCells[1])
            table.screenshot = getCellTextContent(rows[3].tableCells[1])
            table.question = getCellTextContent(rows[4].tableCells[1])
            table.chapter = getCellTextContent(rows[5].tableCells[1])
            table.treated = getCellTextContent(rows[6].tableCells[1])
            table.answer = getCellTextContent(rows[7].tableCells[1])
            table.authorReply = getCellTextContent(rows[8].tableCells[1])
            tempTables.push(table)
            console.log(table)
        }
        setTables(tempTables);
    }

    useEffect(() => {
        parseDocument(docBody)
    }, [docBody])

  return (
    <div>
        <button onClick={() => readFile(token)}>read file</button>

        <div>
            {tables.map((table:any) => 
            
            <div style={{backgroundColor: 'gray', margin: '1rem', textAlign: 'left'}}>
                {(Object.keys(table).map((key: any, i: any) => (
                    <div style={{ display: 'flex', flexDirection: 'row', padding: '0.25rem'}}>
                        <div style={{color:'white', fontWeight: 'bold', minWidth: '10%'}}>{key}</div>
                        <div style={{color:'white'}}>{table[key]}</div>
                    </div>
                )))}
            </div>
            
            )}
        </div>
        
        {/* {parseDocument(docBody)} */}
        {docBody !== null && docBody.content.map((el: any): JSX.Element | undefined => {
            if (el.hasOwnProperty('table') ) {
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
