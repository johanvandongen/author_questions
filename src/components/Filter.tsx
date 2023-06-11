import * as React from 'react';
import { useEffect, useState } from 'react';
import { type ITable } from '../models/ITable';
import { isAnswered } from '../utils/utils';

enum treatedOptions {
    yes = 'yes',
    no = 'no',
    pending = 'pending',
    all = 'all',
}
interface IInputConfirmProps {
    tables: ITable[];
    setActiveTables: (tables: ITable[]) => void;
}

export default function Filter({ tables, setActiveTables }: IInputConfirmProps): JSX.Element {
    const [input, setInput] = useState<string>('');
    const [treated, setIsTreated] = useState<treatedOptions>(treatedOptions.all);

    const answeredSearch = (table: ITable, answer: treatedOptions): boolean => {
        if (answer === treatedOptions.all) {
            return true;
        } else if (answer === treatedOptions.yes) {
            return isAnswered(table.treated);
        } else if (answer === treatedOptions.no) {
            return table.treated.trim() === '';
        } else if (answer === treatedOptions.pending) {
            return !isAnswered(table.treated) && table.treated.trim() !== '';
        }
        return false;
    };

    const generalSearch = (table: ITable): boolean => {
        const values = Object.values(table);
        for (const value of values) {
            let newVal: string = value;
            if (Array.isArray(value)) {
                newVal = value.join();
            }

            if (newVal.toLowerCase().includes(input.toLowerCase())) {
                return true;
            }
        }
        return false;
    };

    const filter = (input: string): void => {
        let gen = false;
        if (input === '') {
            gen = true;
            return;
        }

        setActiveTables(
            tables.filter((table) => {
                return (generalSearch(table) || gen) && answeredSearch(table, treated);
            })
        );
    };

    useEffect(() => {
        filter(input);
    }, [treated, input]);

    return (
        <div className="search">
            <div className="search-row">
                <p>Search</p>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
            </div>
            <select
                name="answered"
                defaultValue={treated}
                onChange={(e) => {
                    console.log(e.target.value);
                    setIsTreated(e.target.value as treatedOptions);
                }}
            >
                {Object.keys(treatedOptions).map((key) => (
                    <option key={key} value={key}>
                        {treatedOptions[key as keyof typeof treatedOptions]}
                    </option>
                ))}
            </select>
        </div>
    );
}
