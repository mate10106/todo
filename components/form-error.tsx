import { FormMessageProps } from "@/types";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const FormError = ({ message }: FormMessageProps) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};
