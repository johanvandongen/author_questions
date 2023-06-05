import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './components/login';
import { CreateFile } from './components/CreateFile';
import { UserInfo } from './components/UserInfo';
import { ReadFile } from './components/ReadFile';
import { Table } from './models/Table';
import { TableView } from './components/TableView';

function App() {

  const [user, setUser] = useState({name: ''})
  const [tables, setTables] = useState<Table[]>(JSON.parse(localStorage.getItem("tables") ?? '[]') as Table[])
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    localStorage.setItem("tables", JSON.stringify(tables))
  }, [tables])

  return (
    <div className="App">
      Author Questions
      <Login setUser={(user) => setUser(user)} setAccessToken={(token: string) => setAccessToken(token)}/>
      <UserInfo user={user} token={accessToken}/>
      <CreateFile token={accessToken}/>
      <ReadFile token={accessToken} setTables={(tables: Table[]) => setTables(tables)}/>
      <TableView tables={tables}/>
    </div>
  );
}

export default App;
