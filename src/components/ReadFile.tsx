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
    const [docBody, setDocBody] = useState<any>(null);
    const [docUrl, setDocUrl] = useState<string>('');
    const [folderUrl, setFolderUrl] = useState<string>('');
    const [questionDocIds, setQuestionDocIds] = useState<string[]>([]);

    function readFile(token: string, docId: string | undefined): void {
        let newDocId: string = '';

        if (docId !== undefined) {
            newDocId = docId;
        } else {
            const id = getIdFromUrl(docUrl);
            if (id === null) {
                return;
            }
            newDocId = id.toString();
        }

        console.log(docId);
        const link = `https://docs.googleapis.com/v1/documents/${newDocId}`;
        axios
            .get(link, {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response.data);
                console.log(response.data.body);
                setDocBody(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function readDocFile(token: string, docId: string): Promise<any> {
        console.log(docId);
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
        const driveId = getIdFromUrl(folderUrl);
        if (driveId === null) {
            return;
        }
        console.log('start requesting drive folder', driveId);
        const link = `https://www.googleapis.com/drive/v2/files?q='${driveId.toString()}'+in+parents`;
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
            getTables();
        }
    }, [questionDocIds]);

    useEffect(() => {
        const tables: ITable[] | undefined = parseGoogleDoc(docBody);
        if (tables !== undefined) {
            setTables(tables);
        }
    }, [docBody]);

    return (
        <div>
            <button
                onClick={() => {
                    readFile(token, undefined);
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
