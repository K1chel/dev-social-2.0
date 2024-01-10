import { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarLinkItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isMobile?: boolean;
}

export const SidebarLinkItem = ({
  href,
  label,
  icon: Icon,
  isMobile,
}: SidebarLinkItemProps) => {
  const [activeMenu, setActiveMenu] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  const onNavigate = (href: string) => {
    navigate(href);
  };

  return (
    <div>
      <Button
        onClick={() => onNavigate(href)}
        variant={activeMenu === href ? "secondary" : "outline"}
        className="w-full flex items-center gap-x-4 justify-start group"
      >
        <Icon />
        <p className={cn("hidden xl:block", isMobile && "flex")}>{label}</p>
      </Button>
    </div>
  );
};
