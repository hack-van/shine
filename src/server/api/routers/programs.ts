import { programs } from "@/server/db/schema/data";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const programRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // Get program by id
      const result = await ctx.db.select().from(programs).limit(1).where(eq(programs.pid, input.id))
      return result.at(0)
    }),
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      // Get all programs
      return ctx.db.select().from(programs)
    }),
})