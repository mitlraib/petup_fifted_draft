import React, { useEffect, useState } from "react"
import { getStoredString, removeStoredData, storeString } from "../utils/storage"
import axios from "axios"
import { ServerIP } from "@/constants/Network"

export interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    tel: number
    experience: string
    aboutYou: string
}

export interface RegisterForm {
    firstName:string
    lastName:string
    password:string
    email:string
    tel:string
    experience:string
    aboutYou:string
}

export interface IAuthContext {
    loading: boolean
    setUser: (user: User | undefined | null) => void
    error: unknown
    token: string | undefined
    user: User | undefined | null,
    setLoading: (loading: boolean) => void
    login: (email: string, password: string) => Promise<void>
    register: (registerForm: RegisterForm) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = React.createContext<IAuthContext | null>(null)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | undefined | null>(undefined)
    const [error, setError] = useState<unknown>(undefined)
    const [token, setToken] = useState<string | undefined>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getStoredString("token")  
                if (token) {
                    setToken(token)
                } else {
                    setLoading(false)
                    setUser(null)
                }
            } catch (e: any) {
                setError(e)
            }
        }
        fetchToken()
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (token) {
                    console.log("fetching..")
                    const response = await axios.get(`http://${ServerIP}:5000/api/users/me`, {
                        headers: {
                            'Content-Type': "application/json",
                            'Authorization': `Bearer ${token}`,
                        },
                    })

                    // בדוק ש-response.data ו-response.data.data קיימים לפני הגישה אליהם
                    if (response.data && response.data.data && response.data.data._id) {
                        setUser(response.data.data)
                    } else {
                        console.error("Unexpected response structure", response.data)
                        setError("Failed to fetch user data")
                    }
                }
            } catch (e: any) {
                console.log(e.response?.data || e.message)
                setError(e)
            }
        }
        if (token) {
            fetchUser()
        }
    }, [token])

    const login = async (email: string, password: string) => {
        try {
            setLoading(true)
            const response = await axios.post(`http://${ServerIP}:5000/api/users/login`, {
                email,
                password,
            })
            const idToken = response.data.data.access_token
            await storeString("token", idToken)
            setToken(idToken)
        } catch (e: any) {
            setError(e)
            throw e
        } finally {
            setLoading(false)
        }
    }

    const register = async (registerForm: RegisterForm) => {
        try {
            setLoading(true)
            await axios.post(`http://${ServerIP}:5000/api/users/register`, registerForm)
        } catch (e: any) {
            setError(e)
            throw e
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await removeStoredData("token")
        setToken(undefined)
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{
            setUser,
            login,
            register,
            loading,
            setLoading,
            user,
            token,
            logout,
            error
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error("Auth context not provided in AuthContextProvider")
    }
    return context
}
