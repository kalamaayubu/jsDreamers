'use client'

import { loginSuccess } from "@/redux/authSlice"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await res.json()
            if (result.error) {
                toast.error(`${result.error}`)
                return;
            }

            // Save user to the redux store
            dispatch(loginSuccess({
                user: result.user,
                role: result.role
            }))

            // Navigate only after updating state
            toast.success(`${result.message}`)
            router.push(result.redirectUrl)
        } catch (error) {
            console.error('Error loging in:', error.stack)
            toast.error(`${error}`)
        } finally {
            setIsProcessing(false)
        }
    }

  return (
    <div className="h-screen flex">
    <div className="m-auto max-w-[400px] w-[80%] -translate-y-4">
        {/* <h3 className="text-center">Login</h3> */}
        <div className="items-center flex justify-center mb-7">
            <Image height={800} width={800} src="/assets/logo3D.png" alt="Svg" className="w-14" />
            <p className="flex bg-gradient-to-br from-blue-700 from-20% via-purple-600 via-90% bg-clip-text text-transparent font-bold text-2xl">
            &nbsp;&nbsp;&nbsp;jsDreamers
            </p>
        </div>
        {/* <p className="font-semibold text-center text-gray-600">Fill in your credentials to log in</p> */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2  m-auto mb-3">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email..."
                className="rounded-md focus:border focus:border-gray-400"
            />
            <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="rounded-md focus:border focus:border-gray-400"
            />
            <Link href={'/auth/forgot_password'} className="text-blue-800 my-1 hover:underline">forgot password</Link>
            <button disabled={isProcessing} className={`bg-blue-700 ${isProcessing ? 'cursor-not-allowed bg-slate-500' : 'hover:bg-blue-600'}`}>
                {isProcessing? <span className="animate-pulse">Authenticating...</span> : 'Login'}
            </button>
        </form>
        <p>Have no account? <Link href={'/auth/signup'} className="text-blue-800 hover:underline">sign up</Link></p>
    </div>
    </div>
  )
}

export default LoginPage