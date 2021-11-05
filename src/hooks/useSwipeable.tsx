import React, { useEffect, useCallback } from 'react';

export default function useSwipeable(
    divRef: React.MutableRefObject<HTMLDivElement | null>, 
    onNext?: () => void, 
    onPrevious?: () => void) {
    
    let initialTouchPosition: number | null = null;
    let initialDivX: number | null = null;
    let showFromLeft = false;

    const touchStart = useCallback((event: TouchEvent) => {
        if (divRef.current != null) {
            divRef.current.style.transition = '';
            initialTouchPosition = event.touches[0].clientX;
            initialDivX = divRef.current.offsetLeft;
        }
    }, [divRef]);

    const touchEnd = useCallback((event: TouchEvent) => {
        if (divRef.current != null && initialTouchPosition != null) {
            divRef.current.style.transition = '0.3s ease-in-out';
            let diff = event.changedTouches[0].clientX - initialTouchPosition;

            if (Math.abs(diff) > 0.5 * divRef.current.offsetWidth) { 
                let newPos = divRef.current.offsetWidth * 1.2;
                let isLeft = diff < 0;
                if (isLeft) {
                    newPos = newPos * -1;
                }
                divRef.current.style.transform = `translateX(${newPos}px)`;

                showFromLeft = isLeft;

                if (isLeft) {
                    onPrevious && onPrevious();
                } else {
                    onNext && onNext();
                }

            } else {
                divRef.current.style.transform = `translateX(${initialDivX}px)`;
            }
        }
    }, [divRef]);
    
    const touchMove = useCallback((event: TouchEvent) => {
        if (divRef.current != null && initialTouchPosition != null) {
            divRef.current.style.transition = '';
            let diff = event.touches[0].clientX - initialTouchPosition;
            divRef.current.style.transform = `translateX(${diff}px)`;
        }
    }, [divRef]);

    const resetPosition = useCallback(() => {
        if (divRef.current != null) {
            divRef.current.style.transition = '';
            divRef.current.style.transform = `translateX(${showFromLeft ? window.innerWidth * -1 : window.innerWidth}px)`;
            divRef.current.style.transition = '0.3s ease-in-out';
            divRef.current.style.transform = `translateX(${initialDivX}px)`;
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

    return { enable: registerEvents, disable: unregisterEvents, resetPosition };
}
