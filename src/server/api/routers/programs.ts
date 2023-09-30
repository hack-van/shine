import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getSurveyInfo } from "@/server/db/query";
import { programs, questions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const programsRouter = createTRPCRouter({
  createProgram: publicProcedure
    .input(
      z.object({
        description: z.string(),
        name: z.string(),
        time: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(programs).values({
        name: input.name,
        description: input.description,
        time: new Date(),
      });
    }),

  updateProgram: publicProcedure
    .input(
      z.object({
        description: z.string(),
        name: z.string(),
        time: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.update(programs).set({
        name: input.name,
        description: input.description,
        time: new Date(),
      });
    }),

  getPrograms: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(programs);
  }),
});
