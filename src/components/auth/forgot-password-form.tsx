import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { resetPassword } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Email is required!");
            return;
        }
        setIsLoading(true);
        try {
            await resetPassword({ username: email });
            toast.success("Verification code sent!");
            // Redirect to reset password page with email as parameter
            navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to send reset email");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start gap-y-6 py-8 w-full px-0.5">
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
            <form onSubmit={handleForgotPassword} className="w-full">
                <div className="space-y-2 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        disabled={isLoading}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full"
                    />
                </div>
                <div className="mt-4 w-full">
                    <Button type="submit" variant="blue" disabled={isLoading} className="w-full">
                        {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Send Reset Code"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
