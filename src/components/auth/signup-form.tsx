import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Label } from "../ui/label";
import { signUp, confirmSignUp } from 'aws-amplify/auth';



const SignUpForm = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("Full name, email, and password are required!");
            return;
        }

        setIsLoading(true);

        try {
            const { userId } = await signUp({
                username: email, 
                password,
                options: {
                    userAttributes: {
                        email,
                        fullname: name,
                    },
                },
            });

            toast.success(`Verification code has been sent to ${email}`);
            console.log("User registered:", userId);

            setIsVerifying(true);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Sign-up failed");
            }
            console.error("Error signing up:", error);
        }

        setIsLoading(false);
    };

    const handleVerifyEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!code) {
            toast.error("Verification code is required!");
            return;
        }

        setIsLoading(true);

        try {
            await confirmSignUp({ username: email, confirmationCode: code });

            toast.success("Verification successful! Redirecting...");
            navigate("/dashboard");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Verification failed");
            }
            console.error("Error confirming sign-up:", error);
        }

        setIsLoading(false);
    };

    return isVerifying ? (
        <div className="flex flex-col items-start w-full text-start gap-y-6 py-8 px-0.5">
            <h2 className="text-2xl font-semibold">Verify Account</h2>
            <p className="text-sm text-muted-foreground">
                Please enter the 6-digit verification code we sent to {email}.
            </p>
            <form onSubmit={handleVerifyEmail} className="w-full">
                <div className="space-y-2 w-full pl-0.5">
                    <Label htmlFor="code">Verification Code</Label>
                    <InputOTP
                        id="code"
                        name="code"
                        maxLength={6}
                        value={code}
                        disabled={isLoading}
                        onChange={(e) => setCode(e)}
                        className="pt-2"
                    >
                        <InputOTPGroup>
                            {[...Array(6)].map((_, i) => (
                                <InputOTPSlot key={i} index={i} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className="mt-4 w-full">
                    <Button type="submit" variant="blue" disabled={isLoading} className="w-full">
                        {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Confirm"}
                    </Button>
                </div>
            </form>
        </div>
    ) : (
        <div className="flex flex-col items-start gap-y-6 py-8 w-full px-0.5">
            <h2 className="text-2xl font-semibold">Create Account</h2>
            <form onSubmit={handleSignUp} className="w-full">
                <div className="space-y-2 w-full">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" />
                </div>
                <div className="mt-4 space-y-2 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </div>
                <div className="mt-4 space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative w-full">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                        <Button type="button" size="icon" variant="ghost" className="absolute top-1 right-1" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <Button type="submit" variant="blue" disabled={isLoading} className="w-full">
                        {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Sign Up"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
