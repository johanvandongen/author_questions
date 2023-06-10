import * as React from 'react';
import { type IGoogleUser } from '../models/IGoogleUser';

export interface IUserInfoProps {
    user: IGoogleUser | null;
    token: string;
}

export function UserInfo({ user, token }: IUserInfoProps): JSX.Element {
    return (
        <div style={style}>
            <p>{user === null ? 'Log in to continue' : 'Hello ' + user.name}</p>
            <p>Your access token {token}</p>
        </div>
    );
}

const style = {
    color: 'white',
    backgroundColor: '#F05454',
    padding: '5rem',
};
