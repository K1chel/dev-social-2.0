import { IUser } from "@/types";
import { Navigate, Outlet } from "react-router-dom";

interface UserInterface {
  user: IUser | null;
}

export const PublicLayout = ({ user }: UserInterface) => {
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <div className="fixed h-full w-full dark:bg-slate-950 bg-gray-300 inset-0 z-1">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
            <main className="h-screen max-h-screen relative z-30 flex items-center justify-center w-full md:max-w-2xl mx-auto px-4">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  );
};
