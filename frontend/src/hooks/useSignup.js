import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useSignup = () => {
  const [loading,setLoading] = useState(false)
  const {setAuthUser} = useAuthContext()
  const signup = async (fullName,username,email,password,confirmPassword,gender) => {
    const success = handleInputError(fullName,username,email,password,confirmPassword,gender)
    if(!success) return
    setLoading(true)
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fullName,username,email,password,confirmPassword,gender}) 
        })
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data.message)
        }
        localStorage.setItem('chat-user',JSON.stringify(data))
        setAuthUser(data)
        toast.success("Account created successfully")
    } catch (error) {
        toast.error(error.message)
    }
    finally {
        setLoading(false)
    }
  }
    return {loading,signup}
}

export default useSignup

const handleInputError = (fullName,username,email,password,confirmPassword,gender) => {
    if(fullName === '' || username === '' || email === '' || password === '' || confirmPassword === '' || gender === '') {
        toast.error('All fields are required')
        return false
    }
    if(password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }
    if(password.length < 8) {
        toast.error('Password must be at least 6 characters long')
        return false
    }
    return true
}