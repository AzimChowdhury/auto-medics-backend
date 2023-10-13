/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Specialist` table. All the data in the column will be lost.
  - Added the required column `specialistId` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Specialist" DROP CONSTRAINT "Specialist_serviceId_fkey";

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "specialistId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Specialist" DROP COLUMN "serviceId";

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "Specialist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
