import * as React from 'react';
import axios from 'axios';

export interface IReadFileProps {
    token: string
}

export function ReadFile ({ token }: IReadFileProps) {

    function readFile(token: string) {
        const docId = '1JmQk0Gfto7J0Cax_S4Yz5X1_sEfZxAs1E5vbhf_cMK8'
        const link = `https://docs.googleapis.com/v1/documents/${docId}`
        axios.get(link, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then((response) => {
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

  return (
    <div>
        <button onClick={() => readFile(token)}>read file</button>
      {token}
    </div>
  );
}
