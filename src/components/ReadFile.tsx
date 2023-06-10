import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { type ITable } from '../models/ITable';
import { parseGoogleDoc } from '../utils/googleDocParser';

export interface IReadFileProps {
    token: string;
    setTables: (tables: ITable[]) => void;
}

export function ReadFile({ token, setTables }: IReadFileProps): JSX.Element {
    const [docUrl, setDocUrl] = useState<string>('');
    const [folderUrl, setFolderUrl] = useState<string>('');
    const [questionDocIds, setQuestionDocIds] = useState<string[]>([]);

    function readFile(): void {
        const docId = getIdFromUrl(docUrl);
        if (docId === null) {
            return;
        }
        setQuestionDocIds(docId);
    }

    async function readDocFile(token: string, docId: string): Promise<any> {
        const link = `https://docs.googleapis.com/v1/documents/${docId}`;
        return await axios
            .get(link, {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function readFolder(token: string): void {
        const folderId = getIdFromUrl(folderUrl);
        if (folderId === null) {
            return;
        }
        console.log('start requesting drive folder', folderId);
        const link = `https://www.googleapis.com/drive/v2/files?q='${folderId.toString()}'+in+parents`;
        axios
            .get(link, {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            .then((response) => {
                setQuestionDocIds(response.data.items.map((item: any): string => item.id));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // https://stackoverflow.com/questions/16840038/easiest-way-to-get-file-id-from-url-on-google-apps-script
    function getIdFromUrl(url: string): RegExpMatchArray | null {
        return url.match(/[-\w]{25,}/);
    }

    function getTables(): void {
        const promises = [];
        const tables: ITable[] = [];
        for (const docId of questionDocIds) {
            promises.push(readDocFile(token, docId));
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
