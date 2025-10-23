import { router, protectedProcedure } from "../trpc";

export const modelsRouter = router({
  getAvailable: protectedProcedure.query(async ({ ctx }) => {
    console.log("🔍 Fetching models from Supabase...");
    
    try {
      const { data: models, error } = await ctx.supabase
        .from("models")
        .select("*")
        .order("name");

      if (error) {
        console.error("❌ Error fetching models:", error);
        throw new Error(`Failed to fetch models: ${error.message}`);
      }

      if (!models || models.length === 0) {
        console.warn("⚠️ No models found in database. Did you run supabase-schema.sql?");
        return [];
      }

      console.log(`✅ Successfully fetched ${models.length} models`);
      return models;
    } catch (error: any) {
      console.error("❌ Exception in getAvailable:", error);
      throw new Error(error.message || "Failed to fetch models");
    }
  }),
});

