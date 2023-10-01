import { answers, programs, programsToQuestions, questions, tokens, usersToPrograms } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const surveyRouter = createTRPCRouter({
  getUserIdfromToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const questionsResult = await ctx.db.select({ uid: tokens.uid }).from(tokens)
        .where(eq(tokens.token, input.token));
      return questionsResult.at(0);
    }),
  getQuestionsByProgramId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const questionsResult = await ctx.db.select({ questions }).from(questions)
        .leftJoin(programsToQuestions, eq(programsToQuestions.qid, questions.qid))
        .where(eq(programsToQuestions.pid, input.id));
      return {
        questions: questionsResult.map(q => q.questions)
      }
    }),
  getProgramsByUserId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const programsResult = await ctx.db.select({ programs }).from(programs)
        .leftJoin(usersToPrograms, eq(usersToPrograms.pid, programs.pid))
        .where(eq(usersToPrograms.uid, input.id));
      return {
        programs: programsResult.map(p => p.programs)
      }
    }),
  postAnswer: publicProcedure
    .input(z.array(z.object({ pid: z.number(), qid: z.number(), uid: z.number(), content: z.number() })))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(answers).values(input);
    }),
})
