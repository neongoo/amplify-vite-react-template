import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";
import { Toaster } from "./components/ui/sonner";
import { ForgotPassword } from "./pages/forgot";
import { ResetPassword } from "./pages/reset";

function App() {

  return (
    <>
      <Toaster toastOptions={{
        style: { fontFamily: "Poppins, sans-serif" }
      }} position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
