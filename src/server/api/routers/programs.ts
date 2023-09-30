import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { programs } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const programRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // Get program by id
      const result = await ctx.db.select().from(programs).limit(1).where(eq(programs.pid, input.id))
      return result.at(0)
    })
})