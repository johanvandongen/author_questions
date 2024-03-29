import * as React from 'react';
import { useEffect, useState } from 'react';
import { type ITable } from '../models/ITable';
import { parseGoogleDoc } from '../utils/googleDocParser';
import { getGoogleDoc } from '../services/getGoogleDoc';
import { getGoogleFolderFiles } from '../services/getGoogleFolderFiles';
import { getIdFromUrl } from '../utils/utils';
import InputConfirm from './ui/InputConfirm';

export interface IReadFileProps {
    token: string;
    setTables: (tables: ITable[]) => void;
}

export function ReadFile({ token, setTables }: IReadFileProps): JSX.Element {
    const [questionDocIds, setQuestionDocIds] = useState<string[]>([]);

    /** Stores google doc id (retrieved from URL) in state. */
    function readFile(url: string): void {
        console.log('called with', url);
        const docId = getIdFromUrl(url);
        if (docId === null) {
            alert('URL not found');
            return;
        }
        setQuestionDocIds(docId);
    }

    /** Stores all document ids from specified folder URL in state. */
    function readFolder(url: string): void {
        const folderId = getIdFromUrl(url);
        if (folderId === null) {
            alert('URL not found');
            return;
        }
        void getGoogleFolderFiles(token, folderId.toString())
            .then((result) => {
                setQuestionDocIds(result.items.map((item: any): string => item.id));
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    /** Gets all tables, from google doc files with id in {@code questionDocIds}. */
    function getTables(): void {
        const promises = [];
        const tables: ITable[] = [];
        for (const docId of questionDocIds) {
            promises.push(getGoogleDoc(token, docId));
        }

        Promise.all(promises)
            .then((docIds) => {
                for (const docId of docIds) {
                    const docTables: ITable[] | undefined = parseGoogleDoc(docId);
                    if (docTables !== undefined) {
                        tables.push(...docTables);
                    }
                }
                setTables(tables);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (questionDocIds.length > 0) {
            console.log(`start fetching tables from ${questionDocIds.length} doc(s)`);
            getTables();
        }
    }, [questionDocIds]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputConfirm
                onClick={(input: string) => {
                    readFile(input);
                }}
                buttonText={'Read file'}
                description={'Enter doc URL'}
            />

            <InputConfirm
                onClick={(input: string) => {
                    readFolder(input);
                }}
                buttonText={'read folder'}
                description={'Enter drive URL'}
            />
        </div>
    );
}
