import { Eye, EyeOff } from "lucide-react";
import { useCallback } from "react";

interface ShowPasswordProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowPassword = ({
  showPassword,
  setShowPassword,
}: ShowPasswordProps) => {
  const handleChangePasswordType = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, [setShowPassword]);

  return (
    <button
      className="show-password"
      type="button"
      onClick={handleChangePasswordType}
    >
      {showPassword ? (
        <Eye className="w-4 h-4" />
      ) : (
        <EyeOff className="w-4 h-4" />
      )}
    </button>
  );
};
