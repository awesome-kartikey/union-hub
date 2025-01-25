import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, MessageSquare, UserRound, Settings, Menu, LogIn, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const MainNav = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check authentication status
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const AuthButtons = () => (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      ) : (
        <Link to="/auth">
          <Button variant="ghost">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );

  const NavigationItems = () => (
    <>
      <NavigationMenuItem>
        <Link to="/" className={navigationMenuTriggerStyle()}>
          <Home className="mr-2 h-4 w-4" />
          Home
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          <UserRound className="mr-2 h-4 w-4" />
          Profile
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[200px] gap-3 p-4">
            <li>
              <Link
                to="/profile"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                View Profile
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link
                  to="/settings"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Settings
                </Link>
              </li>
            )}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link to="/messages" className={navigationMenuTriggerStyle()}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </Link>
      </NavigationMenuItem>
      {isAuthenticated && (
        <NavigationMenuItem>
          <Link to="/settings" className={navigationMenuTriggerStyle()}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </NavigationMenuItem>
      )}
    </>
  );

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link to="/profile" className="flex items-center gap-2 text-lg font-semibold">
            <UserRound className="h-5 w-5" />
            View Profile
          </Link>
          <Link to="/messages" className="flex items-center gap-2 text-lg font-semibold">
            <MessageSquare className="h-5 w-5" />
            Messages
          </Link>
          {isAuthenticated && (
            <Link to="/settings" className="flex items-center gap-2 text-lg font-semibold">
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          )}
          <div className="mt-4">
            <AuthButtons />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {isMobile ? (
          <>
            <MobileMenu />
            <div className="flex-1 text-center">
              <Link to="/" className="text-xl font-semibold">
                Matrimony
              </Link>
            </div>
          </>
        ) : (
          <>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationItems />
              </NavigationMenuList>
            </NavigationMenu>
            <AuthButtons />
          </>
        )}
      </div>
    </div>
  );
};

export default MainNav;