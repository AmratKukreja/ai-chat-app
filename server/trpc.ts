import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { createClient } from "@/lib/supabase/server";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  try {
    // Check if Supabase credentials are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("❌ Supabase credentials not found in environment variables!");
      console.error("Please create a .env.local file with:");
      console.error("NEXT_PUBLIC_SUPABASE_URL=your_supabase_url");
      console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key");
    }

    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting user:", error.message);
    }

    return {
      supabase,
      user,
      ...opts,
    };
  } catch (error) {
    console.error("Error creating tRPC context:", error);
    throw error;
  }
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

