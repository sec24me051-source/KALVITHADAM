import {
  pgTable,
  uuid,
  text,
  integer,
  doublePrecision,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: text().notNull().default("student"),
  school: text().notNull().default(""),
  phone: text().notNull().default(""),
  isActive: boolean("is_active").notNull().default(true),
  ...timestamps,
});

export const students = pgTable("students", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  age: integer().notNull(),
  class: text("class").notNull(),
  school: text().notNull(),
  location: text().notNull(),
  district: text().notNull().default(""),
  state: text().notNull().default("Tamil Nadu"),
  gender: text().notNull().default("Male"),
  guardianName: text("guardian_name").notNull().default(""),
  guardianContact: text("guardian_contact").notNull().default(""),
  attendancePercentage: doublePrecision("attendance_percentage").notNull().default(100),
  riskLevel: text("risk_level").notNull().default("Low"),
  educationStatus: text("education_status").notNull().default("Active"),
  teacherId: uuid("teacher_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  interests: text().array().notNull().default([]),
  preferredLanguage: text("preferred_language").notNull().default("Tamil"),
  hasDigitalAccess: boolean("has_digital_access").notNull().default(false),
  notes: text().notNull().default(""),
  ...timestamps,
});

export const dropoutCases = pgTable("dropout_cases", {
  id: uuid().primaryKey().defaultRandom(),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  teacherId: uuid("teacher_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  reason: text().notNull(),
  remarks: text().notNull().default(""),
  riskLevel: text("risk_level").notNull(),
  status: text().notNull().default("Reported"),
  intervention: text().notNull().default(""),
  counsellingInfo: text("counselling_info").notNull().default(""),
  followUpDate: timestamp("follow_up_date"),
  adminNotes: text("admin_notes").notNull().default(""),
  isResolved: boolean("is_resolved").notNull().default(false),
  ...timestamps,
});

export const opportunities = pgTable("opportunities", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  provider: text().notNull(),
  type: text().notNull(),
  description: text().notNull(),
  eligibility: text().notNull(),
  benefits: text().notNull(),
  documents: text().array().notNull().default([]),
  applicationProcedure: text("application_procedure").notNull(),
  deadline: text().notNull().default("Ongoing"),
  applicationLink: text("application_link").notNull().default(""),
  location: text().notNull().default("Tamil Nadu"),
  educationLevel: text("education_level").array().notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  ...timestamps,
});

export const courses = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  category: text().notNull(),
  subcategory: text().notNull().default(""),
  description: text().notNull(),
  level: text().notNull().default("Beginner"),
  thumbnail: text().notNull().default(""),
  lessons: jsonb().notNull().default([]),
  lessonCount: integer("lesson_count").notNull().default(0),
  duration: text().notNull().default(""),
  language: text().notNull().default("Tamil & English"),
  isActive: boolean("is_active").notNull().default(true),
  tags: text().array().notNull().default([]),
  ...timestamps,
});

// Key/value store for app-level settings (e.g. a generated JWT signing secret)
export const appSettings = pgTable("app_settings", {
  key: text().primaryKey(),
  value: text().notNull(),
});
