import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { surveyRouter } from "./routers/survey";
import { questionsRouter } from "./routers/questions";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  survey: surveyRouter,
  question: questionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
