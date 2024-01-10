import { userAtom } from "@/atoms/user-atom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setUser = useSetRecoilState(userAtom);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error || "Try again later");
        return;
      }

      setUser(null);
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleLogout };
};

export default useLogout;
