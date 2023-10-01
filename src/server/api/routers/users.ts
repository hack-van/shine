import {
  programsToQuestions,
  users,
  usersToPrograms,
} from "@/server/db/schema";

import { userSchema } from "@/components/user/AddForm";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getUserToPrograms: publicProcedure
  .input(z.object({id:z.number()}))
  .query(async ({ ctx, input}) => {
    const result = await ctx.db
      .select()
      .from(usersToPrograms)
      .where(eq(usersToPrograms.uid, input.id));
    return result;  
  }),
  getById: publicProcedure
  .input(z.object({ id: z.number() }))
  .query(async ({ ctx, input }) => {
    // Get program by id
    const result = await ctx.db
      .select()
      .from(users)
      .limit(1)
      .where(eq(users.uid, input.id));
    return result.at(0);
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Get all users
    return ctx.db.select().from(users);
  }),
  createOne: publicProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.db.insert(users).values({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          role: "worker",
          phoneNumber: input.phoneNumber,
        });
        return result;
      } catch (error) {
        console.error("Error creating one:", error);
        throw error;
      }
    }),
  createOneWithPrograms: publicProcedure
    .input(z.object({ field: userSchema, program_ids: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.db
          .insert(users)
          .values({
            firstName: input.field.firstName,
            lastName: input.field.lastName,
            email: input.field.email,
            role: "worker",
            phoneNumber: input.field.phoneNumber,
          })
          .returning({ uid: users.uid });

        const uid = result.at(0)?.uid;
        if (!uid) throw new Error("Cannot insert user");
        await ctx.db
          .insert(usersToPrograms)
          .values(input.program_ids.map((pid) => ({ uid, pid })));
      } catch (error) {
        console.error("Error creating one:", error);
        throw error;
      }
    }),
});
