import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, MessageSquare, UserRound, Settings, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MainNav = () => {
  const isMobile = useIsMobile();

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
            <li>
              <Link
                to="/settings"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                Settings
              </Link>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link to="/messages" className={navigationMenuTriggerStyle()}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link to="/settings" className={navigationMenuTriggerStyle()}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
      </NavigationMenuItem>
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
          <Link to="/settings" className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
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
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationItems />
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
    </div>
  );
};

export default MainNav;