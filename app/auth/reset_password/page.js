'use client'

import { resetPassword } from "@/actions/auth/resetPassword"
import Logo from "@/components/general/Logo"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

const ResetPasswordPage = () => {
    const router = useRouter()
    const [accessToken, setAccessToken] = useState(null)

    // Form validation schema
    const validationSchema = Yup.object().shape({
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
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    // Extract access token from the URL hash 
    useEffect(() => {
        if (typeof window !== "undefined") {
            const hash = window.location.hash.substring(1)
            const params = new URLSearchParams(hash)
            const token = params.get("access_token")
            if (token) {
                setAccessToken(token)
            }
        }
    }, [])

    // Handle reset password request
    const handleResetPassword = async (values, { setSubmitting }) => {
        try {
            if (!accessToken) {
                toast.error('Invalid or missing access token.')
                setSubmitting(false)
                return
            }
            
            // Call the reset password function with the new password and access token
            const res = await resetPassword(values.password, accessToken)

            if (res.error) {
                toast.error(res.error)
            } else {
                console.log(res.message)
                toast.success(res.message)
                router.push('/auth/login')
            }
        } catch (error) {
            console.log('Error resetting password:', error)
            toast.error('Error resetting password.')
        } finally{
            setSubmitting(false)
        }
    }

  return (
    <div className="h-screen flex">
    <div className="m-auto max-w-[400px] w-[80%] -translate-y-4 p-6 rounded-lg">
        <Logo/>
        <p className="text-center font-semibold text-gray-400 text-[17px] mb-4">Almost there, reset your password.</p>
        <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleResetPassword}
        >
            {({ isSubmitting, touched, errors }) => (
                <Form className="flex flex-col gap-2 mb-3">
                    <Field
                        type="password"
                        name="password"
                        placeholder="Enter new password..."
                        className={`rounded-md focus:border focus:border-gray-400 ${touched.password && errors.password ? 'border-red-500' : ''}`}
                    />
                    <ErrorMessage name="password" render={msg => (
                        <div className="text-red-500 text-sm whitespace-pre-line">
                            {msg}
                        </div>
                    )} className="text-red-500 text-sm" />
                    <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password..."
                        className={`rounded-md focus:border focus:border-gray-400 ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className={`bg-blue-700 text-white ${isSubmitting ? 'cursor-not-allowed bg-opacity-60' : 'hover:bg-blue-600'}`}
                    >
                        {isSubmitting ? <span className="animate-pulse flex items-center gap-2 justify-center"> <Loader2 className="animate-spin"/> Resetting...</span> : 'Reset password'}
                    </button>
                </Form>
            )}
        </Formik>
    </div>
    </div>
  )
}

export default ResetPasswordPage