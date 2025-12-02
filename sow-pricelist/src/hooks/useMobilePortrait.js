import { useEffect, useState } from "react";

export const useMobilePortrait = () => {
    const [isMobilePortrait,setIsMobilePortriat] = useState(false);

    const verify = () => {
        const checkVertical = window.innerWidth < 771;
        const checkOrientation = window.matchMedia('(orientation: portrait)').matches;
        setIsMobilePortriat(checkVertical && checkOrientation);
    }

    useEffect(() => {
        verify();
        window.addEventListener('resize',verify);
        window.addEventListener('orientationchange',verify);
        return () => {
            window.removeEventListener('resize',verify);
            window.removeEventListener('orientationchange',verify);
        }
    },[]);
    return isMobilePortrait;
}