import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchBar = () => {
  return (
    <div className="w-56 relative">
      <div className="absolute top-0 h-full w-8 flex items-center justify-center">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
      <Input placeholder="Search..." className="pl-8 pr-9" />
      <div className="absolute top-0 right-1 h-full w-8 flex items-center justify-center">
        <button className="text-[8px] bg-muted p-1 rounded-sm text-muted-foreground">
          ⌘K
        </button>
      </div>
    </div>
  );
};
