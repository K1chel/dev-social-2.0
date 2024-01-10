import { Menu } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const matches = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (matches) {
      setIsOpen(false);
    }
  }, [matches]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button size="icon" variant="ghost" asChild className="p-2">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        {/* TODO: onClick on item close sidebar!! */}
        <Sidebar isMobile />
      </SheetContent>
    </Sheet>
  );
};
