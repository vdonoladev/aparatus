"use client";

import { Button } from "./ui/button";

interface CopyPhoneButtonProps {
  phone: string;
}

const CopyPhoneButton = ({ phone }: CopyPhoneButtonProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
    } catch (error) {
      console.error("Failed to copy phone:", error);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      className="rounded-full px-4 py-2 text-sm font-bold leading-[1.4]"
    >
      Copiar
    </Button>
  );
};

export default CopyPhoneButton;

