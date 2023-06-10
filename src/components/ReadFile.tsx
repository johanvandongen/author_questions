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

    function readFile(token: string): void {
        const docId = getIdFromUrl(docUrl);
        if (docId === null) {
            return;
        }
        console.log(docId);
        const link = `https://docs.googleapis.com/v1/documents/${docId.toString()}`;
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

    // https://stackoverflow.com/questions/16840038/easiest-way-to-get-file-id-from-url-on-google-apps-script
    function getIdFromUrl(url: string): RegExpMatchArray | null {
        return url.match(/[-\w]{25,}/);
    }

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
                    readFile(token);
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
        </div>
    );
}
