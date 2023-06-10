import * as React from 'react';

interface ITreatedProps {
    text: string;
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

export default function Treated({ text }: ITreatedProps): JSX.Element {
    if (isAnswered(text)) {
        return <p>&#x2713;</p>;
    } else if (text.trim() === '') {
        return <p>&#10006;</p>;
    } else {
        return <p>{text}</p>;
    }
}
