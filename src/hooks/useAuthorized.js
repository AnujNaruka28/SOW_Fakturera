import { useState,useEffect } from "react";

export const useAuthorized = () => {
    const [authorized,setAuthorized] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setAuthorized(!!token);
    },[])
    return authorized;
}