/*
  Warnings:

  - You are about to drop the column `emailVerificationToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerificationToken",
ADD COLUMN     "verificationCode" VARCHAR(6);
