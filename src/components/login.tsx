import * as React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export interface ILoginProps {
    setUser: (s: any) => void;
    setAccessToken: (s: string) => void;
}

export function Login({ setUser, setAccessToken }: ILoginProps): JSX.Element {
    const googleLogin = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive.readonly',
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
            void updateUser(tokenResponse.access_token);
            setAccessToken(tokenResponse.access_token);
        },
    });

    const updateUser = async (token: string): Promise<void> => {
        // fetching userinfo can be done on the client or the server
        const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => res.data);

        console.log('User info', userInfo);
        setUser(userInfo);
    };

    return (
        <div>
            <button
                onClick={() => {
                    googleLogin();
                }}
            >
                Login
            </button>
        </div>
    );
}
