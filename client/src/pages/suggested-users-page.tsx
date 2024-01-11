import { Loader } from "@/components/loaders/loader";
import { Button } from "@/components/ui/button";
import { UserSuggestedCard } from "@/components/user/user-suggested-card";
import { IUser } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ViewVariant = "ALL" | "SUGGESTED";

export const SuggestedUsersPage = () => {
  const [viewVariant, setViewVariant] = useState<ViewVariant>("ALL");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const res =
          viewVariant === "ALL"
            ? await fetch("/api/users/all-users")
            : await fetch("/api/users/suggested");
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
          return;
        }
        setUsers(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to get suggested users");
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [viewVariant]);

  return (
    <>
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-5">
        <div className="flex items-center justify-center gap-x-2 mt-5">
          <Button
            variant={viewVariant === "ALL" ? "secondary" : "outline"}
            onClick={() => setViewVariant("ALL")}
          >
            All Users
          </Button>
          <Button
            variant={viewVariant === "SUGGESTED" ? "secondary" : "outline"}
            onClick={() => setViewVariant("SUGGESTED")}
          >
            Suggested Users
          </Button>
        </div>
        <div className="mt-10 flex flex-col gap-y-4">
          {isLoading && <Loader />}
          {!isLoading &&
            users.length >= 1 &&
            users.map((user) => (
              <UserSuggestedCard key={user._id} user={user} />
            ))}
          {!isLoading && users.length === 0 && (
            <p className="text-center">No users found</p>
          )}
        </div>
      </div>
    </>
  );
};
