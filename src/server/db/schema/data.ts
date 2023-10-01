import { relations } from "drizzle-orm";
import { integer, primaryKey, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { myPgTable } from "./table";
import { accounts, users } from "./users";

export const programs = myPgTable("program", {
  pid: serial("pid").primaryKey(),
  description: varchar("description", { length: 255 }),
  name: varchar("name", { length: 255 }),
  time: timestamp("time").notNull(),
});

export const questions = myPgTable("question", {
  qid: serial("qid").primaryKey(),
  question: varchar("question", { length: 255 }),
});

export const programsToQuestions = myPgTable(
  "programs_to_questions",
  {
    pid: integer("pid")
      .notNull()
      .references(() => programs.pid),
    qid: integer("qid")
      .notNull()
      .references(() => questions.qid),
  },
  (t) => ({
    pk: primaryKey(t.pid, t.qid),
  }),
);

export const programsToQuestionsRelation = relations(
  programsToQuestions,
  ({ one }) => ({
    user: one(questions, {
      fields: [programsToQuestions.qid],
      references: [questions.qid],
    }),
    program: one(programs, {
      fields: [programsToQuestions.pid],
      references: [programs.pid],
    }),
  }),
);

export const questionRelations = relations(questions, ({ many }) => ({
  programs: many(programsToQuestions),
}));

export const answer = myPgTable("answer", {
  aid: serial("aid").primaryKey(),
  value: varchar("value", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  programs: many(usersToPrograms),
}));

export const programsRelations = relations(programs, ({ many }) => ({
  users: many(usersToPrograms),
  questions: many(programsToQuestions),
}));

export const usersToPrograms = myPgTable(
  "users_to_programs",
  {
    uid: uuid("uid")
      .notNull()
      .references(() => users.id),
    pid: integer("pid")
      .notNull()
      .references(() => programs.pid),
  },
  (t) => ({
    pk: primaryKey(t.uid, t.pid),
  }),
);

export const usersToProgramsRelation = relations(
  usersToPrograms,
  ({ one }) => ({
    user: one(programs, {
      fields: [usersToPrograms.pid],
      references: [programs.pid],
    }),
    program: one(users, {
      fields: [usersToPrograms.uid],
      references: [users.id],
    }),
  }),
);