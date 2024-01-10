import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="fixed inset-0 w-full h-screen">
      <div className="flex items-center justify-center flex-col h-full gap-y-3">
        <div className="flex items-center gap-x-3">
          <span className="text-5xl font-bold">404</span>
          <span className="text-2xl font-semibold">Page not found</span>
        </div>
        <Link to="/">
          <Button className="relative group">
            <ArrowLeft className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:-translate-x-2 mr-1.5 transition-all" />
            Go back
          </Button>
        </Link>
      </div>
    </div>
  );
};
