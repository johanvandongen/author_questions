import * as React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';


export interface ICreateFileProps {
    token: string
}

export function CreateFile ({token}: ICreateFileProps) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fileName, setFileName] = useState('')
    const [googleDocLink, setGoogleDocLink] = useState('')

    function createFile(token: string) {
        const fileName = "Minutes " + new Date().toString()
        const link = `https://docs.googleapis.com/v1/documents?title=${fileName}`
        axios.post(link, {}, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then((response) => {
            console.log(response.data)
            setFileName(fileName)
            setGoogleDocLink(`https://docs.google.com/document/d/${response.data.documentId}/edit`)
            setModalIsOpen(true)
        }).catch((error)=>{
            console.log(error)
        })
    }

  return (
    <div>
        <Modal
        isOpen={modalIsOpen}>
            <div>Document with name: {fileName} has been created</div>
            <a href={googleDocLink} target='_blank' rel="noreferrer">Open google doc</a>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
      <button onClick={() => createFile(token)}>
        Create file
      </button>
    </div>
  );
}
