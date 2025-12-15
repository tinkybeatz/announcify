-- Add the legacy `name` column back so Auth.js can persist a display name.
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "name" TEXT;
