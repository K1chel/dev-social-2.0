import { useState } from "react";
import { toast } from "sonner";

const usePreviewImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImageUrl(reader.result as string);
        };

        reader.readAsDataURL(file);
      } else {
        toast.error("Please upload an image file.");
        setImageUrl(null);
      }
    } else {
      setImageUrl(null);
    }
  };

  return { imageUrl, setImageUrl, handleImageChange };
};

export default usePreviewImage;
