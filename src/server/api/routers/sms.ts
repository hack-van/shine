import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import Twilio from "twilio";
import { env } from "@/env.mjs";
import { users } from "@/server/db/schema";

export const smsRouter = createTRPCRouter({
  sendSms: publicProcedure.query(async ({ ctx }) => {
    const userData = await ctx.db.select().from(users);

    const client = Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

    userData.forEach((user) => {
      client.messages.create({
        body: `Hey ${
          user.firstName
        }, This is is a reminder from Youth Unlimited to fill out the survey at: ${
          process.env.NODE_ENV === "production" ? "https://" : ""
        }${env.NEXTAUTH_URL}/survey/${user.uid}`,
        from: "+17128833461",
        to: user.phoneNumber,
      });
    });

    return;
  }),
});
