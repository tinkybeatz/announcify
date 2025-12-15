-- DropTable
DROP TABLE IF EXISTS "Announcement";

-- CreateTable
CREATE TABLE "BirthdayCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "toName" TEXT NOT NULL,
    "fromName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "presentEnabled" BOOLEAN NOT NULL DEFAULT false,
    "presentText" TEXT,
    "theme" JSONB,

    CONSTRAINT "BirthdayCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValentineCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "toName" TEXT NOT NULL,
    "fromName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "presentEnabled" BOOLEAN NOT NULL DEFAULT false,
    "presentText" TEXT,
    "theme" JSONB,

    CONSTRAINT "ValentineCard_pkey" PRIMARY KEY ("id")
);
