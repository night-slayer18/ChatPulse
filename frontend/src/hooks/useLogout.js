import  { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLogout = () => {
    const [loading,setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()
    const logout = async() => {
        setLoading(true)
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json()
            if(!response.ok) {
                throw new Error(data.message)
            }
            localStorage.removeItem('chat-user')
            setAuthUser(null)
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    return {loading,logout}
}

export default useLogout
