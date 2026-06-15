import { sql } from '@payloadcms/db-postgres'
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`

    DO $$ BEGIN
      CREATE TYPE "public"."enum_projects_span" AS ENUM('8', '6', '4');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE TABLE IF NOT EXISTS "users" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "email" varchar NOT NULL,
      "reset_password_token" varchar,
      "reset_password_expiration" timestamp(3) with time zone,
      "salt" varchar,
      "hash" varchar,
      "login_attempts" numeric DEFAULT 0,
      "lock_until" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "users_sessions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "expires_at" timestamp(3) with time zone NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "media" (
      "id" serial PRIMARY KEY NOT NULL,
      "alt" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "url" varchar,
      "thumbnail_url" varchar,
      "filename" varchar,
      "mime_type" varchar,
      "filesize" numeric,
      "width" numeric,
      "height" numeric,
      "focal_x" numeric,
      "focal_y" numeric
    );

    CREATE TABLE IF NOT EXISTS "projects" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar,
      "has_detail" boolean DEFAULT false,
      "index" varchar NOT NULL,
      "type" varchar NOT NULL,
      "category" varchar NOT NULL,
      "description" varchar NOT NULL,
      "link" varchar,
      "link_text" varchar DEFAULT 'Case study',
      "year" varchar NOT NULL,
      "span" "enum_projects_span" NOT NULL,
      "thumb_label" varchar,
      "sort_order" numeric NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "projects_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "tag" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "projects_filter_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "tag" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
      "id" serial PRIMARY KEY NOT NULL,
      "global_slug" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "projects_id" integer,
      "users_id" integer,
      "media_id" integer
    );

    CREATE TABLE IF NOT EXISTS "payload_preferences" (
      "id" serial PRIMARY KEY NOT NULL,
      "key" varchar,
      "value" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "users_id" integer
    );

    CREATE TABLE IF NOT EXISTS "payload_migrations" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "batch" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "projects_tags" ADD CONSTRAINT "projects_tags_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "projects_filter_tags" ADD CONSTRAINT "projects_filter_tags_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "payload_locked_documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk"
      FOREIGN KEY ("projects_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk"
      FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk"
      FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk"
      FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
    CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
    CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" ("_order");
    CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
    CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects" ("created_at");
    CREATE INDEX IF NOT EXISTS "projects_tags_order_idx" ON "projects_tags" ("_order");
    CREATE INDEX IF NOT EXISTS "projects_tags_parent_id_idx" ON "projects_tags" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "projects_filter_tags_order_idx" ON "projects_filter_tags" ("_order");
    CREATE INDEX IF NOT EXISTS "projects_filter_tags_parent_id_idx" ON "projects_filter_tags" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" ("created_at");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" ("order");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" ("path");
    CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
    CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
    CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
    CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
    CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "payload_preferences_rels";
    DROP TABLE IF EXISTS "payload_preferences";
    DROP TABLE IF EXISTS "payload_locked_documents_rels";
    DROP TABLE IF EXISTS "payload_locked_documents";
    DROP TABLE IF EXISTS "projects_filter_tags";
    DROP TABLE IF EXISTS "projects_tags";
    DROP TABLE IF EXISTS "projects";
    DROP TABLE IF EXISTS "media";
    DROP TABLE IF EXISTS "users_sessions";
    DROP TABLE IF EXISTS "users";
    DROP TABLE IF EXISTS "payload_migrations";
    DROP TYPE IF EXISTS "public"."enum_projects_span";
  `)
}
