import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Table {
    tableId: string, 
    date: string, 
    issue: string, 
    exerciseId: string, 
    screenshot: any, 
    question: string | string[], 
    chapter: string, 
    treated: string, 
    answer: string, 
    authorReply: string

}

export interface IReadFileProps {
    token: string
}

export function ReadFile ({ token }: IReadFileProps) {
    const [docBody, setDocBody] = useState<any>(null);
    const [docUrl, setDocUrl] = useState<string>('');
    const [tables, setTables] = useState<Table[]>([]);

    function readFile(token: string) {
        const docId = getIdFromUrl(docUrl)
        console.log(docId)
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

    // https://stackoverflow.com/questions/16840038/easiest-way-to-get-file-id-from-url-on-google-apps-script
    function getIdFromUrl(url: string) { return url.match(/[-\w]{25,}/); }

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
            
            if (element.table.rows !== 9 || element.table.columns !== 2) {
                console.log(`Table not in right format. Expected 9 rows / 2 columns, got ${element.table.rows} / ${element.table.columns}`)
            }
            const table: Table = {
                tableId: '',
                date: '',
                issue: '',
                exerciseId: '',
                screenshot: undefined,
                question: '',
                chapter: '',
                treated: '',
                answer: '',
                authorReply: ''
            }
            const rows: any[] = element.table.tableRows
            table.date = getCellTextContent(rows[0].tableCells[1])
            table.issue = getCellTextContent(rows[1].tableCells[1])
            table.exerciseId = getCellTextContent(rows[2].tableCells[1])
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
        <label>
            Enter doc URL
            <input type="text" value={docUrl} onChange={(e) => setDocUrl(e.target.value)}/>
        </label>

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
    </div>
  );
}
