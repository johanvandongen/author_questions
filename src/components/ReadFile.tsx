import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from '../models/Table';

export interface IReadFileProps {
    token: string;
    setTables: (tables: Table[]) => void;
}

export function ReadFile ({ token, setTables }: IReadFileProps) {
    const [docBody, setDocBody] = useState<any>(null);
    const [docUrl, setDocUrl] = useState<string>('');

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
    </div>
  );
}
