import { HomePage } from "@/pages/home-page";
import { LoginPage } from "@/pages/login-page";
import { RegisterPage } from "@/pages/register-page";
import { UserProfilePage } from "@/pages/user-profile-page";

export const publicRoutes = [
  {
    path: "/login",
    element: LoginPage,
  },
  {
    path: "/register",
    element: RegisterPage,
  },
];

export const privateRoutes = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/profile/:username",
    element: UserProfilePage,
  },
];
