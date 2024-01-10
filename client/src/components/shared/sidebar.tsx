import { userAtom } from "@/atoms/user-atom";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/use-logout";
import { sidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Flame, LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { TopLoader } from "../loaders/top-loader";
import { SidebarLinkItem } from "./sidebar-link-item";
import { Dispatch, SetStateAction } from "react";

export const Sidebar = ({
  isMobile,
  setIsOpen,
}: {
  isMobile?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useRecoilValue(userAtom);

  const { handleLogout, isLoading } = useLogout();

  return (
    <>
      {isLoading && <TopLoader />}
      <div className={cn("flex h-full flex-col", isMobile && "pt-7")}>
        <section className="h-20 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-x-2">
            <Flame className="w-8 h-8" />
            <span
              className={cn(
                "hidden xl:block text-xl font-medium",
                isMobile && "flex"
              )}
            >
              DevSocial
            </span>
          </Link>
        </section>
        <section className="flex flex-1 flex-col mt-5 px-3 w-full gap-y-3">
          {sidebarLinks.map(({ href, icon, label }) => (
            <SidebarLinkItem
              key={href}
              href={href}
              icon={icon}
              label={label}
              isMobile={isMobile}
              setIsOpen={setIsOpen}
            />
          ))}
          <SidebarLinkItem
            href={`/profile/${user?.username}`}
            icon={User2}
            label={"Profile"}
            isMobile={isMobile}
            setIsOpen={setIsOpen}
          />
        </section>
        <section className="px-3 my-4">
          <Button
            className="w-full flex items-center gap-x-4 justify-start"
            variant="outline"
            onClick={handleLogout}
          >
            <LogOut />
            <p className={cn("hidden xl:block", isMobile && "flex")}>Logout</p>
          </Button>
        </section>
      </div>
    </>
  );
};
