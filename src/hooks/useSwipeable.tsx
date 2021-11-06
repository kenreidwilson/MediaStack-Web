import React, { useEffect, useCallback } from 'react';

export default function useSwipeable(
    divRef: React.MutableRefObject<HTMLDivElement | null>, 
    onNext?: () => Promise<void>, 
    onPrevious?: () => Promise<void>) {

    let initialTouchPosition: number | null = null;
    let initialDivX: number | null = null;
    let showFromLeft = false;

    const touchStart = (event: TouchEvent) => {
        if (divRef.current != null) {
            divRef.current.style.transition = '';
            initialTouchPosition = event.touches[0].clientX;
            initialDivX = divRef.current.offsetLeft;
        }
    }

    const touchEnd = (event: TouchEvent) => {
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

                new Promise(resolve => setTimeout(resolve, 300)).then(() => {
                    if (isLeft) {
                        if (onPrevious) {
                            onPrevious();
                        }
                    } else {
                        if (onNext) {
                            onNext();
                        }
                    }
                });   
                
            } else {
                if (initialDivX !== null) {
                    divRef.current.style.transform = `translateX(${initialDivX - 5}px)`;
                }
            }
        }
    }
    
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
            divRef.current.style.transform = `translateX(${showFromLeft ? window.innerWidth : window.innerWidth * -1}px)`;
            new Promise(resolve => setTimeout(resolve, 50)).then(() => {
                if (divRef.current != null && initialDivX !== null) {
                    divRef.current.style.transition = '0.3s ease-in-out';
                    divRef.current.style.transform = `translateX(${initialDivX - 5}px)`;
                }
            });
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
