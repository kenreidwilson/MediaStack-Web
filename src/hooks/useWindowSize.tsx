import { useLayoutEffect, useState } from 'react';

export default function useWindowSize() {

    const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight]);

    const updateWindowSize = () => setSize([window.innerWidth, window.innerHeight]);

    useLayoutEffect(() => {
        window.addEventListener('resize', updateWindowSize);
        return () => window.removeEventListener('resize', updateWindowSize);
    }, []);

    return size;
}
