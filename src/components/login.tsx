import * as React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export interface ILoginProps {
    setUser: (s: any) => void
    setAccessToken: (s: string) => void
}

export function Login ({setUser, setAccessToken}: ILoginProps) {
    const googleLogin = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/documents',
        onSuccess: async tokenResponse => {
          console.log(tokenResponse);
          // fetching userinfo can be done on the client or the server
          const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
            .then(res => res.data);
        
          console.log(userInfo);
          setUser(userInfo)
          setAccessToken(tokenResponse.access_token)
        },
    });

  return (
    <div>
        <button onClick={() => googleLogin()}>
            Login
        </button>
    </div>
  );
}
