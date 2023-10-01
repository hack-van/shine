import { programs, programsToQuestions, questions } from "@/server/db/schema/data";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const surveyRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const infoResult = await ctx.db.select().from(programs).limit(1).where(eq(programs.pid, input.id))
      const questionsResult = await ctx.db.select({ questions }).from(questions)
        .leftJoin(programsToQuestions, eq(programsToQuestions.qid, questions.qid))
        .where(eq(programsToQuestions.pid, input.id));
      return {
        info: infoResult.at(0),
        questions: questionsResult.map(q => q.questions)
      }
    })
})
