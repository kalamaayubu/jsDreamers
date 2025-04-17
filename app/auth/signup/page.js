'use client'

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import ContinueWithGoogle from "@/components/client/ContinueWithGoogle";
import ContinueWithGithub from "@/components/client/ContinueWithGithub";
import Image from "next/image";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error);

            toast.success(result.message)
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(`${error.message}`)
        } finally {
            setIsProcessing(false);
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="h-screen flex">
            <div className="m-auto max-w-[450px] w-[80%] -translate-y-4 border border-gray-200 p-6 rounded-lg">
                <div className="items-center flex justify-center mb-7">
                    <Image height={800} width={800} src="/assets/logo3D.png" alt="Svg" className="w-14" />
                    <p className="flex bg-gradient-to-br from-blue-700 from-20% via-purple-600 via-90% bg-clip-text text-transparent font-bold text-2xl">
                    &nbsp;&nbsp;&nbsp;jsDreamers
                    </p>
                </div>
                <p className="text-center font-semibold text-gray-400 text-[17px] mb-4">Register a new account to get started.</p>
                <div className="flex flex-col w-full lg:items-center gap-3 lg:flex-row ">
                    <ContinueWithGoogle/>
                    <ContinueWithGithub/>
                </div>
                <div className="my-4 text-gray-400 flex justify-center">
                   <p>OR register with email and password</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 m-auto mb-3">
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password..."
                        className="rounded-md focus:border focus:border-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`bg-blue-700 ${isProcessing ? "cursor-not-allowed bg-slate-500" : "hover:bg-blue-600"}`}
                    >
                        {isProcessing ? <span className="animate-pulse">Processing...</span> : "Signup"}
                    </button>
                </form>
                <p>
                    Already have an account? <Link href={"/auth/login"} className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
