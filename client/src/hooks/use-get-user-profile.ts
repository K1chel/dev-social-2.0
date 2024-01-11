import { IUser } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const useGetUserProfile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { username } = useParams<{ username: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          toast.error("User not found");
          navigate("/");
          return;
        }

        setUser(data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [username, navigate]);

  return { user, isLoading };
};

export default useGetUserProfile;
