import * as React from 'react';
import { Tooltip as ReactToolTip } from 'react-tooltip';
import '../App.css';

interface ITreatedProps {
    text: string;
    id: string;
}

const isAnswered = (isAnswerdString: string): boolean => {
    switch (isAnswerdString.trim()) {
        case 'ja':
            return true;
        case 'Ja':
            return true;
        case 'y':
            return true;
        case 'Yes':
            return true;
        case 'yes':
            return true;
        default:
            return false;
    }
};

export default function Treated({ text, id }: ITreatedProps): JSX.Element {
    if (isAnswered(text)) {
        return (
            <>
                <p id={'id' + id}>&#x2713;</p>
                <ReactToolTip place="top" content={text} anchorSelect={'#id' + id} />
            </>
        );
    } else if (text.trim() === '') {
        return (
            <>
                <p id={'id' + id}>&#10006;</p>
                <ReactToolTip place="top" content={'No'} anchorSelect={'#id' + id} />
            </>
        );
    } else {
        return (
            <>
                <p id={'id' + id}>&#9888;</p>
                <ReactToolTip place="top" content={text} anchorSelect={'#id' + id} />
            </>
        );
    }
}
