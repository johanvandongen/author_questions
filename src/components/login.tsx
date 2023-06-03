import * as React from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
// import {google} from 'googleapis';
// import { OAuth2Client } from 'googleapis-common';


function createFile(token: string) {
    const fileName = "Minutes " + new Date().toString()

    fetch('https://docs.googleapis.com/v1/documents?title='+fileName, {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'Bearer ' + token })
    }).then(res => {
        return res.json()
    }).then( function(val) {
        console.log(val)
    })
}

export interface ILoginProps {
}

export function Login (props: ILoginProps) {
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
          createFile(tokenResponse.access_token)
        },
    });
  return (
    <div>
        <button onClick={() => googleLogin()}>
            Login
        </button>
      {/* <GoogleLogin
        onSuccess={credentialResponse => {
            console.log(credentialResponse.credential);
            if (credentialResponse.credential !== undefined) {
                var decoded = jwt_decode(credentialResponse.credential)
                console.log(decoded)
                // callAppsScript(String(decoded))
            }
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        /> */}
    </div>
  );
}
