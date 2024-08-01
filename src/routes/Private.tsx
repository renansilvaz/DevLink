import { ReactNode, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

interface PrivateProps{
    children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Private({ children }: PrivateProps): any{
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }

                localStorage.setItem("@devlinks", JSON.stringify(userData))
                setLoading(false);
                setSigned(true);

            }else{
                setLoading(false);
                setSigned(false)
                navigate("/login", {replace: true})
            }
        })

        return () => {
            unsub();
        }

    }, [navigate])

    if(loading){
        return <div></div>
    }

    if(!signed){
        return <Navigate to="/login" />

    }

    return children;
}