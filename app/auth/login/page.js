'use client'

import ContinueWithGithub from "@/components/client/ContinueWithGithub"
import ContinueWithGoogle from "@/components/client/ContinueWithGoogle"
import Logo from "@/components/general/Logo"
import { loginSuccess } from "@/redux/authSlice"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Loader2 } from "lucide-react"

const LoginPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    // Form validation schema
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                'Enter a valid email address'
            )
            .test(
                'is-lowercase',
                'Email must not contain uppercase letters',
                (value) => value === value?.toLowerCase()
            )
            .required('Email is required'),

        password: Yup.string()
            .required('Password is required')
            // Password validation rules
            .test(
                'password-rules',
                (value, context) => {
                    const rules = [];
                    if (!value) return 'Password is required';
                    if (value.length < 8) rules.push('• be at least 8 characters long');
                    if (!/[a-z]/.test(value)) rules.push('• include a lowercase letter');
                    if (!/[A-Z]/.test(value)) rules.push('• include an uppercase letter');
                    if (!/[0-9]/.test(value)) rules.push('• include a number');
                    if (!/[@$!%*?&]/.test(value)) rules.push('• include a special character');

                    if (rules.length > 0) {
                        return context.createError({
                            message: `Password must:\n${rules.join('\n')}`,
                        });
                    }

                    return true;
                }
            ),
    })

    // Handle form submission
    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: values.email, password: values.password })
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
            setSubmitting(false)
        }
    }

  return (
    <div className="h-screen flex">
        <div className="m-auto max-w-[450px] w-[80%] -translate-y-4 p-6 rounded-lg">
        <Logo/>
        <p className="text-center text-gray-600 text-[17px] mb-4">Welcome back! Please log in to your account</p>
        <div className="flex flex-col w-full lg:items-center gap-3">
            <ContinueWithGoogle/>
            {/* <ContinueWithGithub/> */}
        </div>
        <div className="my-4 text-gray-400 flex justify-center">
            <p>OR login with email and password</p>
        </div>
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, touched, errors }) => (
                <Form className="flex flex-col gap-2 m-auto mb-3">
                    <Field
                        type="email"
                        name="email"
                        placeholder="Enter email..."
                        className={`rounded-md focus:border focus:border-gray-400 
                            ${touched.email && errors.email ? 'border-red-500' : ''}
                        `}
                    />
                    <ErrorMessage name="email" component={'div'} className="text-red-500" />

                    <Field
                        type="password"
                        name="password"
                        placeholder="Enter password..."
                        className={`rounded-md focus:border focus:border-gray-400 
                            ${touched.password && errors.password ? 'border-red-500' : ''}
                        `}
                    />
                    <ErrorMessage name="password" render={(msg) => (
                        <div className="text-red-500 whitespace-pre-line">
                            {msg}
                        </div>
                      )}
                    />

                    <Link href={'/auth/forgot_password'} className="text-blue-800 my-1 hover:underline hover:gradient-text-blue-purple">forgot password</Link>

                    <button 
                        disabled={isSubmitting} 
                        className={`bg-blue-700 text-white 
                            ${isSubmitting ? 'cursor-not-allowed bg-opacity-60' : 'hover:bg-blue-600'}
                        `}
                    >
                        {isSubmitting ? <span className="animate-pulse flex items-center gap-2 justify-center"> <Loader2 className="animate-spin"/> Authenticating...</span> : 'Login'}
                    </button>
                </Form>
            )}
        </Formik>
        
        <p>Have no account? <Link href={'/auth/signup'} className="text-blue-800 hover:underline">sign up</Link></p>
    </div>
    </div>
  )
}

export default LoginPage