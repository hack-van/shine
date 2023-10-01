import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  uuid
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

type Role = "worker" | "admin";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const myPgTable = pgTableCreator((name) => `shine_${name}`);

export const users = myPgTable("user", {
  uid: serial("uid").primaryKey(),
  id: uuid("uuid").notNull().defaultRandom(),
  name: varchar("name"),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 10 })
    .$type<Role>()
    .notNull()
    .default("worker"),
  hashPassword: varchar("hashPassword", { length: 255 }),
  phoneNumber: varchar("phoneNumber", { length: 10 }).notNull().default("")
});

export const programs = myPgTable("program", {
  pid: serial("pid").primaryKey(),
  description: varchar("description", { length: 255 }),
  name: varchar("name", { length: 255 }),
  location: varchar("location").notNull(),
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
    uid: integer("uid")
      .notNull()
      .references(() => users.uid),
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
      references: [users.uid],
    }),
  }),
);

export const accounts = myPgTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.uid] }),
}));

export const sessions = myPgTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.uid] }),
}));

export const verificationTokens = myPgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const answers = myPgTable("answer", {
  aid: serial("aid").primaryKey(),
  content: integer("content").notNull(),
  pid: integer("pid").notNull(),
  uid: integer("uid").notNull(),
  qid: integer("qid").notNull(),
  recoredAt: timestamp("recoredAt").notNull().defaultNow(),
});

export const answersRelations = relations(answers, ({ one }) => ({
  user: one(users, { fields: [answers.uid], references: [users.uid] }),
  program: one(programs, { fields: [answers.pid], references: [programs.pid] }),
  question: one(questions, {
    fields: [answers.qid],
    references: [questions.qid],
  }),
}));
