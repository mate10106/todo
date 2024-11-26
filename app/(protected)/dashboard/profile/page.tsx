import ProfileComponents from "@/components/ProfileComponents";
import { SessionProvider } from "next-auth/react";

const ProfilePage = () => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <SessionProvider>
        <ProfileComponents />
      </SessionProvider>
    </section>
  );
};

export default ProfilePage;
