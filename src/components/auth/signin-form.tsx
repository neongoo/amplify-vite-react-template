import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { toast } from "sonner";
import { Label } from "../ui/label";
import { signIn } from "aws-amplify/auth";

const SignInForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and password are required!");
            return;
        }

        setIsLoading(true);

        try {
            const { isSignedIn, nextStep } = await signIn({ username: email, password });

            if (isSignedIn) {
                toast.success("Login successful!");
                navigate("/"); 
            } else {
                toast.warning(`Next step: ${nextStep?.signInStep}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Sign-in failed";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start gap-y-6 py-8 w-full px-0.5">
            <h2 className="text-2xl font-semibold">Sign in to Amplify Auth</h2>

            <form onSubmit={handleSignIn} className="w-full">
                <div className="space-y-2 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        disabled={isLoading}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full focus-visible:border-foreground"
                    />
                </div>
                <div className="mt-4 space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative w-full">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full focus-visible:border-foreground"
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            disabled={isLoading}
                            className="absolute top-1 right-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <Button type="submit" variant="blue" disabled={isLoading} className="w-full">
                        {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Sign in"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
