import { relations, sql } from "drizzle-orm";
import {
  index,
  primaryKey,
  text,
  timestamp,
  varchar,
  pgTableCreator,
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const myPgTable = pgTableCreator((name) => `shine_${name}`);

type Role = "admin" | "worker";

export const users = myPgTable("user", {
  uid: serial("uid").primaryKey(),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 10 })
    .$type<Role>()
    .notNull()
    .default("worker"),
});

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
