/*
  Warnings:

  - You are about to drop the column `specialistId` on the `Bookings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_specialistId_fkey";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "specialistId";
