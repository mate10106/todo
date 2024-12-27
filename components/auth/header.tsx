import { HeaderProps } from "@/types";

export const Header = ({ label, title }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className="text-4xl font-serif font-extrabold text-gray-800">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm text-blue-500">{label}</p>
    </div>
  );
};
