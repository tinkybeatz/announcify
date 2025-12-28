/*
  Warnings:

  - You are about to drop the column `presentEnabled` on the `BirthdayCard` table. All the data in the column will be lost.
  - You are about to drop the column `presentText` on the `BirthdayCard` table. All the data in the column will be lost.
  - You are about to drop the column `presentEnabled` on the `ValentineCard` table. All the data in the column will be lost.
  - You are about to drop the column `presentText` on the `ValentineCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BirthdayCard" DROP COLUMN "presentEnabled",
DROP COLUMN "presentText",
ADD COLUMN     "gift" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "giftDescription" TEXT;

-- AlterTable
ALTER TABLE "ValentineCard" DROP COLUMN "presentEnabled",
DROP COLUMN "presentText",
ADD COLUMN     "gift" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "giftDescription" TEXT;
