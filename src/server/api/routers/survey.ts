import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { programs } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { getSurveyInfo } from "@/server/db/query";

export const surveyRouter = createTRPCRouter({
  getSurveyInfo: publicProcedure
    .input(
      z.object({
        pid: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return getSurveyInfo(input.pid);
    }),
});
