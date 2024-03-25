import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    hasAccess: boolean;
  }
  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    email: string;
    hasAccess: boolean;
  }
}
