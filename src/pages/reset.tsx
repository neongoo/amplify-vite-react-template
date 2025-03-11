import { Link, useLocation, Navigate } from 'react-router-dom';
import { ResetPasswordForm } from '../components/auth/reset-password-form';

export const ResetPassword = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const hasEmail = params.has("email");

    // If no email parameter is provided, redirect to forgot password page
    if (!hasEmail) {
        return <Navigate to="/forgot-password" replace />;
    }

    return (
        <div className="flex flex-col items-start max-w-sm mx-auto h-dvh overflow-hidden pt-4 md:pt-20">
            <div className="flex items-center w-full py-8 border-b border-border/80">
                <Link to="/" className="flex items-center gap-x-2">
                    <h1 className="text-lg font-medium">Amplify Auth</h1>
                </Link>
            </div>
            <ResetPasswordForm />
            <div className="w-full text-center mt-4">
                <Link to="/sign-in" className="text-sm text-primary">
                    Back to Sign In
                </Link>
            </div>
        </div>
    );
};
