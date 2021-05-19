import React, { MouseEventHandler }  from 'react';

type Props = {
    onClick: MouseEventHandler,
    label: string,
    value: any
}

const InfoSideBarElement = ({onClick, label, value}: Props) => (
    <p>{label}
    {
        value === null ? "" : typeof onClick === 'undefined' ? 
        value :
        <a href="/#" onClick={onClick}>{value}</a>
    }
    </p>
)

export default InfoSideBarElement;
