CREATE TABLE "app_settings" (
	"key" text PRIMARY KEY,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"category" text NOT NULL,
	"subcategory" text DEFAULT '' NOT NULL,
	"description" text NOT NULL,
	"level" text DEFAULT 'Beginner' NOT NULL,
	"thumbnail" text DEFAULT '' NOT NULL,
	"lessons" jsonb DEFAULT '[]' NOT NULL,
	"lesson_count" integer DEFAULT 0 NOT NULL,
	"duration" text DEFAULT '' NOT NULL,
	"language" text DEFAULT 'Tamil & English' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dropout_cases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"student_id" uuid NOT NULL,
	"teacher_id" uuid NOT NULL,
	"reason" text NOT NULL,
	"remarks" text DEFAULT '' NOT NULL,
	"risk_level" text NOT NULL,
	"status" text DEFAULT 'Reported' NOT NULL,
	"intervention" text DEFAULT '' NOT NULL,
	"counselling_info" text DEFAULT '' NOT NULL,
	"follow_up_date" timestamp,
	"admin_notes" text DEFAULT '' NOT NULL,
	"is_resolved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"provider" text NOT NULL,
	"type" text NOT NULL,
	"description" text NOT NULL,
	"eligibility" text NOT NULL,
	"benefits" text NOT NULL,
	"documents" text[] DEFAULT '{}'::text[] NOT NULL,
	"application_procedure" text NOT NULL,
	"deadline" text DEFAULT 'Ongoing' NOT NULL,
	"application_link" text DEFAULT '' NOT NULL,
	"location" text DEFAULT 'Tamil Nadu' NOT NULL,
	"education_level" text[] DEFAULT '{}'::text[] NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"class" text NOT NULL,
	"school" text NOT NULL,
	"location" text NOT NULL,
	"district" text DEFAULT '' NOT NULL,
	"state" text DEFAULT 'Tamil Nadu' NOT NULL,
	"gender" text DEFAULT 'Male' NOT NULL,
	"guardian_name" text DEFAULT '' NOT NULL,
	"guardian_contact" text DEFAULT '' NOT NULL,
	"attendance_percentage" double precision DEFAULT 100 NOT NULL,
	"risk_level" text DEFAULT 'Low' NOT NULL,
	"education_status" text DEFAULT 'Active' NOT NULL,
	"teacher_id" uuid NOT NULL,
	"interests" text[] DEFAULT '{}'::text[] NOT NULL,
	"preferred_language" text DEFAULT 'Tamil' NOT NULL,
	"has_digital_access" boolean DEFAULT false NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"password" text NOT NULL,
	"role" text DEFAULT 'student' NOT NULL,
	"school" text DEFAULT '' NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "dropout_cases" ADD CONSTRAINT "dropout_cases_student_id_students_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "dropout_cases" ADD CONSTRAINT "dropout_cases_teacher_id_users_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_teacher_id_users_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE CASCADE;