import { users } from "@/server/db/schema";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { userSchema } from "@/components/user/AddForm";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      // Get all users
      return ctx.db.select().from(users)
    }),
    createOne: publicProcedure.input(userSchema).mutation(async ({ctx, input}) => {
      try {
        const result = await ctx.db.insert(users).values(input)
        return result;
      } catch (error) {
        console.error("Error creating one:", error);
        throw error;
      }
    })
})