import { ITable } from "../models/ITable"

const getCellTextContent = (cell: any) => {
    const cellContent = cell.content[0].paragraph.elements[0].textRun
    if (cellContent !== undefined) {
        return cellContent.content
    }
    return 'none'
}

/**
 * Converts a google document to a list of tables. This parser is build for
 * a specific table format used in the google docs of my company, and thus looks 
 * for tables with size 9*2 with known first column values.
 * 
 * @param doc google document object 
 * @returns a list of tables.
 */
export const parseGoogleDoc = (doc: any): ITable[] | undefined => {
    console.log('start parsing')
    if (doc === null) {
        return;
    }

    const tempTables: ITable[] = []
    for (const element of doc.content ) {

        if (!element.hasOwnProperty('table')) {
            continue   
        }
        
        if (element.table.rows !== 9 || element.table.columns !== 2) {
            console.log(`Table not in right format. Expected 9 rows / 2 columns, got ${element.table.rows} / ${element.table.columns}`)
            continue
        }

        const table: ITable = {
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
    }
    return tempTables
}