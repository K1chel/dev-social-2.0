import { BarLoader } from "react-spinners";

export const TopLoader = () => {
  return (
    <div className="w-full fixed top-0 h-2 inset-x-0">
      <BarLoader color="gray" width="100%" />
    </div>
  );
};
