-- AlterTable
ALTER TABLE "BirthdayCard" ADD COLUMN     "createdBy" TEXT;

-- AlterTable
ALTER TABLE "ValentineCard" ADD COLUMN     "createdBy" TEXT;

-- AddForeignKey
ALTER TABLE "BirthdayCard" ADD CONSTRAINT "BirthdayCard_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValentineCard" ADD CONSTRAINT "ValentineCard_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
