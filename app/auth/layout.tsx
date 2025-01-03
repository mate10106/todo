import LogoNav from "@/components/LogoNav";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div suppressHydrationWarning>
      <LogoNav />
      <main>{children}</main>
    </div>
  );
}
