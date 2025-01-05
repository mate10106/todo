import { User } from "@auth/core/types";
import { JWT } from "@auth/core/jwt";

declare type authChildrenProps = {
  children: React.ReactNode;
};

declare type MobileNavbarProps = {
  isAuthenticated: boolean;
  isSubscribed: boolean;
};

declare type LoginButtonProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

declare type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  titleLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
};

declare type HeaderProps = {
  label: string;
  title: string;
};

declare type BackButtonProps = {
  label: string;
  href: string;
};

declare type FormMessageProps = {
  message?: string;
};

declare module "@auth/core/types" {
  interface User {
    id: string;
    email: string;
    role: "ADMIN" | "USER";
  }

  interface Session {
    user: User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    sub: string;
    role: "ADMIN" | "USER";
  }
}

interface Todo {
  id: string;
  userId: string;
  title: string;
  deadline: Date;
  comments: string;
  category: string | null;
  priority: string;
  completed: boolean;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface NavLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  href: string;
}

interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

interface todoStatsProps {
  totalTasks: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

interface EditProfileFormContentProps {
  closeModal: () => void;
  urlError?: string;
}

interface LoginFormContentProps {
  token: string;
  urlError?: string;
}
