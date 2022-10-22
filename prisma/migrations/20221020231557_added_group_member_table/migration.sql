/*
  Warnings:

  - You are about to drop the column `ownedById` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `invitedToId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_ownedById_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_invitedToId_fkey";

-- DropIndex
DROP INDEX "Group_ownedById_key";

-- DropIndex
DROP INDEX "User_invitedToId_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "ownedById";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "invitedToId";

-- CreateTable
CREATE TABLE "GroupMember" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "owner" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_userId_key" ON "GroupMember"("userId");

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
