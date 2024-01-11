import { Loader } from "@/components/loaders/loader";
import { UserProfileHeader } from "@/components/user/user-profile-header";
import { BASE_URL } from "@/lib/config";
import { IUser } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const UserProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({} as IUser);

  const navigate = useNavigate();

  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          navigate("/");
          toast.error(data.error);
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
    fetchUser();
  }, [username, navigate, user]);

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto h-full py-5 px-4 md:px-6 xl:px-8 relative w-full">
      <UserProfileHeader user={user} />
    </div>
  );
};
