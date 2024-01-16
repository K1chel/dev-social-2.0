import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface UserPostSelectorProps {
  tab: {
    label: string;
    value: string;
  };
  currentTab: "posts" | "liked" | "saved";
  setCurrentTab: React.Dispatch<
    React.SetStateAction<"posts" | "liked" | "saved">
  >;
}

export const UserPostSelector = ({
  tab,
  currentTab,
  setCurrentTab,
}: UserPostSelectorProps) => {
  return (
    <button
      className={cn(
        "text-muted-foreground/75 text-lg font-semibold flex-1 py-3 border-b",
        tab.value === currentTab && "border-primary border-b-2 text-primary"
      )}
      onClick={() => setCurrentTab(tab.value as "posts" | "liked" | "saved")}
    >
      {tab.label}
    </button>
  );
};
