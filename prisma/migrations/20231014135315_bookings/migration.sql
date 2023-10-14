-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_specialistId_fkey";

-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "specialistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "Specialist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
