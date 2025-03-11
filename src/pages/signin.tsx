
import { Link } from 'react-router-dom'
import SignInForm from '../components/auth/signin-form'

export const SignIn = () => {
    return (
        <div className="flex flex-col items-start max-w-sm mx-auto h-dvh overflow-hidden pt-4 md:pt-20">
            <div className="flex items-center w-full py-8 border-b border-border/80">
                <Link to="/" className="flex items-center gap-x-2">
                   
                    <h1 className="text-lg font-medium">
                        Amplify Auth
                    </h1>
                </Link>
            </div>

            <SignInForm />

            <div className="w-full text-center">
                <Link to="/forgot-password" className="text-sm text-primary">
                    Forgot password?
                </Link>
            </div>

            <div className="flex flex-col items-start w-full mt-4">
                <p className="text-sm text-muted-foreground">
                    By signing in, you agree to our{" "}
                    <Link to="/terms" className="text-primary">
                        Terms of Service{" "}
                    </Link>
                    and{" "}
                    <Link to="/privacy" className="text-primary">
                        Privacy Policy
                    </Link>
                </p>
            </div>
            <div className="flex items-start mt-auto border-t border-border/80 py-6 w-full">
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link to="/sign-up" className="text-primary">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
