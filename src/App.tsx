import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './components/login';
import { CreateFile } from './components/CreateFile';
import { UserInfo } from './components/UserInfo';
import { ReadFile } from './components/ReadFile';
import { type ITable } from './models/ITable';
import { TableView } from './components/TableView';
import { type IGoogleUser } from './models/IGoogleUser';
import Filter from './components/Filter';

function App(): JSX.Element {
    const [user, setUser] = useState<IGoogleUser | null>(null);
    const [tables, setTables] = useState<ITable[]>(
        JSON.parse(localStorage.getItem('tables') ?? '[]') as ITable[]
    );
    const [activeTables, setActiveTables] = useState<ITable[]>(
        JSON.parse(localStorage.getItem('tables') ?? '[]') as ITable[]
    );
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        localStorage.setItem('tables', JSON.stringify(tables));
    }, [tables]);

    useEffect(() => {
        setActiveTables(tables);
    }, [tables]);

    return (
        <div className="App" style={{ backgroundColor: '#30475E' }}>
            <div className="header">
                <h1>AQ uthor Questions</h1>

                <div className="login">
                    <UserInfo user={user} token={accessToken} />
                    <Login
                        setUser={(user) => {
                            setUser(user);
                        }}
                        setAccessToken={(token: string) => {
                            setAccessToken(token);
                        }}
                    />
                </div>
            </div>

            <div className="settings">
                <div className="left-section">
                    <CreateFile token={accessToken} />
                    <ReadFile
                        token={accessToken}
                        setTables={(tables: ITable[]) => {
                            setTables(tables);
                        }}
                    />
                </div>
                <div className="right-section">
                    <Filter
                        tables={tables}
                        setActiveTables={(tables) => {
                            setActiveTables(tables);
                        }}
                    />
                </div>
            </div>
            <TableView tables={activeTables} />
        </div>
    );
}

export default App;
