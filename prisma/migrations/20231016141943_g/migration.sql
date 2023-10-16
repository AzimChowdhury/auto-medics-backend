/*
  Warnings:

  - A unique constraint covering the columns `[customerEmail]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reviews_customerEmail_key" ON "Reviews"("customerEmail");
