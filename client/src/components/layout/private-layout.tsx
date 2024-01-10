import { Navigate, Outlet } from "react-router-dom";

import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { Footer } from "@/components/shared/footer";

import { IUser } from "@/types";

interface UserInterface {
  user: IUser | null;
}

export const PrivateLayout = ({ user }: UserInterface) => {
  return (
    <>
      {user ? (
        <div className="flex flex-col min-h-screen">
          <nav className="fixed top-0 md:pl-20 xl:pl-56 w-full border-b h-20 bg-background z-30">
            <Navbar />
          </nav>
          <aside className="fixed top-0 hidden md:block w-0 md:w-20 xl:w-56 border-r z-30 bg-background h-full">
            <Sidebar />
          </aside>
          <main className="flex flex-1 w-full md:pl-20 xl:pl-56 pt-20">
            <Outlet />
          </main>
          <footer className="w-full md:pl-20 xl:pl-56 pt-20">
            <Footer />
          </footer>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
