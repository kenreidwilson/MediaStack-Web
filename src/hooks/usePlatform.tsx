import { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

export default function usePlatform() {

    const mobileWidthThreshhold = 768;

    const [width, height] = useWindowSize();
    const [isMobile, setIsMobile] = useState<boolean>(width <= mobileWidthThreshhold);

    const determineIsMobile = (): boolean => width <= mobileWidthThreshhold;

    useEffect(() => {
        let newIsMobile = determineIsMobile();
        if (newIsMobile !== isMobile) {
            setIsMobile(newIsMobile);
        }
    }, [width]);
    
    return { isMobile };

}
