import { Link } from 'react-router-dom';
import { ForgotPasswordForm } from '../components/auth/forgot-password-form';

export const ForgotPassword = () => {
    return (
        <div className="flex flex-col items-start max-w-sm mx-auto h-dvh overflow-hidden pt-4 md:pt-20">
            <div className="flex items-center w-full py-8 border-b border-border/80">
                <Link to="/" className="flex items-center gap-x-2">
                    <h1 className="text-lg font-medium">Amplify Auth</h1>
                </Link>
            </div>
            <ForgotPasswordForm />
            <div className="w-full text-center mt-4">
                <Link to="/sign-in" className="text-sm text-primary">
                    Back to Sign In
                </Link>
            </div>
        </div>
    );
};
