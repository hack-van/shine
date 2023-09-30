import { questions } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionRouter = createTRPCRouter({
  //get all questions
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      // Get all questions
      return ctx.db.select().from(questions)
    }),
})