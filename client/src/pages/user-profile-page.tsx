import { Loader } from "@/components/loaders/loader";
import { UserProfileHeader } from "@/components/user/user-profile-header";
import useGetUserProfile from "@/hooks/use-get-user-profile";

export const UserProfilePage = () => {
  const { isLoading, user } = useGetUserProfile();

  if (isLoading) return <Loader />;

  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-3xl mx-auto h-full py-5 px-4 md:px-6 xl:px-8 relative w-full">
      <UserProfileHeader user={user} />
    </div>
  );
};
