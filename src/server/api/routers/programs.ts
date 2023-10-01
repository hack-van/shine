import { myPgTable, programs, programsRelations, programsToQuestions, programsToQuestionsRelation } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { programSchema } from "@/components/program/AddForm";


export const programRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // Get program by id
      const result = await ctx.db
        .select()
        .from(programs)
        .limit(1)
        .where(eq(programs.pid, input.id));
      return result.at(0);
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Get all programs
    return ctx.db.select().from(programs);
  }),
  // getAllWithQuestions: publicProcedure.query(async ({ ctx }) => {
    // Get all programs
    // return ((await ctx.db.select().from(programs)).join(questions, eq(users.id, )))  }),
  createOne: publicProcedure.input(programSchema).mutation(async ({ctx, input}) => {
    try {
      const result = await ctx.db.insert(programs).values(input).returning()
      return result;
    } catch (error) {
      console.error("Error creating one:", error);
      throw error;
    }
  }),
  createOneWithQuestions: publicProcedure.input(
    z.object({ field: programSchema,question_ids: z.array(z.number())})).mutation(async ({ctx, input}) => {
    try {
      const result = await ctx.db.insert(programs).values(input.field).returning({pid: programs.pid});
      const pid = result.at(0)?.pid;
      if (!pid) throw new Error("Cannot insert program")
      await ctx.db.insert(programsToQuestions).values(input.question_ids.map(qid => ({ pid, qid })))
    } catch (error) {
      console.error("Error creating one:", error);
      throw error;
    }
  })

  // linkProgramsToQuestions: publicProcedure.input(programsToQuestions).

    // sendSms: publicProcedure.input(z.object({
    //   formId: z.number(),
    //   phone: z.string(),
    // })).mutation(({input}) => {
    //   const client = Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
    //   return client.messages
    //   .create({
    //     body: `Please fill out this form the link is ${process.env.NODE_ENV === "production" ? "https://" : ""}${env.NEXTAUTH_URL}/survey/${input.formId}`,
    //     from: '+17128833461',
    //     to: input.phone
    //   })
    // })
});
