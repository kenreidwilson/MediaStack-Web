import React, { MouseEventHandler } from 'react';

import './Backdrop.css'

type Props = {
    onClick: MouseEventHandler,
}

const Backdrop = ({onClick}: Props) => (
    <div id="backdrop" onClick={onClick}></div>
)

export default Backdrop;
