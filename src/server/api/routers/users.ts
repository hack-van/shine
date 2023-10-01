import { users } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      // Get all users
      return ctx.db.select().from(users)
    }),
})