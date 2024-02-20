import { api } from "@/utils/api";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../server/api/trpc";
import Twilio from "twilio";
import { env } from "@/env.mjs";
import { users } from "@/server/db/schema";
import { db } from "@/server/db";
import { ne } from "drizzle-orm";
const { Vonage } = require("@vonage/server-sdk");

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const userData = await db.select().from(users);

//   const client = Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

//   userData.forEach((user) => {
//     if (user.phoneNumber) {
//       client.messages.create({
//         body: `Hey ${
//           user.firstName
//         }, This is is a reminder from Youth Unlimited to fill out the survey at: ${
//           process.env.NODE_ENV === "production" ? "https://" : ""
//         }${env.NEXTAUTH_URL}/survey/${user.uid}`,
//         from: "+17128833461",
//         to: `${user.phoneNumber}`,
//       });
//     }
//   });

//   res.json("Success");
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const vonage = new Vonage({
    apiKey: env.VONAGE_API_KEY,
    apiSecret: env.VONAGE_API_SECRET,
  });

  const from = "13655400773";
  const to = "16045616250";
  const text = "This is coming from an application";

  try {
    const resp = await vonage.sms.send({ to, from, text });

    console.log("Message delivered successfully with response: ", resp);
  } catch (error) {
    console.log(error);
  }
};
