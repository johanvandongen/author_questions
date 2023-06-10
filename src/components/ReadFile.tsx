import * as React from 'react';
import { useEffect, useState } from 'react';
import { type ITable } from '../models/ITable';
import { parseGoogleDoc } from '../utils/googleDocParser';
import { getGoogleDoc } from '../services/getGoogleDoc';
import { getGoogleFolderFiles } from '../services/getGoogleFolderFiles';
import { getIdFromUrl } from '../utils/utils';

export interface IReadFileProps {
    token: string;
    setTables: (tables: ITable[]) => void;
}

export function ReadFile({ token, setTables }: IReadFileProps): JSX.Element {
    const [docUrl, setDocUrl] = useState<string>('');
    const [folderUrl, setFolderUrl] = useState<string>('');
    const [questionDocIds, setQuestionDocIds] = useState<string[]>([]);

    /** Stores google doc id (retrieved from URL) in state. */
    function readFile(): void {
        const docId = getIdFromUrl(docUrl);
        if (docId === null) {
            return;
        }
        setQuestionDocIds(docId);
    }

    /** Stores all document ids from specified folder URL in state. */
    function readFolder(token: string): void {
        const folderId = getIdFromUrl(folderUrl);
        if (folderId === null) {
            return;
        }
        void getGoogleFolderFiles(token, folderId.toString())
            .then((result) => {
                setQuestionDocIds(result.items.map((item: any): string => item.id));
            })
            .catch((error) => {
                console.log(error);
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
            <button
                onClick={() => {
                    readFile();
                }}
            >
                read file
            </button>
            <label>
                Enter doc URL
                <input
                    type="text"
                    value={docUrl}
                    onChange={(e) => {
                        setDocUrl(e.target.value);
                    }}
                />
            </label>

            <button
                onClick={() => {
                    readFolder(token);
                }}
            >
                read folder
            </button>
            <label>
                Enter drive URL
                <input
                    type="text"
                    value={folderUrl}
                    onChange={(e) => {
                        setFolderUrl(e.target.value);
                    }}
                />
            </label>
        </div>
    );
}
