import { redirect } from "next/navigation";
import useAuth from "./userAuth";

export default function Protected({children}:{children:React.ReactNode}) {
    const isAuthenticated = useAuth();
    return isAuthenticated ? children : redirect("/");    
}