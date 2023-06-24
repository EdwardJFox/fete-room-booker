/*
  Warnings:

  - You are about to drop the column `userId` on the `Travel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Travel" DROP CONSTRAINT "Travel_userId_fkey";

-- DropIndex
DROP INDEX "Travel_userId_key";

-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "travelId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
