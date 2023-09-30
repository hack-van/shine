import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getSurveyInfo } from "@/server/db/query";
import { questions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const surveyRouter = createTRPCRouter({
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

  getQuestions: publicProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.select().from(questions);
  }),
});
