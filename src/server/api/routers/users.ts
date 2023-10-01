import { users } from "@/server/db/schema";

import { userSchema } from "@/components/user/AddForm";
import { createTRPCRouter, publicProcedure } from "../trpc";


export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      // Get all users
      return ctx.db.select().from(users)
    }),
  createOne: publicProcedure.input(userSchema).mutation(async ({ ctx, input }) => {
    try {
      const result = await ctx.db.insert(users).values({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        role: "worker",
        phoneNumber: input.phoneNumber,
      })
      return result;
    } catch (error) {
      console.error("Error creating one:", error);
      throw error;
    }
  })
})