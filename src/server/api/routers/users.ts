import { users } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      // Get all users
      return ctx.db.select().from(users)
    }),
  addOne: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Find a user
      const result = await ctx.db.select().from(users).where(eq(users.email, input.email));
      if (result.at(0)) {
        throw new TRPCError({
          message: "User already exists",
          code: "CONFLICT",
        })
      }

      const hashPassword = await bcrypt.hash(input.password, 10);
      return ctx.db.insert(users).values({
        email: input.email,
        hashPassword,
      })
    })
})