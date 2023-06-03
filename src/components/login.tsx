import * as React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export interface ILoginProps {
}

export function Login (props: ILoginProps) {
  return (
    <div>
      <GoogleLogin
        onSuccess={credentialResponse => {
            console.log(credentialResponse.credential);
            if (credentialResponse.credential !== undefined) {
                var decoded = jwt_decode(credentialResponse.credential)
                console.log(decoded)
            }
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        />
    </div>
  );
}
