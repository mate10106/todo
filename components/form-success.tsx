import { FormMessageProps } from "@/types";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export const FormSuccess = ({ message }: FormMessageProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};
