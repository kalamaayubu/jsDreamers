'use client'

import Link from "next/link";
import { toast } from "react-toastify";
import ContinueWithGoogle from "@/components/client/ContinueWithGoogle";
import ContinueWithGithub from "@/components/client/ContinueWithGithub";
import Logo from "@/components/general/Logo";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Loader2 } from "lucide-react"


const SignupPage = () => {
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
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: values.email, password: values.password }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error);

            toast.success(result.message)
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(`${error.message}`)
        } finally {
            setSubmitting(false)
        }
    };

    return (
        <div className="h-screen flex">
            <div className="m-auto max-w-[450px] w-[80%] -translate-y-4 p-6 rounded-lg">
                <Logo/>
                <p className="text-center text-gray-600 text-[17px] mb-4">Register a new account to get started.</p>
                <div className="flex flex-col w-full lg:items-center gap-3">
                    <ContinueWithGoogle/>
                    <ContinueWithGithub/>
                </div>
                <div className="my-4 text-gray-400 flex justify-center">
                   <p>OR register with email and password</p>
                </div>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
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

                            <button 
                                disabled={isSubmitting} 
                                className={`bg-blue-700 text-white 
                                    ${isSubmitting ? 'cursor-not-allowed bg-opacity-60' : 'hover:bg-blue-600'}
                                `}
                            >
                                {isSubmitting ? <span className="animate-pulse flex items-center gap-2 justify-center"> <Loader2 className="animate-spin"/> Submitting...</span> : 'Signup'}
                            </button>
                        </Form>
                    )}
                </Formik>
                
                <p>
                    Already have an account? <Link href={"/auth/login"} className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
