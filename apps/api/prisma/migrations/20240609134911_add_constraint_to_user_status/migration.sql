/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserStatus_userId_key" ON "UserStatus"("userId");
