import { Loader } from "@/components/loaders/loader";
import { UserPostSelector } from "@/components/posts/user-post-selector";
import { UserProfileHeader } from "@/components/user/user-profile-header";
import useGetUserProfile from "@/hooks/use-get-user-profile";
import { tabLinks } from "@/lib/constants";
import { useState } from "react";

export const UserProfilePage = () => {
  const [currentTab, setCurrentTab] = useState<"posts" | "liked" | "saved">(
    "posts"
  );

  const { isLoading, user } = useGetUserProfile();

  if (isLoading) return <Loader />;

  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-3xl mx-auto h-full py-5 px-4 md:px-6 xl:px-8 relative w-full">
      <UserProfileHeader user={user} />
      <div className="mt-5 w-full flex items-center justify-center">
        {tabLinks.map((tab) => (
          <UserPostSelector
            key={tab.value}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            tab={tab}
          />
        ))}
      </div>
    </div>
  );
};
