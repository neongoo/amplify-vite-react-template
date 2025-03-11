import { NAV_LINKS } from "../constants";
import { Link } from "react-router-dom";
/* import Icons from "../global/icons"; */
import Wrapper from "./wrapper";
import { Button } from "./ui/button";
import MobileMenu from "./mobile-menu";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface AuthUser {
  username: string;
  userId: string;
  signInDetails?: {
    loginId?: string; 
  };
}

const Navbar = () => {

  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        console.log(currentUser)
      } catch (error) {
        setUser(null);
        console.log(error)
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="sticky top-0 w-full h-16 bg-background/80 backdrop-blur-sm z-50">
      <Wrapper className="h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              {/* <Icons.icon className="w-6" /> */}
              <span className="text-xl font-semibold hidden lg:block">
                Amplify Auth
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <li key={index} className="text-sm font-medium -1 link">
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{user.signInDetails?.loginId}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {/* <p className="font-medium">{user.username}</p> */}
                    <p className="text-xs text-gray-500">{user.signInDetails?.loginId}</p>
                  </div>
                  <DropdownMenuItem
                    className="text-red-600 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSignOut()}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/sign-in" className="hidden lg:block">
                <Button variant="blue">Sign In</Button>
              </Link>
            )}
            <MobileMenu />
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;
