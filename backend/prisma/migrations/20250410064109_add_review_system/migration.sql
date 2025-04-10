/*
  Warnings:

  - A unique constraint covering the columns `[mission_id,reviewer_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mission_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('company_to_freelancer', 'freelancer_to_company');

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "mission_id" INTEGER NOT NULL,
ADD COLUMN     "type" "ReviewType" NOT NULL DEFAULT 'company_to_freelancer';

-- CreateIndex
CREATE UNIQUE INDEX "reviews_mission_id_reviewer_id_key" ON "reviews"("mission_id", "reviewer_id");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "missions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
