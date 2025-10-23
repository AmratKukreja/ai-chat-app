import { router, protectedProcedure } from "../trpc";

export const modelsRouter = router({
  getAvailable: protectedProcedure.query(async ({ ctx }) => {
    const { data: models, error } = await ctx.supabase
      .from("models")
      .select("*")
      .order("name");

    if (error) {
      throw new Error("Failed to fetch models");
    }

    return models;
  }),
});

