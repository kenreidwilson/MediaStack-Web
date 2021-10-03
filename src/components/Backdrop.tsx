import React, { MouseEventHandler } from 'react';

import './Backdrop.css'

const Backdrop = ({onClick}: {onClick: MouseEventHandler}) => (
    <div id="backdrop" onClick={onClick}></div>
);

export default Backdrop;
