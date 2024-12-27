import ProfileComponents from "@/components/ProfileComponents";
import { SessionProvider } from "next-auth/react";

const ProfilePage = () => {
  return (
    <section>
      <SessionProvider>
        <ProfileComponents />
      </SessionProvider>
    </section>
  );
};

export default ProfilePage;
