/*
  Warnings:

  - Added the required column `numberOfRecords` to the `ImportLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImportLog" ADD COLUMN     "numberOfRecords" INTEGER NOT NULL;
