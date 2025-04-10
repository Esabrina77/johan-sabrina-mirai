/*
  Warnings:

  - The values [inprogress] on the enum `MissionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `date_applied` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `missions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationExpires` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `users` table. All the data in the column will be lost.
  - Added the required column `freelancer_id` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `missions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `missions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `missions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MissionStatus_new" AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
ALTER TABLE "missions" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "missions" ALTER COLUMN "status" TYPE "MissionStatus_new" USING ("status"::text::"MissionStatus_new");
ALTER TYPE "MissionStatus" RENAME TO "MissionStatus_old";
ALTER TYPE "MissionStatus_new" RENAME TO "MissionStatus";
DROP TYPE "MissionStatus_old";
ALTER TABLE "missions" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_mission_id_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "missions" DROP CONSTRAINT "missions_user_id_fkey";

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "date_applied",
DROP COLUMN "user_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "freelancer_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "missions" DROP COLUMN "user_id",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD COLUMN     "requiredSkills" TEXT[],
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "budget" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "emailVerificationExpires",
DROP COLUMN "emailVerified",
DROP COLUMN "updatedAt",
DROP COLUMN "verificationCode",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "missions" ADD CONSTRAINT "missions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "missions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
