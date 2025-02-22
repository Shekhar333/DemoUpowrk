import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  console.log("session: ", session);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Protected Page</h1>
          <p className="text-gray-600 mb-4">
            Welcome {session.user?.email}! This is a protected page that can
            only be accessed by authenticated users.
          </p>
          <div className="flex space-x-4">
            <Button asChild>
              <Link href="/">Go to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/signout">Sign Out</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
