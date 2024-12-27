import LogoNav from "@/components/LogoNav";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        <LogoNav />
        {children}
      </body>
    </html>
  );
}
