import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 h-full w-full">
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
      </div>
    </div>
  );
};
