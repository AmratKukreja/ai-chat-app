"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // User is authenticated, redirect to chat
        router.push("/chat");
      } else {
        // User is not authenticated, redirect to login
        router.push("/login");
      }
    };

    checkAuth();
  }, [router, supabase.auth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading...</div>
    </div>
  );
}
