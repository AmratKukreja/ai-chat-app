import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export const chatRouter = router({
  send: protectedProcedure
    .input(
      z.object({
        modelTag: z.string(),
        prompt: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Save user message
      const { data: userMessage, error: userError } = await ctx.supabase
        .from("messages")
        .insert({
          user_id: ctx.user.id,
          model_tag: input.modelTag,
          role: "user",
          content: input.prompt,
        })
        .select()
        .single();

      if (userError || !userMessage) {
        throw new Error("Failed to save user message");
      }

      // Generate AI response
      let aiResponse: string;

      if (openai) {
        try {
          const completion = await openai.chat.completions.create({
            model: input.modelTag,
            messages: [{ role: "user", content: input.prompt }],
          });
          aiResponse = completion.choices[0]?.message?.content || "No response";
        } catch (error) {
          console.error("OpenAI API error:", error);
          aiResponse = `Error calling ${input.modelTag}. Using stub response instead: You said: "${input.prompt}"`;
        }
      } else {
        // Stub response when no API key
        aiResponse = `[${input.modelTag} stub] You said: "${input.prompt}"`;
      }

      // Save AI message
      const { data: assistantMessage, error: assistantError } =
        await ctx.supabase
          .from("messages")
          .insert({
            user_id: ctx.user.id,
            model_tag: input.modelTag,
            role: "assistant",
            content: aiResponse,
          })
          .select()
          .single();

      if (assistantError || !assistantMessage) {
        throw new Error("Failed to save assistant message");
      }

      return {
        userMessage,
        assistantMessage,
      };
    }),

  history: protectedProcedure
    .input(
      z.object({
        modelTag: z.string().optional(),
        limit: z.number().optional().default(50),
      })
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.supabase
        .from("messages")
        .select("*")
        .eq("user_id", ctx.user.id)
        .order("created_at", { ascending: true })
        .limit(input.limit);

      if (input.modelTag) {
        query = query.eq("model_tag", input.modelTag);
      }

      const { data: messages, error } = await query;

      if (error) {
        throw new Error("Failed to fetch chat history");
      }

      return messages;
    }),

  deleteMessage: protectedProcedure
    .input(z.object({ messageId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from("messages")
        .delete()
        .eq("id", input.messageId)
        .eq("user_id", ctx.user.id); // Ensure user can only delete their own messages

      if (error) {
        throw new Error("Failed to delete message");
      }

      return { success: true };
    }),
});

