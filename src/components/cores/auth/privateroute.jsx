import { Navigate } from "react-router-dom";
import { useAuthorized } from "../../../hooks/useAuthorized";

export const PrivateRoute = ({children}) => {
    return useAuthorized() ? children : <Navigate to={'/login'}/>
}