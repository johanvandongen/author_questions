import React, { useState } from 'react';
import './App.css';
import { Login } from './components/login';
import { CreateFile } from './components/CreateFile';
import { UserInfo } from './components/UserInfo';

function App() {

  const [user, setUser] = useState({name: ''})
  const [accessToken, setAccessToken] = useState('');

  return (
    <div className="App">
      Author Questions
      <Login setUser={(user) => setUser(user)} setAccessToken={(token: string) => setAccessToken(token)}/>
      <UserInfo user={user} token={accessToken}/>
      <CreateFile token={accessToken}/>
    </div>
  );
}

export default App;
