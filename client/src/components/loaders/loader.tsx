import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="absolute w-full inset-0 h-screen md:pl-20 xl:pl-56">
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
      </div>
    </div>
  );
};
