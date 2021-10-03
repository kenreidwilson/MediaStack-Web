import { MouseEventHandler } from 'react';

type Props = {
    onClick: MouseEventHandler
}

export default function Backdrop({ onClick }: Props) {

    return <div 
                onClick={onClick}
                style={{
                    position: "fixed", 
                    width: "100%", 
                    height: "100%", 
                    top: 0, 
                    left: 0, 
                    background: "rgba(0,0,0,0.6)", 
                    zIndex: 100
                }}
            />
}
