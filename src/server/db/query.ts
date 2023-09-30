import { eq } from "drizzle-orm";
import { db } from "./index";
import { programs, programsToQuestions, questions } from "./schema";

export const getQuestionsByPid = (pid: number) => {
  return db
    .select()
    .from(programsToQuestions)
    .where(eq(programsToQuestions.pid, pid))
    .innerJoin(questions, eq(programsToQuestions.qid, questions.qid));
};

export const getPrograms = (pid: number) => {
  return db.select().from(programs).where(eq(programs.pid, pid));
};

export const getSurveyInfo = async (pid: number) => {
  return {
    questions: await getQuestionsByPid(pid),
    programs: await getPrograms(pid),
  };
};

const test = () => {
    
}
