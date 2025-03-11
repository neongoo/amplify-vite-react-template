import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LoaderIcon, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { confirmResetPassword, resetPassword } from "aws-amplify/auth";
import { useNavigate, useLocation } from "react-router-dom";

export const ResetPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy email từ URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const emailParam = params.get("email");
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [location]);

    // Gửi lại mã xác thực
    const handleResendCode = async () => {
        if (!email) {
            toast.error("Email is required!");
            return;
        }

        setIsResending(true);
        try {
            await resetPassword({ username: email });
            toast.success("New verification code sent!");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to resend code");
        } finally {
            setIsResending(false);
        }
    };

    // Kiểm tra mật khẩu có hợp lệ không
    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    // Xử lý đặt lại mật khẩu
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !code || !newPassword || !confirmPassword) {
            toast.error("All fields are required!");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!validatePassword(newPassword)) {
            toast.error("Password must be at least 8 characters and include uppercase, lowercase, and numbers");
            return;
        }

        setIsLoading(true);
        try {
            await confirmResetPassword({
                username: email,
                confirmationCode: code,
                newPassword
            });
            toast.success("Password reset successful!");
            navigate("/sign-in");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Reset password failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start gap-y-6 py-8 w-full px-0.5">
            <h2 className="text-2xl font-semibold">Reset Password</h2>

            <form onSubmit={handleResetPassword} className="w-full">
                <div className="space-y-2 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        disabled={true}
                        className="w-full bg-muted"
                    />
                </div>

                <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="code">Verification Code</Label>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleResendCode}
                            disabled={isResending}
                            className="h-8 px-2 text-xs"
                        >
                            {isResending ? (
                                <LoaderIcon className="w-3 h-3 mr-1 animate-spin" />
                            ) : (
                                <RefreshCw className="w-3 h-3 mr-1" />
                            )}
                            Resend Code
                        </Button>
                    </div>
                    <Input
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter the code sent to your email"
                        className="w-full"
                    />
                </div>

                <div className="mt-4 space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                        Password must be at least 8 characters and include uppercase, lowercase, and numbers
                    </p>
                </div>

                <div className="mt-4 space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full"
                    />
                </div>

                <div className="mt-4 w-full">
                    <Button type="submit" variant="blue" disabled={isLoading} className="w-full">
                        {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Reset Password"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
