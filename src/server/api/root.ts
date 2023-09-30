import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { programRouter } from "./routers/programs";
import { surveyRouter } from "./routers/survey";
import { smsRouter } from "./routers/sms";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  programs: programRouter,
  survey: surveyRouter,
  sms: smsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
