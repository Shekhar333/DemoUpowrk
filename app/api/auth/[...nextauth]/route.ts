import { authOptions } from "@/app/lib/auth";
import NextAuth from "next-auth/next";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
