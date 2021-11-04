import React, { useEffect, useCallback } from 'react';

export default function useSwipeable(
    divRef: React.MutableRefObject<HTMLDivElement | null>, 
    onNext?: () => void, 
    onPrevious?: () => void) {
    
    let initialPosition: number | null = null;

    const touchStart = useCallback((event: TouchEvent) => {
        console.log('start');
        if (divRef.current != null) {
            initialPosition = event.touches[0].clientX;
        }
    }, [divRef]);

    const touchEnd = useCallback((event: TouchEvent) => {
        console.log('end');
    }, [divRef]);
    
    const touchMove = useCallback((event: TouchEvent) => {
        console.log('moving');
        if (divRef.current != null && initialPosition != null) {
            let diff = event.touches[0].clientX - initialPosition;
            divRef.current.style.transform = `translateX(${diff}px)`;
        }
    }, [divRef]);

    const registerEvents = () => {
        window.addEventListener('touchstart', touchStart);
        window.addEventListener('touchmove', touchMove);
        window.addEventListener('touchend', touchEnd);
    }

    const unregisterEvents = () => {
        window.removeEventListener('touchstart', touchStart);
        window.removeEventListener('touchmove', touchMove);
        window.removeEventListener('touchend', touchEnd);
    }
    
    useEffect(() => {
        registerEvents();
        return unregisterEvents;
    }, []);

    return { enable: registerEvents, disable: unregisterEvents };
}
