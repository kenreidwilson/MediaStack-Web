import React, { useEffect, useCallback } from 'react';

type Props = {
    divRef: React.MutableRefObject<HTMLDivElement | null>,
    onNext?: () => void,
    onPrevious?: () => void,
    move?: boolean
}

export default function useSwipeable({ divRef, onNext, onPrevious, move = true }: Props) {

    let initialTouchPosition: number | null = null;
    let initialDivX: number | null = null;
    let showFromLeft = false;
    let touchStartTime = window.performance.now();

    const touchStart = (event: TouchEvent) => {
        if (divRef.current != null) {
            divRef.current.style.transition = '';
            initialTouchPosition = event.touches[0].clientX;
            initialDivX = divRef.current.offsetLeft;
            touchStartTime = window.performance.now();
        }
    }

    const touchEnd = (event: TouchEvent) => {
        if (divRef.current != null && initialTouchPosition != null) {
            divRef.current.style.transition = '0.3s ease-in-out';
            let diff = event.changedTouches[0].clientX - initialTouchPosition;

            let threshhold = 0.4;
            if (window.performance.now() - touchStartTime < 200) {
                threshhold = 0.03;
            }

            if (Math.abs(diff) > threshhold * divRef.current.offsetWidth) { 
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
    
    const touchMove =(event: TouchEvent) => {
        if (divRef.current != null && initialTouchPosition != null) {
            divRef.current.style.transition = '';
            let diff = event.touches[0].clientX - initialTouchPosition;
            divRef.current.style.transform = `translateX(${diff}px)`;
        }
    }

    const resetPosition = () => {
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
    }

    const registerEvents = (element: HTMLElement | null) => {
        if (element === null) {
            return;
        }

        element.addEventListener('touchstart', touchStart);
        move && element.addEventListener('touchmove', touchMove);
        element.addEventListener('touchend', touchEnd);
    }

    const unregisterEvents = (element: HTMLElement | null) => {

        if (element === null) {
            return;
        }

        element.removeEventListener('touchstart', touchStart);
        move && element.removeEventListener('touchmove', touchMove);
        element.removeEventListener('touchend', touchEnd);
    }
    
    useEffect(() => {
        if (divRef.current !== null) {
            registerEvents(divRef.current);
            return () => unregisterEvents(divRef.current);
        }
    }, [divRef.current]);

    return { 
        enable: () => registerEvents(divRef.current), 
        disable: () => unregisterEvents(divRef.current), 
        resetPosition };
}
