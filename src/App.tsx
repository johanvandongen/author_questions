import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './components/login';
import { CreateFile } from './components/CreateFile';
import { UserInfo } from './components/UserInfo';
import { ReadFile } from './components/ReadFile';
import { type ITable } from './models/ITable';
import { TableView } from './components/TableView';
import { type IGoogleUser } from './models/IGoogleUser';

function App(): JSX.Element {
    const [user, setUser] = useState<IGoogleUser | null>(null);
    const [tables, setTables] = useState<ITable[]>(
        JSON.parse(localStorage.getItem('tables') ?? '[]') as ITable[]
    );
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        localStorage.setItem('tables', JSON.stringify(tables));
    }, [tables]);

    return (
        <div className="App" style={{ backgroundColor: '#30475E' }}>
            Author Questions
            <Login
                setUser={(user) => {
                    setUser(user);
                }}
                setAccessToken={(token: string) => {
                    setAccessToken(token);
                }}
            />
            <UserInfo user={user} token={accessToken} />
            <CreateFile token={accessToken} />
            <ReadFile
                token={accessToken}
                setTables={(tables: ITable[]) => {
                    setTables(tables);
                }}
            />
            <TableView tables={tables} />
        </div>
    );
}

export default App;
