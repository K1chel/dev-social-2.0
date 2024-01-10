import { Button } from "@/components/ui/button";
import { Github, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "./user-menu";
import useLogout from "@/hooks/use-logout";
import { TopLoader } from "@/components/loaders/top-loader";
import { SearchBar } from "@/components/shared/search-bar";
import { MobileSidebar } from "@/components/shared/mobile-sidebar";

export const Navbar = () => {
  const { handleLogout, isLoading } = useLogout();

  return (
    <>
      {isLoading && <TopLoader />}
      <div className="flex items-center h-full justify-between px-4 md:px-6">
        <section className="hidden md:block">
          <SearchBar />
        </section>
        <section className="flex md:hidden items-center gap-x-2">
          <MobileSidebar />
          <Button size="icon" variant="ghost">
            <Search />
          </Button>
        </section>
        <section className="flex items-center gap-x-3">
          <Link to="https://github.com/K1chel/dev-social-2.0" target="_blank">
            <Button size="icon" variant="outline">
              <Github className="w-5 h-5" />
            </Button>
          </Link>
          <ModeToggle />
          <UserMenu handleLogout={handleLogout} />
        </section>
      </div>
    </>
  );
};
