/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reviews_customerId_key" ON "Reviews"("customerId");
