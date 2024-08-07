import {auth} from "./src/components/firebase";
import {Navigate} from "react-router-dom";

function ProtectedRoute({children}) {
    return auth.currentUser ?children : <Navigate to="/login" />
}

export default ProtectedRoute