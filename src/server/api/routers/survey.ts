import { programs, programsToQuestions, questions, usersToPrograms } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const surveyRouter = createTRPCRouter({
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
})
