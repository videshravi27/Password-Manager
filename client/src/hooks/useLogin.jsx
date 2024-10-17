import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-hot-toast";

export const useLogin = () => {
    const [error, setError] =useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(true)

        const response = await fetch('https://vault-7nbr.onrender.com/api/user/login', {
            method: "POST",
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
            toast.error(json.error, {
                position: 'top-center',
                style: {
                    marginBottom: '30px',
                    marginLeft: '15px'
                },
            })
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            toast.success("Login successful!", {
                position: 'top-center',
                style: {
                    marginBottom: '30px',
                    marginLeft: '15px'    
                },
            });
        }
    }
    return { login, isLoading, error }
}