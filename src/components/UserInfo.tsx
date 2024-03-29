import * as React from 'react';
import { type IGoogleUser } from '../models/IGoogleUser';

export interface IUserInfoProps {
    user: IGoogleUser | null;
    token: string;
}

export function UserInfo({ user, token }: IUserInfoProps): JSX.Element {
    return (
        <div>
            <h3>{user === null ? 'Log in to continue' : 'Hello ' + user.name}</h3>
            {/* <p>Your access token {token}</p> */}
        </div>
    );
}
