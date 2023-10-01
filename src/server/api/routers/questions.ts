import { questions } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionRouter = createTRPCRouter({
  //get all questions
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Get all questions
    return ctx.db.select().from(questions);
  }),
  createQuestion: publicProcedure
    .input(
      z.object({
        question: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(questions).values({
        question: input.question,
      });
    }),

  updateQuestion: publicProcedure
    .input(
      z.object({
        question: z.string(),
        qid: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(questions)
        .set({ question: input.question })
        .where(eq(questions.qid, input.qid));
    }),

  deleteQuestion: publicProcedure
    .input(
      z.object({
        qid: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(questions).where(eq(questions.qid, input.qid));
    }),
})