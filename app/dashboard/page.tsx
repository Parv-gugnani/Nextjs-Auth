"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  email: string;
  id: number;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/verify", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Set the user data
      } else {
        setError("Unauthorized. Redirecting...");
        setTimeout(() => router.push("/login"), 2000); // Redirect after 2 seconds
      }
    };

    fetchUser();
  }, [router]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
        <p className="mt-2">Hello, {user.email}!</p>
        <button
          onClick={() => {
            document.cookie = "auth_token=; Max-Age=0"; // Clear the auth token
            router.push("/login");
          }}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}