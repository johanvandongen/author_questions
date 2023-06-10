import { v4 as uuidv4 } from 'uuid';
import { type ITable } from '../models/ITable';
import { parseTitle } from './utils';

// https://developers.google.com/docs/api/samples/extract-text

const getCellTextContent = (cell: any): string[] => {
    const text: string[] = [];
    for (const element of cell) {
        if (Object.prototype.hasOwnProperty.call(element, 'paragraph')) {
            const elements = element.paragraph.elements;
            for (const elem of elements) {
                text.push(parseParagraph(elem));
            }
        }
    }
    return text;
};

const parseParagraph = (element: any): string => {
    const hasTextRun = Object.prototype.hasOwnProperty.call(element, 'textRun');
    if (!hasTextRun) {
        return '';
    }
    return element.textRun.content;
};

/**
 * Converts a google document to a list of tables. This parser is build for
 * a specific table format used in the google docs of my company, and thus looks
 * for tables with size 9*2 with known first column values.
 *
 * @param doc google document object
 * @returns a list of tables.
 */
export const parseGoogleDoc = (doc: any): ITable[] | undefined => {
    console.log('start parsing');
    if (doc === null || doc === undefined) {
        return;
    }

    const author = parseTitle(doc.title);

    const tempTables: ITable[] = [];
    for (const element of doc.body.content) {
        const hasTableProperty = Object.prototype.hasOwnProperty.call(element, 'table');
        if (!hasTableProperty) {
            continue;
        }

        if (element.table.rows !== 9 || element.table.columns !== 2) {
            console.log(
                `Table not in right format. Expected 9 rows / 2 columns, got ${
                    element.table.rows as string
                } / ${element.table.columns as string}`
            );
            continue;
        }

        const table: ITable = {
            tableId: uuidv4(),
            author,
            date: '',
            issue: '',
            exerciseId: '',
            screenshot: undefined,
            question: [''],
            chapter: '',
            treated: '',
            answer: [''],
            authorReply: [''],
        };
        const rows: any[] = element.table.tableRows;
        table.date = getCellTextContent(rows[0].tableCells[1].content)[0];
        table.issue = getCellTextContent(rows[1].tableCells[1].content)[0];
        table.exerciseId = getCellTextContent(rows[2].tableCells[1].content)[0];
        table.screenshot = getCellTextContent(rows[3].tableCells[1].content);
        table.question = getCellTextContent(rows[4].tableCells[1].content);
        table.chapter = getCellTextContent(rows[5].tableCells[1].content)[0];
        table.treated = getCellTextContent(rows[6].tableCells[1].content)[0];
        table.answer = getCellTextContent(rows[7].tableCells[1].content);
        table.authorReply = getCellTextContent(rows[8].tableCells[1].content);

        // No point of having a question info table with no question
        if (table.question.join() === '\n') {
            continue;
        }

        tempTables.push(table);
    }
    return tempTables;
};
