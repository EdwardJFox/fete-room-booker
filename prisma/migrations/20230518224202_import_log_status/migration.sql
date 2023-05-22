/*
  Warnings:

  - Added the required column `status` to the `ImportLog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImportLogStatus" AS ENUM ('COMPLETE', 'ERROR');

-- AlterTable
ALTER TABLE "ImportLog" ADD COLUMN     "status" "ImportLogStatus" NOT NULL;
