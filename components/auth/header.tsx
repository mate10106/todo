import { HeaderProps } from "@/types";

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className="text-4xl font-semibold text-white font-serif">
        To-do App
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
