import * as React from 'react';

export interface IUserInfoProps {
    user: any
    token: string
}

export function UserInfo ({user, token}: IUserInfoProps) {
  return (
    <div style={style}>
      <p>{user.name === '' ? 'Log in to continue' : 'Hello ' + user.name}</p>
      <p>Your access token {token}</p>
    </div>
  );
}

const style = {
    color: 'white',
    backgroundColor: '#F05454',
    padding: '5rem'
}