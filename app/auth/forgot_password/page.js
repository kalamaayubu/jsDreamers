'use client'

import { forgotPassword } from "@/actions/auth/forgotPassword"
import Logo from "@/components/general/Logo"
import Link from "next/link"
import { toast } from "react-toastify"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Loader2 } from "lucide-react"

const ForgotPasswordPage = () => {
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
    })

    // Send a forgot password request
    const handleClick = async (values, {setSubmitting}) => {
        try {
            const res = await forgotPassword(values.email)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success(res.message)
            }
        } catch (error) {
            console.log('Error:', error)
            toast.error(error)
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <div className="h-screen flex">
    <div className="m-auto max-w-[400px] w-[80%] -translate-y-4 sm:border sm:border-gray-200 p-6 rounded-lg">
        <Logo/>
        <p className="text-center text-gray-600 text-[17px] mb-4">Forgot password? Lets reset your password.</p>

        <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleClick}
        >
            {({ isSubmitting, touched, errors}) => (
                <Form className="flex flex-col gap-2 mb-3">
                    <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        className={`rounded-md focus:border focus:border-gray-400 ${touched.email && errors.email ? 'border-red-500' : ''}`}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className={`bg-blue-700 text-white ${isSubmitting ? 'cursor-not-allowed bg-opacity-60' : 'hover:bg-blue-600'}`}>
                        {isSubmitting 
                            ? <span className="animate-pulse flex items-center gap-2 justify-center"> <Loader2 className="animate-spin"/> Sending...</span> 
                            : 'Send request'
                        }
                    </button>
                </Form>
            )}
        </Formik>

        <p>Go back to <Link href={'/auth/login'} className="text-blue-800 hover:underline">login</Link></p>
    </div>
    </div>
  )
}

export default ForgotPasswordPage