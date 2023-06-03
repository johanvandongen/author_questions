import * as React from 'react';
import { GoogleLogin } from '@react-oauth/google';

export interface ILoginProps {
}

export function Login (props: ILoginProps) {
  return (
    <div>
      <GoogleLogin
        onSuccess={credentialResponse => {
            console.log(credentialResponse);
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        />
    </div>
  );
}
