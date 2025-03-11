
import { Link } from 'react-router-dom'
import SignUpForm from '../components/auth/signup-form'

export const SignUp = () => {
    return (
        <div className="flex flex-col items-start max-w-sm mx-auto h-dvh overflow-hidden pt-4 md:pt-20">
            <div className="flex items-center w-full py-8 border-b border-border/80">
                <Link to="/" className="flex items-center gap-x-2">
                    <h1 className="text-lg font-medium">
                        Amplify Auth
                    </h1>
                </Link>
            </div>

            <SignUpForm />

            <div className="flex flex-col items-start w-full">
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
                    Already have an account?{" "}
                    <Link to="/sign-in" className="text-primary">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
