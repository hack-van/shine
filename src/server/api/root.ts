import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { programRouter } from "./routers/programs";
import { surveyRouter } from "./routers/survey";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  programs: programRouter,
  survey: surveyRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
