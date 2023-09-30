import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import Twilio from "twilio";
import {env} from "@/env.mjs"

export const smsRouter = createTRPCRouter({
  sendSms: publicProcedure.input(z.object({
    formId: z.number(),
    phone: z.string(),
  })).mutation(({input}) => {
    const client = Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
    return client.messages
    .create({
      body: `Please fill out this form the link is ${process.env.NODE_ENV === "production" ? "https://" : ""}${env.NEXTAUTH_URL}/survey/${input.formId}`,
      from: '+17128833461',
      to: input.phone
    })
  })
});